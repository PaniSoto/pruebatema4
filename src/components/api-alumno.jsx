import Buscar from '@/components/buscar'
import Link from 'next/link'
import { revalidatePath } from 'next/cache'

async function obtenerPacientes(query) {
    const response = await fetch('http://localhost:4000/pacientes')
    const pacientes = await response.json()

    // Introducimos un retardo artificial
    // await new Promise(resolve => setTimeout(resolve, 2000))

    return pacientes.filter(paciente => paciente.nombre.toLowerCase().includes(query))
}


async function eliminarPaciente(formData) {
    'use server'
    const id = formData.get('id')

    await fetch('http://localhost:4000/pacientes/' + id, { method: 'DELETE' })

    revalidatePath('/pacientes-api')
}

async function Pacientes({ query }) {
    const pacientes = await obtenerPacientes(query)

    return (
        <>
            <h1 className='text-2xl text-slate-600 py-2  mb-2 border-b-2 border-b-slate-600'>
                Lista de pacientes (API)
            </h1>

            <Buscar />

            <div className='flex flex-col'>
                {pacientes.sort((a, b) => a.createdAt - b.createdAt).reverse()  // Orden inverso de tiempo                           
                    .map((paciente) => (
                        <div key={paciente.id} className='p-2 odd:bg-slate-100 flex justify-between'>
                            <Link href={`/pacientes-api/${paciente.id}`}>{paciente.nombre}</Link>
                            <div className='flex gap-6'>
                                <form>
                                    <input type="hidden" name='id' value={paciente.id} />
                                    <button formAction={eliminarPaciente} title='ELIMINAR'>❌</button>
                                </form>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default Pacientes