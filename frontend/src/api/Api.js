import axios from "axios";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "XCSRF-TOKEN";

const apiBaseUrl = process.env.API_BASE_URL;
const Api = axios.create({ baseURL: apiBaseUrl });

export const getGeneralObject = async (endpoint, token = "") => {
  const headers = token ? { Authorization: `Token ${token}` } : {};
  const response = await Api.get(`/${endpoint}`, { headers });
  return response.data;
};

export const getObject = async (endPoint, id, token = "") => {
  const headers = token ? { Authorization: `Token ${token}` } : {};
  const response = await Api.get(`/${endPoint}/${id}`, { headers });
  return response.data;
};

export const addObject = async (
  endpoint,
  modelObject,
  token = "",
  isMultipart = false
) => {
  const headers = {
    Authorization: `Token ${token}`,
  };

  if (!isMultipart) {
    headers["Content-Type"] = "application/json";
  }

  return await Api.post(`/${endpoint}/`, modelObject, { headers });
};

export const updateObject = async (
  endPoint,
  modelObject,
  rowId,
  token = ""
) => {
  const headers = token ? { Authorization: `Token ${token}` } : {};
  return await Api.patch(`/${endPoint}/${rowId}/`, modelObject, { headers });
};

export const deleteObject = async (endPoint, id, token = "") => {
  const headers = token ? { Authorization: `Token ${token}` } : {};
  return await Api.delete(`/${endPoint}/${id}/`, { headers });
};

export const updateTask = async (endPoint, data, token = "") => {
  return await Api.patch(`/${endPoint}/${data.id}/`, data.formData, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};

export const loginUser = async (modelObject) => {
  return await Api.post(`/login/`, modelObject);
};

export const getUserData = async (token = "") => {
  return await Api.get(`/users/`, {
    headers: { Authorization: `Token ${token}` },
  });
};