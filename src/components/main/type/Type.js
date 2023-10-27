import dayjs from 'dayjs';
import React, { useState, useEffect } from 'react';
import { createType, getType, deleteType } from '../../../services/typeService';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

export const Type = () => {
  const [valueForm, setValueForm] = useState({});
  const [types, setTypes] = useState([]);
  const { name = '', state = '' } = valueForm;

  const handleOnChange = (e) => {
    setValueForm({ ...valueForm, [e.target.name]: e.target.value });
  };

  const handleGetType = async () => {
    try {
      const resp = await getType();
      setTypes(resp.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetType();
  }, []);

  const handleCreateType = async (e) => {
    e.preventDefault();
    try {
      const resp = await createType(valueForm);
      console.log(resp.data);
      setValueForm({ name: '', state: '' });
      handleGetType();
      Swal.fire({
        icon: 'success',
        title: 'Tipo creado exitosamente.',
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Error al crear el tipo.',
        text: 'Por favor, inténtelo de nuevo.',
      });
    }
  };

  const handleDeleteType = async (typeId) => {
    try {
      const typeToDelete = types.find(type => type._id === typeId);
      await deleteType(typeId);
      handleGetType();
      Swal.fire({
        icon: 'success',
        title: `El Tipo "${typeToDelete.name}" fue eliminado correctamente.`,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Error al eliminar el tipo.',
        text: 'Por favor, inténtelo de nuevo.',
      });
    }
  };

  return (
    <div className="container-fluid">
      <form onSubmit={(e) => handleCreateType(e)}>
        <br />
        <div className="mb-3">
          <label className="form-label"><strong>Nombre</strong></label>
          <input required name='name' value={name} type="text" className="form-control" onChange={(e) => handleOnChange(e)} />
        </div>
        <div className="mb-3">
          <label className="form-label"><strong>Estado</strong></label>
          <select required name='state' value={state} className="form-select" onChange={(e) => handleOnChange(e)}>
            <option defaultValue={''}>Seleccione</option>
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
          {types.map((type) => (
            <tr key={type._id}>
              <td>{type.name}</td>
              <td>{type.state}</td>
              <td>{dayjs(type.creationDate).format('YYYY-MM-DD')}</td>
              <td>{dayjs(type.updateDate).format('YYYY-MM-DD')}</td>
              <td>
                <Link to={`type/edit/${type._id}`} className="btn btn-primary">
                  Actualizar
                </Link>
                <span>   </span>
                <button
                  onClick={() => handleDeleteType(type._id)}
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
