CREATE DATABASE AssistASAP_BD
USE AssistASAP_BD

CREATE TABLE Cliente
(
IDCliente INT PRIMARY KEY,
Nombre VARCHAR(30),
ApellidoP VARCHAR(30),
ApellidoM VARCHAR (30),
CorreoE VARCHAR(50)
)


CREATE TABLE OrdenServicio
(
IDOrden INT PRIMARY KEY,
Fecha DATE,
Descripcion VARCHAR(50),
Costo DECIMAL,
IDCliente INT
)

ALTER TABLE OrdenServicio ADD CONSTRAINT FK_Cliente 
FOREIGN KEY(IDCliente) REFERENCES Cliente(IDCliente)

INSERT INTO Cliente VALUES
(1, 'Eduardo', 'Reynoso','Rosales', 'eduardo@reynoso.com')

INSERT INTO OrdenServicio VALUES 
(1, GETDATE(), 'Orden para un cambio de llantas', 99.99,1),
(2, GETDATE(), 'Orden para un chequeo de aceite', 101.5, 1)

SELECT * FROM OrdenServicio

DELETE FROM OrdenServicio WHERE IDOrden = 4