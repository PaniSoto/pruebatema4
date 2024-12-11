import connection from "@/lib/mysql";
import { redirect } from "next/navigation";

async function modificarMedico(formData) {
    'use server'
    const id = formData.get('id')
    const nombre = formData.get('nombre')
    const especialidad = formData.get('especialidad')
    const perfil = formData.get('perfil')

    await connection.query('UPDATE medicos SET nombre=?, especialidad=?, perfil=? WHERE id=?',
        [nombre, especialidad, perfil, id])

    redirect(`/medicos-db/${id}`)
}

async function PaginaModificar({ params }) {
    const { id } = await params

    const [rows] = await connection.query('SELECT * FROM medicos WHERE id=?', [id]);
    const medico = rows[0];

    return (
        <>
            <form action={modificarMedico}>
                <input type="hidden" name="id" value={medico.id} />
                <input type="text" name="nombre" defaultValue={medico.nombre} />
                <input type="text" name="especialidad" defaultValue={medico.especialidad} />
                <input type="text" name="perfil" defaultValue={medico.perfil} />
                <button>Modificar</button>
            </form>
        </>
    );
}

export default PaginaModificar;