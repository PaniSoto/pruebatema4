async function obtenerPaciente(id) {
    const response = await fetch(`http://localhost:4000/pacientes/${id}`);
    if (!response.ok) {
        throw new Error(`Error al obtener los datos del paciente con id ${id}`);
    }
    return response.json();
}

async function PaginaPaciente({ params }) {
    const { id } = params;
    
    // Llama a la API externa para obtener los datos del alumno
    const paciente = await obtenerPaciente(id);

    return (
        <div>
            <p>{paciente.nombre}</p>
            <p>{paciente.localidad}</p>
            <p>{new Date(paciente.fecha_nacimiento).toLocaleDateString()}</p>
        </div>
    );
}

export default PaginaPaciente;