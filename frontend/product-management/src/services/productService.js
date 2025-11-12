import axios from 'axios';

const API_BASE_URL = '/api/products';

export const getProducts = async () => {
    const response = await axios.get(`${API_BASE_URL}`);
    return response.data;
};

export const getProductById = async (productId) => {
    const response = await axios.get(`${API_BASE_URL}/${productId}`);
    return response.data;
};

export const createProduct = async (product) => {
  const res = await axios.post(API_URL, product);
  return res.data;
};

export const updateProduct = async (id, product) => {
  const res = await axios.put(`${API_URL}/${id}`, product);
  return res.data;
};

export const deleteProduct = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};

export const getCategories = async () => {
  const response = await axios.get('/api/categories');
  return response.data;
};
