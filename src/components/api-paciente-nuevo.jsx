import { revalidatePath } from "next/cache";

async function nuevoPaciente(formData) {
    'use server'
    const [nombre, localidad, fecha_nacimiento] = formData.values()

    const response = await fetch('http://localhost:4000/pacientes', {
        method: 'POST',
        body: JSON.stringify({ nombre, localidad, fecha_nacimiento: fecha_nacimiento, createdAt: new Date().toISOString() })
    })
    const data = await response.json()

    revalidatePath('/pacientes-api')
}

function PacienteNuevo() {
    return (
        <form className='my-10 grid grid-cols-[150px_auto] gap-4'>

            <label htmlFor='nombre'>Nombre:</label>
            <input required id='nombre' name='nombre' className='p-1 border border-slate-200 focus:outline-blue-300 text-lg' />

            <label htmlFor='localidad'>Localidad:</label>
            <input required id='localidad' name='localidad' className='p-1 border border-slate-200 focus:outline-blue-300 text-lg' />

            <label htmlFor='fecha_nacimiento'>Fecha de nacimiento:</label>
            <input required id='fecha_nacimiento' name='fecha_nacimiento' type='date' className='p-1 border border-slate-200 focus:outline-blue-300 text-lg' />

            <div className='col-span-2 grid gap-2'>
                <button formAction={nuevoPaciente} className='bg-green-600 text-white px-4 py-2 rounded-xl'>
                    Guardar paciente
                </button>
                <button type='reset' className='bg-slate-600 text-white px-4 py-2 rounded-xl'>
                    Limpiar campos
                </button>
            </div>
        </form>
    );
}

export default PacienteNuevo; 