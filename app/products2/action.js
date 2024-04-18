"use server"

import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

/**Funcion para registrar un nuevo producto 
 *@param {*} product datos del producto
 * 
*/

function supabaseCliente(){
    const cookieStore = cookies();
    return createClient(cookieStore);
}

//archivo de acciones para: products
export async function getProducts(){

    //crear cliente de supebase
    const { data:products,error} = await supabaseCliente()
        .from('products')
        .select();
        
        return{
            products,
            error,
        };
}

    //funcion para buscar / filtrar
    export async function searchProducts(search) {

        // conservar instancia de supabase
        //asi podemos sutilizar al cliente las veces q sea necesario
        const supabase = supabaseCliente();

        const { data:products,console,error} = await supabase
        .from('products')
        .select()
        .like('name', `%${search}`);

        return{
            products,
            error,
        };
    }
   





export async function addProduct(product){

    //validar los datos
    let errorList = {};

        if(!product.name){
            errorList.name = "El nombre es obligatorio";
        }

        if(!product.price){
            errorList.price = "El precio es obligatorio";
        }else{
            if(!product.price.match("^[0-9]+$")){
                errorList.price = "El precio debe ser un numero"
            }
        }
        
        
        if(!product.description){
            errorList.description = "La descripcion es obligatorio";
        }

        if(Object.keys(errorList).length > 0){
            return{
                success: false,
                message: 'Ingresar los datos correctamente.',
                errors: errorList,
            };
        }

        

        //si no hay ningun error en los datos al mandar a insertar manejar error al insertar

        //mandar a insertar
        const cookieStore = cookies();
        const supabase = createClient(cookieStore);

        const { data, error } = await supabase
        .from('products')
        .insert([
            product,
        ])
        .select();
        
        //si hay algun error al insertar retornar un alert al cliente
        if(error){
            console.log(error)
            return{
                success: false,
                message: `Ocurrio un error al guardar el producto. Error: ${error.message}`,
                errors: null,
            };
        }

        return{
            success: true,
            message: 'El producto se ha registrado correctamente',
            errors: null,
        };
}


     //funcion para leer una notea por id
     export async function getProduct(id) {
        const supabase = supabaseCliente();

        const {data:product,error} = await supabase
        .from('products')
        .select()
        .eq('id',id)
        .single();

        return({
            product,
            error,
        });
    }

    

    // Función para actualizar un producto existente
    export async function updateProduct(id, updatedProduct) {
        const supabase = supabaseCliente();
    
        // Realizar la actualización del producto
        const { data, error } = await supabase
            .from('products')
            .update(updatedProduct) 
            .eq('id', id);
    
        if (error) {
        // Si hay un error, retornarlo
        return { error: error.message };
        } else {
        // Si la actualización fue exitosa, retornar un mensaje de éxito
        return { message: 'Producto actualizado correctamente' };
        }
  
    }