"use client"
import { useState, useEffect } from "react";
import { updateProduct, getProduct } from "../../action";



export default function AddProduct({ params }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (params.id) {
            // Si hay un ID, cargar los datos del producto correspondiente
            getProduct(params.id)
                .then((result) => {
                    if (result.error) {
                        console.error(result.error);
                    } else {
                        const { name, description, price } = result.product;
                        setName(name);
                        setDescription(description);
                        setPrice(price);
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [params]);

    function onSave(form) {
        form.preventDefault();

        let errorList = {};

        if (!name) {
            errorList.name = "El nombre es obligatorio";
        }
        if (!description) {
            errorList.description = "La descripción es obligatoria";
        }
        if(!price){
            errorList.price = "El precio es obligatorio";
        }

        setErrors({ ...errorList });

        if (Object.keys(errorList).length > 0) {
            return;
        }

        updateProduct(params.id, { name, description, price })
            .then((result) => {
                console.log(result);
                if (!result.message) {
                    alert(result.error);
                } else {
                    alert(result.message);
                    window.location.reload();
                }
            })
            .catch((error) => {
                alert(error.message);
            });
    }

    const regresar = () => {
        window.location.href = '/products2';
    }

    return (
        <div>
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 my-4" method="POST" onSubmit={onSave}>
                    
                <p className="font-sans text-xl">Actualizar producto</p>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Nombre*
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name"
                        type="text"
                        placeholder="Nombre"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                            setErrors({
                                ...errors,
                                name: undefined,
                            });
                        }}
                    />
                    <p className="text-red-500 text-xs italic">{errors.name || ''}</p>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                        Descripción*
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="description"
                        type="text"
                        placeholder="Descripción"
                        value={description}
                        onChange={(e) => {
                            setDescription(e.target.value);
                            setErrors({
                                ...errors,
                                description: undefined,
                            });
                        }}
                    />
                    <p className="text-red-500 text-xs italic">{errors.description || ''}</p>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                        Precio*
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="price"
                        type="text"
                        placeholder="Precio"
                        value={price}
                        onChange={(e) => {
                            setPrice(e.target.value);
                            setErrors({
                                ...errors,
                                price: undefined,
                            });
                        }}
                    />
                    <p className="text-red-500 text-xs italic">{errors.price || ''}</p>
                </div>
                <div className="flex items-center justify-center">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Actualizar producto
                    </button>
                </div>
            </form>
        </div>
    );
}

