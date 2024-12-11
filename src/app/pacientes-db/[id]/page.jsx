import connection from "@/lib/mysql";

async function PaginaPaciente({ params }) {
    const { id } = await params

    const [rows] = await connection.query('SELECT * FROM pacientes WHERE id=?', [id]);
    const paciente = rows[0];

    return (
        <div>
            <p>{paciente.nombre}</p>
            <p>{paciente.localidad}</p>
            <p>{paciente.fecha_nacimiento.toLocaleDateString()}</p>
        </div>
    );
}

export default PaginaPaciente;