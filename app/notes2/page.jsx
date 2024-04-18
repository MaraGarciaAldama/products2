//archivo de acciones para: notas

"use client"

import { useEffect, useState } from 'react';
import{getNotes, searchNotes} from './actions';

export default function Page() {
    const [notes, setNotes] = useState(null)
    
    const [search,setSearch] = useState('')


    function handleSearch(e){
        e.preventDefault(); //impedir que se envie el form 
        //para poder ejecutar una funcion sin recargar la pagina
         
        const getData = async () => {
          const notesResult = await searchNotes(search);
          setNotes(notesResult.notes);
          //falta mostrar la info del error en caso de que se tenga
          //notesResult.error
          if(notesResult.error){
            alert(notesResult.error.message);
          }
        }
        getData()
        
    
      }

    useEffect(() => {
        const getData = async () => {
          const notesResult = await getNotes()
          setNotes(notesResult.notes);

          //falta mostrar la info del error en caso de que se tenga 
          //notesResult.error
          if(notesResult.error){
            alert (notesResult.error.message);
          }
        }
        getData()
      }, [])

     
    

    return (
        <div className='my-6'>
            <h1 className='text-center text-blue-400'>Mis notas</h1>
            
            <form action="" className='mb-4' onSubmit={handleSearch}>
                <input type="text" placeholder='Buscar..'  className='border rounded px-2' defaultValue={search} onChange={(e)=>{setSearch(e.target.value);}}/>
                <button type='submit' className='rounded bg-blue-300 px-2 ml-3'>Buscar</button>
            </form>
    
    
            <ul className='text-xl'>
                {notes?.map((note)=> <li key={note.id} className='font-bold border'>{note.title}</li>)}
            </ul>
        </div>
        )
}