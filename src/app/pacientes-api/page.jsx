'use client';
import { useState, useEffect } from "react";
import Link from "next/link";

async function eliminarPaciente(formData) {
    const id = formData.get('id');
    const response = await fetch(`http://localhost:4000/pacientes/${id}`, { //Si la ruta falla mirar aqui
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Error al eliminar el paciente');
    }
}

async function insertarPaciente(formData) {
    const nombre = formData.get('nombre');
    const localidad = formData.get('localidad');
    const fecha_nacimiento = formData.get('fecha_nacimiento');

    const response = await fetch('http://localhost:4000/pacientes', { //Si la ruta falla mirar aqui
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, localidad, fecha_nacimiento }),
    });

    if (!response.ok) {
        throw new Error('Error al insertar el paciente');
    }
}

async function obtenerPacientes() {
    const response = await fetch('http://localhost:4000/pacientes'); //Si la ruta falla mirar aqui
    if (!response.ok) {
        throw new Error('Error al obtener los pacientes');
    }
    return response.json();
}

function PaginaPacientes() {
    const [pacientes, setPacientes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        obtenerPacientes()
            .then(data => {
                setPacientes(data);
                setLoading(false);
            })
            .catch(error => console.error(error));
    }, []);

    if (loading) return <p>Cargando pacientes...</p>;

    return (
        <>
            <form onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                try {
                    await insertarPaciente(formData);
                    setPacientes(await obtenerPacientes());
                } catch (error) {
                    console.error(error);
                }
            }}>
                <input type="text" name="nombre" placeholder="Nombre..." required />
                <input type="text" name="localidad" placeholder="Localidad..." required />
                <input type="date" name="fecha_nacimiento" placeholder="Fecha de nacimiento..." required />
                <button className="text-blue-500">Insertar</button>
            </form>

            <div>
                <h3>Lista de Pacientes</h3>
                {
                    pacientes.map(paciente => (
                        <div key={paciente.id}>
                            <Link href={`/pacientes-api/${paciente.id}`}> {paciente.nombre}</Link>
                            <Link className="text-green-500" href={`/pacientes-api/${paciente.id}/modificar-pacientes-api`}> Modificar</Link>

                            <form onSubmit={async (e) => {
                                e.preventDefault();
                                const formData = new FormData(e.target);
                                try {
                                    await eliminarPaciente(formData);
                                    setPacientes(await obtenerPacientes());
                                } catch (error) {
                                    console.error(error);
                                }
                            }}>
                                <input type="hidden" name="id" value={paciente.id} />
                                <button className="text-red-500">Eliminar</button>
                            </form>
                        </div>
                    ))
                }
            </div>
        </>
    );
}

export default PaginaPacientes;