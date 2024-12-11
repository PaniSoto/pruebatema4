import { redirect } from "next/navigation";

async function modificarPaciente(formData) {
    'use server';
    const id = formData.get('id');
    const nombre = formData.get('nombre');
    const localidad = formData.get('localidad');
    const fecha_nacimiento = formData.get('fecha_nacimiento');

    const response = await fetch(`http://localhost:4000/pacientes/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, localidad, fecha_nacimiento }),
    });

    if (!response.ok) {
        throw new Error('Error al modificar el paciente');
    }

    redirect(`/pacientes-api/${id}`);
}

async function obtenerPaciente(id) {
    const response = await fetch(`http://localhost:4000/pacientes/${id}`);
    if (!response.ok) {
        throw new Error('Error al obtener los datos del paciente');
    }
    return response.json();
}

async function PaginaModificar({ params }) {
    const { id } = params;
    const paciente = await obtenerPaciente(id);

    return (
        <>
            <form action={modificarPaciente}>
                <input type="hidden" name="id" defaultValue={paciente.id} />
                <input type="text" name="nombre" defaultValue={paciente.nombre} />
                <input type="text" name="localidad" defaultValue={paciente.localidad} />
                <input type="date" name="fecha_nacimiento" defaultValue={new Date(paciente.fecha_nacimiento).toISOString().split('T')[0]}/>
                <button>Modificar</button>
            </form>
        </>
    );
}

export default PaginaModificar;