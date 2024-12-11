import connection from "@/lib/mysql";
import { revalidatePath } from "next/cache";
import Link from "next/link";

async function eliminarMedico(formData) {
    'use server'
    const id = formData.get('id')

    await connection.query('DELETE FROM medicos WHERE id=?', [id])
}

async function insertarMedico(formData) {
    'use server'
    const nombre = formData.get('nombre')
    const especialidad = formData.get('especialidad')
    const perfil = formData.get('perfil')

    await connection.query('INSERT INTO medicos (nombre, especialidad, perfil) VALUES (?, ?, ?)',
        [nombre, especialidad, perfil])
    revalidatePath('/medicos-db') 
}

async function PaginaMedicos() {
    const [rows] = await connection.query('SELECT * FROM medicos');
    console.log(rows);

    return (

        <>
            <form action={insertarMedico}>
                <input type="text" placeholder="Nombre..." name="nombre" />
                <input type="text" placeholder="Especialidad..." name="especialidad" />
                <input type="text" placeholder="Perfil..." name="perfil" />
                <button>Insertar</button>
            </form>

            <div>
                Lista de medicos
                {
                    rows.map(medico=>
                        <div key={medico.id}>
                            <Link href={`/medicos-db/${medico.id}`}>{medico.nombre}</Link>
                            <Link href={`/medicos-db/${medico.id}/modificar`}>Modificar</Link>

                            <form action={eliminarMedico}>
                                <input type="hidden" name="id" value={medico.id} />
                                <button className="text-red-500">Eliminar</button>
                            </form>
                        </div>)
                }
            </div>
        </>
    );
}

export default PaginaMedicos;