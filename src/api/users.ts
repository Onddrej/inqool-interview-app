import axios from 'axios'

export interface RowData {
  id: string;
  name: string;
  gender: 'female' | 'male' | 'other';
  banned: boolean;
}

export const fetchUsers = async () => {
  const res = await axios.get('https://inqool-interview-api.vercel.app/api/users')
  return res.data
}

export const createUser = async (user: Omit<RowData, 'id'>) => {
  const res = await axios.post('https://inqool-interview-api.vercel.app/api/users', user);
  return res.data;
}
