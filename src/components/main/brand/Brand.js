import dayjs from 'dayjs';
import React, { useState, useEffect } from 'react';
import { createBrand, getBrand, deleteBrand } from '../../../services/brandService';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

export const Brand = () => {
  const [valueForm, setValueForm] = useState({});
  const [brands, setBrands] = useState([]);
  const { name = '', state = '' } = valueForm;

  const handleOnChange = (e) => {
    setValueForm({ ...valueForm, [e.target.name]: e.target.value });
  };

  const handleGetBrands = async () => {
    try {
      const resp = await getBrand();
      setBrands(resp.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetBrands();
  }, []);

  const handleCreateBrand = async (e) => {
    e.preventDefault();
    try {
      const resp = await createBrand(valueForm);
      console.log(resp.data);
      setValueForm({ name: '', state: '' });
      handleGetBrands();
      Swal.fire({
        icon: 'success',
        title: 'Marca creada exitosamente.',
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Error al crear la marca.',
        text: 'Por favor, inténtelo de nuevo.',
      });
    }
  };

  const handleDeleteBrand = async (brandId) => {
    try {
      const brandToDelete = brands.find(brand => brand._id === brandId);
      await deleteBrand(brandId);
      handleGetBrands();
      Swal.fire({
        icon: 'success',
        title: `La Marca "${brandToDelete.name}" fue eliminada correctamente.`,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Error al eliminar la marca.',
        text: 'Por favor, inténtelo de nuevo.',
      });
    }
  };

  return (
    <div className="container-fluid" style={{ color: 'black', padding: '20px' }}>
      <div className='mt-2 mb-2'>
        <form onSubmit={(e) => handleCreateBrand(e)}>
          <br />
          <div className="mb-3">
            <label className="form-label"><strong>Nombre</strong></label>
            <input required name='name' value={name} type="text" className="form-control" onChange={(e) => handleOnChange(e)} />
          </div>
          <div className="mb-3">
            <label className="form-label"><strong>Estado</strong></label>
            <select required name='state' value={state} className="form-select" onChange={(e) => handleOnChange(e)}>
              <option defaultValue={''}>Seleccione</option>
              <option value='Active'>Activo</option>
              <option value='Inactive'>Inactivo</option>
            </select>
          </div>
          <button className="btn btn-primary mb-3">Guardar</button>
        </form>
        <table className="table table-bordered text-center">
          <thead>
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Estado</th>
              <th scope="col">Fecha Creacion</th>
              <th scope="col">Fecha Actualización</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {brands.map((brand) => (
              <tr key={brand._id}>
                <td>{brand.name}</td>
                <td>{brand.state}</td>
                <td>{dayjs(brand.creationDate).format('YYYY-MM-DD')}</td>
                <td>{dayjs(brand.updateDate).format('YYYY-MM-DD')}</td>
                <td>
                  <Link to={`brand/edit/${brand._id}`} className="btn btn-primary">
                    Actualizar
                  </Link>
                  <span>   </span>
                  <button
                    onClick={() => handleDeleteBrand(brand._id)}
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
    </div>
  );
};