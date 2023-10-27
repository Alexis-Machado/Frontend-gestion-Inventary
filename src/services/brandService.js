// brandService.js

import { axiosInstance } from '../helpers/axios-config';

const getBrand = () => {
  const resp = axiosInstance.get('brand/');
  return resp;
};

const createBrand = (data) => {
  const resp = axiosInstance.post('brand', data, {
    headers: {
      'Content-type': 'application/json',
    },
  });
  return resp;
};

const updateBrand = (brandId, data) => {
  const resp = axiosInstance.put(`brand/${brandId}`, data, {
    headers: {
      'Content-type': 'application/json',
    },
  });
  return resp;
};

const deleteBrand = (brandId) => {
  const resp = axiosInstance.delete(`brand/${brandId}`, {
    headers: {
      'Content-type': 'application/json',
    },
  });
  return resp;
};

const getBrandById = (brandId) => {
  const resp = axiosInstance.get(`brand/${brandId}`, {
    headers: {
      'Content-type': 'application/json',
    },
  });
  return resp;
};

export {
  getBrand,
  createBrand,
  updateBrand,
  deleteBrand, 
  getBrandById,
};
