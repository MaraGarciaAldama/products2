"use server"

import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

function supabaseCliente(){
    const cookieStore = cookies();
    return createClient(cookieStore);
}

//archivo de acciones para: notas
export async function getNotes(){

    //crear cliente de supebase
    const { data:notes,error} = await supabaseCliente()
        .from('notes')
        .select();
        
        return{
            notes,
            error,
        };
}

    //funcion para buscar / filtrar
    export async function searchNotes(search) {

        // conservar instancia de supabase
        //asi podemos sutilizar al cliente las veces q sea necesario
        const supabase = supabaseCliente();

        const { data:notes,console,error} = await supabase
        .from('notes')
        .select()
        .like('title', `%${search}`);

        return{
            notes,
            error,
        };
    }

    export async function getNote(id){
        const supabase = supabaseCliente();

        const{data,error} = await supabase
        .from('notes')
        .select()
        .eq('id', id)
        .single();

        return({
            notes:data,
            error,
        });
    }

