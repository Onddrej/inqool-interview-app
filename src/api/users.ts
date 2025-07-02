import axios from 'axios'
import { API_BASE_URL } from './config'

export interface RowData {
  id: string;
  name: string;
  gender: 'female' | 'male' | 'other';
  banned: boolean;
}

export const fetchUsers = async () => {
  const res = await axios.get(`${API_BASE_URL}/users`)
  return res.data
}

export const createUser = async (user: Omit<RowData, 'id'>) => {
  const res = await axios.post(`${API_BASE_URL}/users`, user);
  return res.data;
}

export const updateUser = async (id: string, user: Partial<Omit<RowData, 'id'>>) => {
  const res = await axios.patch(`${API_BASE_URL}/users/${id}`, user);
  return res.data;
}

export const banUser = async (id: string) => {
  const res = await axios.patch(`${API_BASE_URL}/users/${id}`, { banned: true });
  return res.data;
}

export const unbanUser = async (id: string) => {
  const res = await axios.patch(`${API_BASE_URL}/users/${id}`, { banned: false });
  return res.data;
}
