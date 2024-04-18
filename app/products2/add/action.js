"use server"

import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

/**Funcion para registrar un nuevo producto 
 *@param {*} product datos del producto
 * 
*/
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

        

        //si no hay errores en los datos mandar a insertar manejar error al insertar

        //mandar a insertar
        const cookieStore = cookies();
        const supabase = createClient(cookieStore);

        const { data, error } = await supabase
        .from('products')
        .insert([
            product,
        ])
        .select();
        
        //si hay un error al insertar retornar un aviso al cliente
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