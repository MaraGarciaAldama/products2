"use client"
import { useState, useEffect } from "react";
import { updateProduct, getProduct, getProducts} from "../../action";

import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

import { Button, ButtonGroup, Slider } from "@nextui-org/react";

import SliderM from "../../../../components/SliderM"



export default function AddProduct({ params }) {
    const [product, setProduct] = useState(null)

    const [products, setProducts] = useState(null)


    function gallery(id) {
        window.location.href = `/products2/gallery/${id}`;
    }

    const productCard = (product) => (
                <div
                    key={product.id}
                    className="p-4 h-[120px] bg-slate-200 border-1 w-[170px]"
                    onClick={() => gallery(product.id)}
                >
                    <p>{product.name}</p>
                    <br />
                    <p className="text-green-500">${product.price}</p>
                </div>
            );

    const regresar = () => {
        window.location.href = "/products2";
    }

    useEffect(() => {
        if (params.id) {
            // Si hay un ID, cargar los datos del producto correspondiente
            getProduct(params.id)
                .then((result) => {
                    if (result.error) {
                        console.error(result.error);
                    } else {
                        setProduct(result.product);
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [params]);


    useEffect(() => {
        const getData = async () => {
            const productsResult = await getProducts()
            setProducts(productsResult.products);

            //falta mostrar la info del error en caso de que se tenga 
            //productsResult.error
            if (productsResult.error) {
                alert(productsResult.error.message);
            }
        }
        getData()
    }, [])


    return (
        // boton para retornar al homepage
        <div className="flex justify-center flex-col my-2 mx-2">
            <div className="flex justify-start">
                <Button color="primary" onClick={regresar}>
                    Regresar
                </Button>
            </div>
            <p className="text-center text-4xl font-serif">Articulos de moda</p>

            {!!product ? (
                //muestra la galeria de imegenes en los productos
                <div className="max-m-[500px]">
                    <ImageGallery items={product?.gallery || []} autoPlay="true" />
                </div>

            ) : null

            }

            <div id="slider" className="my-2">
                <SliderM
                    height={120}
                    itemWidth={170}
                    items={products?.map((product) => productCard(product))}
                />
            </div>
        </div>
    );
}

