"use client"

import { useEffect, useState } from "react";
import { getNote } from "../../actions";

export default function Page({params}) {
    const [notes,setNote] = useState({});

    //leere el registro d e la BD

    useEffect(()=>{
        const loadNote =async()=>{

            const notesResult = await getNote(params.id);

            //pasar los datos de la nota al estado note
            setNote(notesResult.notes);
            if(notesResult.error){
                alert(notesResult.error.message);
            }
        };

        loadNote();
    })
    console.log(notes);
    //formulario para editar la nota
    return (
        <form>
            <input
            value={notes?.title ||''}
            />
        </form>
    )
}