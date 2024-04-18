'use client'

import { useEffect, useState } from 'react'
import {getProducts, searchProducts} from './action'
import {NextUIProvider} from "@nextui-org/react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar} from "@nextui-org/react";
import {Pagination, Button} from "@nextui-org/react";

import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client'


export default function Page() {
  const [products, setProducts] = useState(null)
  const [search,setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const router = useRouter()
  
  const supabase = createClient()


  useEffect(() => {
    const getData = async () => {

      const { data: {session }} = await supabase.auth.getSession();
      console.log(session);
      if (!session) {
        router.push("/login");
      }

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
      if(productsResult.error){
        alert(productsResult.error.message);
      }
    }
    getData()
  }

  function update(id){
    window.location.href = `/products2/edit/${id}`;
  }
  function gallery(id){
    window.location.href = `/products2/gallery/${id}`;
  }
  function agregar(){
    window.location.href = 'products2/add';
  }

  return (
    <NextUIProvider>
      <main className="dark text-foreground bg-background">
      </main>
      <Navbar isBordered>
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4">
       
          <p className="hidden sm:block font-bold font-serif text-2xl text-inherit">Mara'Shopping</p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-3">
          <NavbarItem>
            <Link color="foreground" href="#">
              Nosotros
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link href="#" aria-current="page" color="primary">
              Novedades
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Contactanos
            </Link>
          </NavbarItem>
        </NavbarContent>
      </NavbarContent>

      <NavbarContent as="div" className="items-center" justify="end">
      <form action="" className='mb-4' onSubmit={handleSearch}>
            <input type="text" placeholder='Buscar..'  className='border rounded px-2' defaultValue={search} onChange={(e)=>{setSearch(e.target.value);}}/>
        </form>
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">sebastianca10@gmail.com</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="team_settings">Team Settings</DropdownItem>
            <DropdownItem key="analytics">Analytics</DropdownItem>
            <DropdownItem key="system">System</DropdownItem>
            <DropdownItem key="configurations">Restablecer password</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
    <div className='flex flex-col'> 
      <div className='flex items-center flex-col'>
        
        <div className='flex items-end w-full flex-col '>
        <button  onClick={agregar} type='button' className='rounded bg-green-500 px-2 ml-3 font-bold text-white text-xl mr-1 mb-2'>Agregar</button>
        </div>
      </div>
      <div className='flex flex-wrap gap-5 my-auto justify-center'>
        
          {products?.map((product)=>

          <div className='relative h-auto w-48' key={product.id}>
          <div className='absolute top-0 flex w-full justify-center'>
            <div className='left-0 h-[1px] animate-border-width rounded-full bg-gradient-to-r from-[rgba(17,17,17,0)] via-white to-[rgba(17,17,17,0)] transition-all duration-1000' />
          </div>
          <div className='flex gap-1 flex-col h-full items-center justify-center rounded-md border border-slate-800 bg-white px-3 py-2'>
            <h5 className='text-black text-2xl text-center font-bold'>{product.name}</h5>
            <p className='text-yellow-500 text-xl text-center'>${product.price}</p>
            <p className='text-black text-lg text-center'>{product.description}</p>
            <button onClick={() => update(product.id)} className='rounded bg-gray-400 px-2  text-xl'>Actualizar</button>
            
            <button onClick={() => gallery(product.id)} className='rounded bg-gray-400 px-2  text-xl'>Mostrar Galeria</button>

          </div>
        </div>
          )}

      </div>
    </div>
    <div className="flex flex-col gap-5">
        <p className="text-small text-default-500">Selected Page: {currentPage}</p>
        <Pagination
          total={10}
          color="secondary"
          page={currentPage}
          onChange={setCurrentPage}
        />
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="flat"
            color="secondary"
            onPress={() => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))}
          >
            Previous
          </Button>
          <Button
            size="sm"
            variant="flat"
            color="secondary"
            onPress={() => setCurrentPage((prev) => (prev < 10 ? prev + 1 : prev))}
          >
            Next
          </Button>
        </div>
      </div>
    </NextUIProvider>
    
    )
   
}

