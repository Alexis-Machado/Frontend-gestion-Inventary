import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { updateState, getStateById } from '../../../services/stateService';
import Swal from 'sweetalert2';

export const StateUpdate = () => {
  const { stateId = '' } = useParams();
  const [states, setState] = useState({});
  const [valueForm, setValueForm] = useState({});
  const { name = '', state: currentState = '' } = valueForm;

  const getState = async () => {
    try {
      const { data } = await getStateById(stateId);
      setState(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getState();
  }, [stateId]);

  useEffect(() => {
    setValueForm({
      name: states.name,
      state: states.state,
    });
  }, [states]);

  const handleOnChange = (e) => {
    setValueForm({ ...valueForm, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const updatedState = {
      name,
      state: currentState,
    };

    try {

        const { data } = await updateState(stateId, updatedState);
  
        Swal.fire({
          icon: 'success',
          title: 'Estado actualizado exitosamente.',
          text: `Los cambios se han aplicado al Estado "${data.name}".`,
          showConfirmButton: true
        });
  
        setState(data);
      } catch (error) {
        console.log(error);
  
        Swal.fire({
          icon: 'error',
          title: 'Error al actualizar el Estado.',
          text: 'Por favor, inténtelo de nuevo.'
        });
      }
    };
  

  return (
    <div className='container-fluid mt-3 mb-2'>
      <div className='card'>
        <div className='card-header'>
          <h5 className='card-title neon3 text-center'> Editar Estado de Equipo</h5>
        </div>
        <div className='card-body'>
          <div className='row'>
            <div className='col-md-12'>
              <form onSubmit={(e) => handleOnSubmit(e)}>
                <div className='row'>
                  <div className='col'>
                    <div className="mb-3">
                      <label className="form-label"><strong>Nombre</strong></label>
                      <input
                        required
                        type="text"
                        value={name}
                        name='name'
                        className="form-control"
                        onChange={(e) => handleOnChange(e)}
                      />
                    </div>
                  </div>
                  <div className='col'>
                    <div className="mb-3">
                      <label className="form-label"><strong>Estado</strong></label>
                      <select
                        required
                        name='state'
                        value={currentState}
                        className="form-select"
                        onChange={(e) => handleOnChange(e)}
                      >
                        <option defaultValue={""}>Seleccione</option>
                        <option value="Active">Activo</option>
                        <option value="Inactive">Inactivo</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col'>
                    <button className='btn btn-primary'> Guardar</button>
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
