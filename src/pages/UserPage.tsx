// Users.tsx

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const fetchUsers = async () => {
  const res = await axios.get('https://inqool-interview-api.vercel.app/api/users')
  return res.data
}

export default function Users() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  })

  if (isLoading) return <div>Načítavam používateľov...</div>
  if (error) return <div>Chyba pri načítaní dát</div>

  return (
    <ul>
      {data.map((user: any) => (
        <li key={user.id}>
          {user.name} ({user.gender}) {user.banned ? '🚫 Banned' : ''}
        </li>
      ))}
    </ul>
  )
}
