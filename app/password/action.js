"use server"

import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

/**Funcion para registrar un nuevo producto 
 *@param {*} form datos del producto
 * 
*/


export async function updatePassword(form) {


    //validar los datos
    let errorList = {};

    //validar campos
    if (!form.password) {
        errorList.password = "La contrasena es obligatoria";
    } else {
        if (form.password.length < 6) {
            errorList.password = "La longitud minima es de 6";
        } else {
            if (form.password != form.passwordV) {
                errorList.passwordV = "Las constrasenas no coinciden";
            }
        }
    }

    if (!form.passwordV) {
        errorList.passwordV = "La contrasena es obligatoria";
    } else {
        if (form.passwordV.length < 6) {
            errorList.passwordV = "La longitud minima es de 6";
        } else {
            if (form.password != form.passwordV) {
                errorList.passwordV = "Las constrasenas no coinciden";
            }
        }
    }

    if (Object.keys(errorList).length > 0) {
        return {
            success: false,
            message: 'Ingresar los datos correctamente.',
            errors: errorList,
        };
    }



    //si no hay errores en los datos mandar a insertar manejar error al insertar

    //mandar a insertar
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase.auth.updateUser({ password: form.password })


    if (error) {
        console.log(error)
        return {
            success: false,
            message: `Ocurrio un error al actualizar la contrasena Error: ${error.message}`,
            errors: null,
        };
    }

    return {
        success: true,
        message: 'Se ha cambiado la contrasena correctamente',
        errors: null,
    };
}