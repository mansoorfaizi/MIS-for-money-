import axios from "axios";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "XCSRF-TOKEN";
const userStorage = JSON.parse(localStorage.getItem("user"));

const apiBaseUrl = process.env.API_BASE_URL;
const Api = axios.create({ baseURL: apiBaseUrl });

export const getObjects = async (endPoint) => {
  const response = await Api.get(`/${endPoint}`, {
    headers: { Authorization: `Token ${userStorage.token}` },
  });
  return response.data;
};

export const getObject = async (endPoint, id) => {
  const response = await Api.get(`/${endPoint}/${id}`, {
    headers: { Authorization: `Token ${userStorage.token}` },
  });
  return response.data;
};

export const addObject = async (endpoint, modelObject) => {
  return await Api.post(`/${endpoint}/`, modelObject, {
    headers: { Authorization: `Token ${userStorage.token}` },
  });
};

export const updateObject = async (endPoint, modelObject, rowId) => {
  return await Api.patch(`/${endPoint}/${rowId}/`, modelObject, {
    headers: { Authorization: `Token ${userStorage.token}` },
  });
};

export const deleteObject = async (endPoint, id) => {
  return await Api.delete(`/${endPoint}/${id}/`, id, {
    headers: { Authorization: `Token ${userStorage.token}` },
  });
};

export const loginUser = async (modelObject) => {
  return await Api.post(`/login/`, modelObject);
};

export const getUserData = async (token) => {
  return await Api.get(`/users/`, {
    headers: { Authorization: `Token ${userStorage.token}` },
  });
};
