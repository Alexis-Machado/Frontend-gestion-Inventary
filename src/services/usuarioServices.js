import { axiosInstance } from '../helpers/axios-config';

const getUser = () => {
  const resp = axiosInstance.get('user/');
  return resp;
};

const createUser = (data) => {
  const resp = axiosInstance.post('user', data, {
    headers: {
      'Content-type': 'application/json',
    },
  });
  return resp;
};

const updateUser = (userId, data) => {
  const resp = axiosInstance.put(`user/${userId}`, data, {
    headers: {
      'Content-type': 'application/json',
    },
  });
  return resp;
};

const getUserById = (userId) => {
  const resp = axiosInstance.get(`user/${userId}`, {
    headers: {
      'Content-type': 'application/json',
    },
  });
  return resp;
};

const deleteUser = (userId) => {
  const resp = axiosInstance.delete(`user/${userId}`, {
    headers: {
      'Content-type': 'application/json',
    },
  });
  return resp;
};

export { getUser, createUser, updateUser, getUserById, deleteUser };
