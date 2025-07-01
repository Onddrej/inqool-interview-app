import axios from 'axios'

export const fetchUsers = async () => {
  const res = await axios.get('https://inqool-interview-api.vercel.app/api/users')
  return res.data
}
