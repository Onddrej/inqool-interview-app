import axios from 'axios'
import { API_BASE_URL } from './config'

export interface RowData {
    id: string;
    name: string;
    type: 'cat' | 'dog' | 'other';
    age: number;
}

export const fetchAnimals = async () => {
    const res = await axios.get(`${API_BASE_URL}/animals`)
    return res.data
}

export const createAnimal = async (animal: Omit<RowData, 'id'>) => {
    const res = await axios.post(`${API_BASE_URL}/animals`, animal)
    return res.data
}

export const updateAnimal = async (id: string, animal: Partial<Omit<RowData, 'id'>>) => {
    const res = await axios.patch(`${API_BASE_URL}/animals/${id}`, animal)
    return res.data
}

export const deleteAnimal = async (id: string) => {
    const res = await axios.delete(`${API_BASE_URL}/animals/${id}`)
    return res.data
}