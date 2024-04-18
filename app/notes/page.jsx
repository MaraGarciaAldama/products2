'use client'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation';

import { useEffect, useState } from 'react'

export default function Page() {

  const router = useRouter()

  const [notes, setNotes] = useState(null)

  const supabase = createClient()

  const [search, setSearch] = useState('')

  useEffect(() => {
    const getData = async () => {
      const { data: {session }} = await supabase.auth.getSession();
      if (!session) {
        router.push("/login");
      }
      const { data } = await supabase.from('notes').select()
      setNotes(data)
    }
    getData()
  }, [])

  function handleSearch(e) {
    e.preventDefault(); //impedir que se envie el form 
    //para poder ejecutar una funcion sin recargar la pagina

    console.log("buscar: ", search);

    const getData = async () => {
      const { data } = await supabase
        .from('notes')
        .select()
        .ilike('title', `%${search}%`);

      setNotes(data)
    }
    getData()


  }

  return (
    <div className='my-6'>
      <h1 className='text-center text-blue-400'>Mis notas</h1>

      <form action="" className='mb-4' onSubmit={handleSearch}>
        <input type="text" placeholder='Buscar..' className='border rounded px-2' defaultValue={search} onChange={(e) => { setSearch(e.target.value); }} />
        <button type='submit' className='rounded bg-blue-300 px-2 ml-3'>Buscar</button>
      </form>


      <ul className='text-xl'>
        {notes?.map((note) => <li key={note.id} className='font-bold border'>{note.title}</li>)}
      </ul>
    </div>
  )
}