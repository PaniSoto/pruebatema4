import connection from "@/lib/mysql";

async function PaginaMedico({ params }) {
    const { id } = await params

    const [rows] = await connection.query('SELECT * FROM medicos WHERE id=?', [id]);
    const medico = rows[0];

    return (
        <div>
            <h1>{medico.nombre}</h1>
            <p>Especialidad: {medico.especialidad}</p>
            <p>Estado civil: {medico.perfil}</p>
        </div>
    );
}

export default PaginaMedico;