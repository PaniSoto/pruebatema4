import connection from "@/lib/mysql";
import { revalidatePath } from "next/cache";
import Link from "next/link";

async function eliminarPaciente(formData) {
    'use server'
    const id = formData.get('id')

    await connection.query('DELETE FROM pacientes WHERE id=?', [id])
}

async function insertarPaciente(formData) {
    'use server'
    const nombre = formData.get('nombre')
    const localidad = formData.get('localidad')
    const fecha_nacimiento = formData.get('fecha_nacimiento')

    await connection.query('INSERT INTO pacientes (nombre, localidad, fecha_nacimiento) VALUES (?, ?, ?)',
        [nombre, localidad, fecha_nacimiento])
    revalidatePath('/pacientes-db')
}



async function PaginaPacientes() {
    const [rows] = await connection.query('SELECT * FROM pacientes');
    console.log(rows);

    return (

        <>
            <form action={insertarPaciente}>
                <input type="text" name="nombre" placeholder="Nombre..." />
                <input type="text" name="localidad" placeholder="Localidad..." />
                <input type="date" name="fecha_nacimiento" placeholder="Fecha de nacimiento..." />
                <button>Insertar</button>
            </form>

            <div>
                Lista de pacientes
                {
                    rows.map(paciente=>
                        <div key={paciente.id}>
                            <Link href={`/pacientes-db/${paciente.id}`}>{paciente.nombre}</Link>
                            <Link href={`/pacientes-db/${paciente.id}/modificar-pacientes`}>Modificar</Link>

                            <form action={eliminarPaciente}>
                                <input type="hidden" name="id" value={paciente.id} />
                                <button className="text-red-500">Eliminar</button>
                            </form>
                        </div>)
                }
            </div>
        </>
    );
}

export default PaginaPacientes;