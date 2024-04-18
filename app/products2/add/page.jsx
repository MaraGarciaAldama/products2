"use client"
import { useState } from "react"
import { addProduct } from "./action";


export default function AddProduct(){

    const [name,setName] = useState('');
    const [description,setDescription] = useState('');
    const [price,setPrice] = useState('');

    //esstado donde conservar los mensajes de error
    const [errors,setErrors] = useState({});
    
    function onSave(form) {
        //evitar el submit
        form.preventDefault();
        
        let errorList ={};

        //validar campos
        if(!name){
            errorList.name = "El nombre es obligatorio";  
           
        }
        if(!description){
            errorList.description = "La descripcion es obligatorio";
          
           
        }

        if(!price){
            errorList.price = "El precio es obligatorio";
        }else {
            //const validPrice =  price.match("^[0-9]+$");
            if(!price.match("^[0-9]+$")){
                errorList.price = "El precio debe ser un numero"
            }
        }


        setErrors({...errorList});

        //si hay mensajes de error interrumpir el flujo
        if(Object.keys(errorList).length>0) {
            return;
        }
        
        
        //alert("Se guardaron los datos");
        //mandar a guardar el producto
        addProduct({
            name,
            description,
            price,
        })
        .then((result)=>{
            //cuando la accion se ejecute correctamente y retorne una respuesta
            console.log(result);
            //hacer algo con el resultado
            if(!result.success){
                alert(result.message);
                //mostrar los mensajes d eerror
                setErrors({...result.errors});
            }else{
                //si se guardo
                ///???
                alert(result.message);
                //limpiar el form
                setName('');
                setDescription('');
                setPrice('');
                //limpiar errores
                //setErrors({});

            }
        })
        .catch((error)=>{
            alert(error.message);

        })

    }


    const regresar=()=>{
        window.location.href = '../products2';
    }

    return(
        <div>
            
            <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 my-4" method="POST" onSubmit={onSave}>
                    <button type="button" onClick={() => regresar()} class="bg-yellow-400 hover:bg-yellow-700 text-white font-bold py-2 px-2 text-xs rounded focus:outline-none focus:shadow-outline">
                        Regresar
                    </button>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                    Nombre*
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Nombre"
                    value={name}
                    onChange={(e)=>{
                        setName(e.target.value);
                        setErrors({
                            ...errors,
                            name: undefined,
                        });
                    }}
                    
                    />
                    <p className="text-red-500 text-xs italic">{errors.name || ''}</p>
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                    Descripcion*
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Descripcion"
                    value={description}
                    onChange={(e)=>{
                        setDescription(e.target.value);
                        setErrors({
                            ...errors,
                            description: undefined,
                        });
                    }}
                    />
                    <p className="text-red-500 text-xs italic">{errors.description || ''}</p>
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                    Precio*
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Precio"
                    value={price}
                    onChange={(e)=>{
                        setPrice(e.target.value);
                        setErrors({
                            ...errors,
                            price: undefined,
                        });
                    }}
                    />
                    <p className="text-red-500 text-xs italic">{errors.price || ''}</p>
                </div>
                <div class="flex items-center justify-center">
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                       Registrar producto
                    </button> 
                    
                </div>
            </form>
           
        </div>
    )
}