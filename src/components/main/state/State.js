import dayjs from 'dayjs';
import React, { useState, useEffect } from 'react';
import { createState, getState, deleteState } from '../../../services/stateService';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

export const State = () => {
  const [valueForm, setValueForm] = useState({});
  const [states, setStates] = useState([]);
  const { name = "", state = "" } = valueForm;

  const handleOnChange = (e) => {
    setValueForm({ ...valueForm, [e.target.name]: e.target.value });
  };

  const handleGetStates = async () => {
    try {
      const resp = await getState();
      setStates(resp.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetStates();
  }, []);

  const handleCreateState = async (e) => {
    e.preventDefault();
    try {
      const resp = await createState(valueForm);
      console.log(resp.data);
      setValueForm({ name: "", state: "" });
      handleGetStates();
      Swal.fire({
        icon: 'success',
        title: 'Estado creado exitosamente.',
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Error al crear el estado.',
        text: 'Por favor, inténtelo de nuevo.',
      });
    }
  };

  const handleDeleteState = async (stateId) => {
    try {
      const stateToDelete = states.find((state) => state._id === stateId);
      await deleteState(stateId);
      handleGetStates();
      Swal.fire({
        icon: 'success',
        title: `El Estado "${stateToDelete.name}" fue eliminado correctamente.`,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Error al eliminar el estado.',
        text: 'Por favor, inténtelo de nuevo.',
      });
    }
  };

  return (
    <div className="container-fluid">
      <form onSubmit={(e) => handleCreateState(e)}>
        <br />
        <div className="mb-3">
          <label className="form-label">
            <strong>Nombre</strong>
          </label>
          <input
            required
            name="name"
            value={name}
            type="text"
            className="form-control"
            onChange={(e) => handleOnChange(e)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">
            <strong>Estado</strong>
          </label>
          <select
            required
            name="state"
            value={state}
            className="form-select"
            onChange={(e) => handleOnChange(e)}
          >
            <option defaultValue={""}>Seleccione</option>
            <option value="Active">Activo</option>
            <option value="Inactive">Inactivo</option>
          </select>
        </div>
        <br />
        <button className="btn btn-primary mb-3">Guardar</button>
      </form>
      <table className="table table-bordered text-center">
        <thead>
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Estado</th>
            <th scope="col">Fecha Creacion</th>
            <th scope='col'>Fecha Actualización</th>
            <th scope='col'>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {states.map((state) => (
            <tr key={state._id}>
              <td>{state.name}</td>
              <td>{state.state}</td>
              <td>{dayjs(state.creationDate).format('YYYY-MM-DD')}</td>
              <td>{dayjs(state.updateDate).format('YYYY-MM-DD')}</td>
              <td>
                <Link to={`state/edit/${state._id}`} className="btn btn-primary">
                  Actualizar
                </Link>
                <span>   </span>
                <button
                  onClick={() => handleDeleteState(state._id)}
                  className="btn btn-danger"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
