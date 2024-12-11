DROP DATABASE IF EXISTS hospital;

CREATE DATABASE hospital;
USE hospital;


CREATE TABLE pacientes (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(200) NOT NULL,
    localidad VARCHAR(200),
    fecha_nacimiento DATE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ALTER TABLE pacientes ADD COLUMN imagen VARCHAR(200) AFTER localidad;

INSERT INTO pacientes (nombre, localidad, fecha_nacimiento) 
VALUES 
  ('Juan', 'Espejo', '2000-01-21'),
  ('Miguel', 'Aguilar', '2002-06-11'),
  ('Ana', 'Monstilla', '2003-03-05');

  -- crear una tabla de clientes (copia lo de arriba)

-- ALTER TABLE pacientes ADD COLUMN imagen VARCHAR(200) AFTER localidad;
CREATE TABLE medicos (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(200) NOT NULL,
    especialidad VARCHAR(200),
    perfil VARCHAR(12),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ALTER TABLE alumnos ADD COLUMN imagen VARCHAR(200) AFTER localidad;

INSERT INTO profesores (nombre, especialidad, perfil) 
VALUES 
  ('Marco', 'Atencion primaria', 'Residente'),
  ('Pedro', 'Traumatólogo', 'Especialista'),
  ('Isabel', 'Dermatólogo', 'Residente');