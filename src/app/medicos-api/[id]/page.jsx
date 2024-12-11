async function obtenerMedico(id) {
    const response = await fetch(`http://localhost:4000/medicos/${id}`);
    if (!response.ok) {
        throw new Error(`Error al obtener los datos del medico con id ${id}`);
    }
    return response.json();
}

async function PaginaMedico({ params }) {
    const { id } = params;

    const medico = await obtenerMedico(id);

    return (
        <div>
            <p>{medico.nombre}</p>
            <p>{medico.especialidad}</p>
            <p>{medico.perfil}</p>
        </div>
    );
}

export default PaginaMedico;