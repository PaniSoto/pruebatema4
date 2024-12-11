import { redirect } from "next/navigation";

async function modificarMedico(formData) {
    'use server';
    const id = formData.get('id');
    const nombre = formData.get('nombre');
    const especialidad = formData.get('especialidad');
    const perfil = formData.get('perfil');

    const response = await fetch(`http://localhost:4000/medicos/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, especialidad, perfil }),
    });

    if (!response.ok) {
        throw new Error('Error al modificar el medico');
    }

    redirect(`/medicos-api/${id}`);
}

async function obtenerMedico(id) {
    const response = await fetch(`http://localhost:4000/medicos/${id}`);
    if (!response.ok) {
        throw new Error('Error al obtener los datos del medico');
    }
    return response.json();
}

async function PaginaModificar({ params }) {
    const { id } = params;
    const medico = await obtenerMedico(id);

    return (
        <>
            <form action={modificarMedico}>
                <input type="hidden" name="id" defaultValue={medico.id} />
                <input type="text" name="nombre" defaultValue={medico.nombre} />
                <input type="text" name="especialidad" defaultValue={medico.especialidad} />
                <input type="text" name="perfil" defaultValue={medico.perfil} />
                <button>Modificar</button>
            </form>
        </>
    );
}

export default PaginaModificar;