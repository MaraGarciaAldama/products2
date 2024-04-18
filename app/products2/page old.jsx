'use client'
import { useEffect, useState } from 'react'
import {getProducts, searchProducts} from './action'

export default function Page() {
  const [products, setProducts] = useState(null)
  const [search,setSearch] = useState('');

  useEffect(() => {
    const getData = async () => {
      const productsResult = await getProducts()
      setProducts(productsResult.products);

      //falta mostrar la info del error en caso de que se tenga 
      //productsResult.error
      if(productsResult.error){
        alert (productsResult.error.message);
      }
    }
    getData()
  }, [])
  
  function handleSearch(e){
    e.preventDefault(); //impedir que se envie el form 
    //para poder ejecutar una funcion sin recargar la pagina
     
    const getData = async () => {
      const productsResult = await searchProducts(search);
      setProducts(productsResult.products);
      //falta mostrar la info del error en caso de que se tenga
      //notesResult.error
      if(productsResult.error){
        alert(productsResult.error.message);
      }
    }
    getData()
  }

  function update(id){
    window.location.href = `/products2/edit/${id}`;
  }
  function agregar(){
    window.location.href = 'products2/add';
  }

  return (
    
    <div className='flex flex-col'> 
      <div className='flex items-center flex-col'>
        <h1 className='text-center text-4xl font-bold text-black font-serif underline decoration-amber-600 my-2'>TIENDA LA MARA</h1>
        
        <form action="" className='mb-4' onSubmit={handleSearch}>
            <input type="text" placeholder='Buscar..'  className='border rounded px-2' defaultValue={search} onChange={(e)=>{setSearch(e.target.value);}}/>
        </form>
        <button  onClick={agregar} type='button' className='rounded bg-green-500 px-2 ml-3 font-bold text-white text-2xl'>Agregar nuevo producto</button>
      </div>
      <div className='flex flex-wrap gap-5 justify-center py-5'>
       
       {products?.map((product)=> 
            
            <div className='relative h-58 w-48' key={product.id}>
            <div className='absolute top-0 flex w-full justify-center'>
            <div className='left-0 h-[1px] animate-border-width rounded-full bg-gradient-to-r from-[rgba(17,17,17,0)] via-white to-[rgba(17,17,17,0)] transition-all duration-1000' />
            </div>
            <div className='flex flex-col text-black  font-sans text-center text-2xl h-full items-center justify-center rounded-md border border-slate-800 bg-gray-100 px-3 py-2'>
              <img src={product.img} className='rounded-full object-contain h-44' alt="" />
              <h4 className='font-bold '>{product.name}</h4>
              <p className='text-sm'>{product.description}</p>
              <p className='text-2xl font-bold text-green-500'>${product.price}</p>
              <button onClick={() => update(product.id)} className='rounded bg-blue-400 px-2  text-xl'>Actualizar</button>

            </div>
            </div>
            
           
        )}


        

      </div>
    </div>
    )
}

