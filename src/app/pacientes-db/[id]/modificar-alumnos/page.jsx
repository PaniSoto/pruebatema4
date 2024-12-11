import connection from "@/lib/mysql";
import { redirect } from "next/navigation";

async function modificarPaciente(formData) {
    'use server'
    const id = formData.get('id')
    const nombre = formData.get('nombre')
    const localidad = formData.get('localidad')
    const fecha_nacimiento = formData.get('fecha_nacimiento')

    await connection.query('UPDATE pacientes SET nombre=?, localidad=?, fecha_nacimiento=? WHERE id=?',
        [nombre, localidad, fecha_nacimiento, id])

    redirect(`/pacientes-db/${id}`)
}

async function PaginaModificar({ params }) {
    const { id } = await params

    const [rows] = await connection.query('SELECT * FROM pacientes WHERE id=?', [id]);
    const paciente = rows[0];

    return (
        <>
            <form action={modificarPaciente}>
                <input type="hidden" name="id" value={paciente.id} />
                <input type="text" name="nombre" defaultValue={paciente.nombre} />
                <input type="text" name="localidad" defaultValue={paciente.localidad} />
                <input type="date" name="fecha_nacimiento" defaultValue={paciente.fecha_nacimiento.toISOString().split('T')[0]} />
                <button>Modificar</button>
            </form>
        </>
    );
}

export default PaginaModificar;