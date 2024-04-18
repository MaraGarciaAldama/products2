//formulario para cambiar de contrasena 
//solo tiene acceso si se esta autenticado

//componente cliente
// estado para contrasena, confirmar contrasena
// *validar que la contrasena tenga longitud minima de: 6 caracteres
// contrasena y confirmar contrasena sean iguales
// mandar actualizar la contrasena desde una funcion 


"use client"
import { useEffect, useState } from "react"
import { updatePassword } from "./action";
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'



export default function upPassword() {

    const [password, setPassword] = useState('');
    const [passwordV, setPasswordV] = useState('');
   
    const supabase = createClient()
    const router = useRouter();

   useEffect(() => {
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                router.push("/login");
              }
        };
        checkSession();
    }, []);


    //esstado donde conservar los mensajes de error
    const [errors, setErrors] = useState({});

    function onSave(form) {
        //evitar el submit
        form.preventDefault();

        let errorList = {};

        //validar campos
        if (!password) {
            errorList.password = "La contrasena es obligatoria";
        } else {
            if (password.length < 6) {
                errorList.password = "La longitud minima es de 6";
            } else {
                if (password != passwordV) {
                    errorList.passwordV = "Las constrasenas no coinciden";
                }
            }
        }

        if (!passwordV) {
            errorList.passwordV = "La contrasena es obligatoria";
        } else {
            if (passwordV.length < 6) {
                errorList.passwordV = "La longitud minima es de 6";
            } else {
                if (password != passwordV) {
                    errorList.passwordV = "Las constrasenas no coinciden";
                }
            }
        }








        setErrors({ ...errorList });

        //si hay mensajes de error interrumpir el flujo
        if (Object.keys(errorList).length > 0) {
            return;
        }


        updatePassword({
            password: password,
            passwordV: passwordV,
        })
            .then((result) => {
                //cuando la accion se ejecute correctamente y retorne una respuesta
                console.log(result);
                //hacer algo con el resultado
                if (!result.success) {
                    alert(result.message);
                    //mostrar los mensajes d eerror
                    setErrors({ ...result.errors });
                } else {

                    alert(result.message);
                    //limpiar el form
                    setPassword('');
                    setPasswordV('');

                }
            })
            .catch((error) => {
                alert(error.message);

            })

    }


    return (
        <div className="flex justify-center mt-5">                
                <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" method="POST" onSubmit={onSave}>
                    <div class="mb-4">


                        <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                            Nueva Contrasena
                        </label>
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Nombre"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setErrors({
                                    ...errors,
                                    password: undefined,
                                });
                            }}

                        />
                        <p className="text-red-500 text-xs italic">{errors.password || ''}</p>
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                            Verificar contrasena*
                        </label>
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Descripcion"
                            value={passwordV}
                            onChange={(e) => {
                                setPasswordV(e.target.value);
                                setErrors({
                                    ...errors,
                                    passwordV: undefined,
                                });
                            }}
                        />
                        <p className="text-red-500 text-xs italic">{errors.passwordV || ''}</p>
                    </div>


                    <div class="flex items-center justify-center">
                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Actualizar contrasena
                        </button>
                    </div>
                </form>
           
        </div>
    )
}