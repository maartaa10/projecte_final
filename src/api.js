import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

export const getMaterials = () => {
  return axios.get(`${API_BASE_URL}/materials`);
};

export const createMaterial = async (material) => {
  try {
    console.log('Creant material:', material); 
    const response = await axios.post(`${API_BASE_URL}/materials`, material);
    console.log('Material creat amb exit:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creant material:', error.response?.data || error.message);
    throw error;
  }
};
export const updateMaterial = (id_num, material) => {
  console.log(`${API_BASE_URL}/materials/${id_num}`);
  console.log(material);
  return axios.put(`${API_BASE_URL}/materials/${id_num}`, material);
};

export const deleteMaterial = (id_num) => {
  return axios.delete(`${API_BASE_URL}/materials/${id_num}`);
};

export const getMonsters = () => {
  return axios.get(`${API_BASE_URL}/monsters`);
};

export const createMonster = (monster) => {
  return axios.post(`${API_BASE_URL}/monsters`, monster);
};

export const updateMonster = (id_num, monster) => {
  return axios.put(`${API_BASE_URL}/monsters/${id_num}`, monster);
};

export const deleteMonster = (id_num) => {
  return axios.delete(`${API_BASE_URL}/monsters/${id_num}`);
};