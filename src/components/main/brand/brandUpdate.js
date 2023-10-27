import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { updateBrand, getBrandById } from '../../../services/brandService';
import Swal from 'sweetalert2';

export const BrandUpdate = () => {
  const { brandId = '' } = useParams();
  const [brand, setBrand] = useState({});
  const [valueForm, setValueForm] = useState({});
  const { name = '', state = '' } = valueForm;

  const getBrand = async () => {
    try {
      const { data } = await getBrandById(brandId);
      setBrand(data);
      setValueForm({
        name: data.name,
        state: data.state
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBrand();
  }, [brandId]);

  const handleOnChange = (e) => {
    setValueForm({ ...valueForm, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const updatedBrand = {
      name,
      state
    };

    try {

      const { data } = await updateBrand(brandId, updatedBrand);

      Swal.fire({
        icon: 'success',
        title: 'Marca actualizada exitosamente.',
        text: `Los cambios se han aplicado a la marca "${data.name}".`,
        showConfirmButton: true
      });

      setBrand(data);
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: 'error',
        title: 'Error al actualizar la marca.',
        text: 'Por favor, inténtelo de nuevo.'
      });
    }
  };

  return (
    <div className='container-fluid mt-3 mb-2'>
      <div className='card'>
        <div className='card-header'>
          <h5 className='card-title neon3 text-center'> Editar Marca</h5>
        </div>
        <div className='card-body'>
          <div className='row'>
            <div className='col-md-12'>
              <form onSubmit={(e) => handleOnSubmit(e)}>
                <div className='row'>
                  <div className='col'>
                    <div className='mb-3'>
                      <label className='form-label'>
                        <strong>Nombre</strong>
                      </label>
                      <input
                        required
                        type='text'
                        value={name}
                        name='name'
                        className='form-control'
                        onChange={(e) => handleOnChange(e)}
                      />
                    </div>
                  </div>
                  <div className='col'>
                    <div className='mb-3'>
                      <label className='form-label'>
                        <strong>Estado</strong>
                      </label>
                      <select
                        required
                        name='state'
                        value={state}
                        className='form-select'
                        onChange={(e) => handleOnChange(e)}
                      >
                        <option defaultValue={''}>Seleccione</option>
                        <option value='Active'>Activo</option>
                        <option value='Inactive'>Inactivo</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col'>
                    <button className='btn btn-primary'>Guardar</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
