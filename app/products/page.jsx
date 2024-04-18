import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  //query que lee todos los registros de la tabla: notes
  const { data: products } = await supabase.from('products').select()

  return (
    <div className='flex flex-wrap gap-5 my-auto'>
        {products?.map((products)=>

        <div className='relative h-48 w-48'>
        <div className='absolute top-0 flex w-full justify-center'>
          <div className='left-0 h-[1px] animate-border-width rounded-full bg-gradient-to-r from-[rgba(17,17,17,0)] via-white to-[rgba(17,17,17,0)] transition-all duration-1000' />
        </div>
        <div className='flex flex-col h-full items-center justify-center rounded-md border border-slate-800 bg-black px-3 py-2'>
          <h5 className='text-slate-900'>{products.name}</h5>
          <p className='text-sm text-slate-200'>{products.price}</p>
          <p className='text-sm text-slate-200'>{products.description}</p>
        </div>
      </div>
        )}

    </div>
  )
}