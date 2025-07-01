import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const fetchAnimals = async () => {
  const res = await axios.get('https://inqool-interview-api.vercel.app/api/animals')
  return res.data
}

export default function AnimalsPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['animals'],
    queryFn: fetchAnimals,
  })

  if (isLoading) return <div>Načítavam zvieratá...</div>
  if (error) return <div>Chyba pri načítaní dát</div>

  return (
    <ul>
      {data.map((animal: any) => (
        <li key={animal.id}>
          🐾 {animal.name} ({animal.type}, {animal.age} rokov)
        </li>
      ))}
    </ul>
  )
}
