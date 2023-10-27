import dayjs from 'dayjs';
import React, { useState, useEffect } from 'react';
import { getUser, createUser, deleteUser } from '../../../services/usuarioServices';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

export const User = () => {
  const [valueForm, setValueForm] = useState({});
  const [users, setUsers] = useState([]);
  const { name = '', email = '', state = '' } = valueForm;

  const handleOnChange = (e) => {
    setValueForm({ ...valueForm, [e.target.name]: e.target.value });
  };

  const handleGetUsers = async () => {
    try {
      const resp = await getUser();
      setUsers(resp.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetUsers();
  }, []);

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      const resp = await createUser(valueForm);
      console.log(resp.data);
      setValueForm({ name: '', email: '', state: '' });
      handleGetUsers();

      Swal.fire({
        icon: 'success',
        title: 'Usuario creado exitosamente.',
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: 'error',
        title: 'Error al crear el usuario.',
        text: 'Por favor, inténtelo de nuevo.',
      });
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      const userToDelete = users.find(user => user._id === userId);
      await deleteUser(userId);
      handleGetUsers();

      Swal.fire({
        icon: 'success',
        title: `El Usuario "${userToDelete.name}" fue eliminado correctamente.`,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: 'error',
        title: 'Error al eliminar el usuario.',
        text: 'Por favor, inténtelo de nuevo.',
      });
    }
  };

  return (
    <div className="container-fluid">
      <form onSubmit={(e) => handleCreateUser(e)}>
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
            <strong>Email</strong>
          </label>
          <input
            required
            name="email"
            value={email}
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
            <th scope="col">Email</th>
            <th scope="col">Estado</th>
            <th scope="col">Fecha Creacion</th>
            <th scope="col">Fecha Actualización</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.state}</td>
              <td>{dayjs(user.creationDate).format('YYYY-MM-DD')}</td>
              <td>{dayjs(user.updateDate).format('YYYY-MM-DD')}</td>
              <td>
                <Link to={`user/edit/${user._id}`} className="btn btn-primary">
                  Actualizar
                </Link>
                <span>   </span>
                <button
                  onClick={() => handleDeleteUser(user._id)}
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
