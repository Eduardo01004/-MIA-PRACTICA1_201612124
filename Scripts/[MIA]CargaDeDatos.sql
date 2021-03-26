use Practica1;
/*---------------CARGA DE DATOS A LA TABLA TEMPORAL-----------------------------------*/
LOAD DATA 
LOCAL INFILE '//home//eduardo//Escritorio//Practica1_201612124//Entrada//GRAND_VIRUS_EPICENTER.csv' 
INTO TABLE TEMPORAL 
CHARACTER SET UTF8
FIELDS TERMINATED BY ';' 
ignore 1 lines;
select *from TEMPORAL


INSERT INTO HOSPITAL(nombre,direccion)
SELECT DISTINCT TEMPORAL.Nombre_Hospital, TEMPORAL.Direccion_Hospital
from TEMPORAL
WHERE TEMPORAL.Nombre_Hospital is not null AND TEMPORAL.Direccion_Hospital is not null;
select *from HOSPITAL

INSERT INTO TRATAMIENTO (efectividad,tratamiento)
SELECT DISTINCT TEMPORAL.Efectividad, TEMPORAL.Tratamiento
from TEMPORAL
WHERE TEMPORAL.Efectividad is not null and TEMPORAL.Tratamiento is not null;
select *from TRATAMIENTO


INSERT INTO ASOCIADO (nombre,apellido)
SELECT DISTINCT TEMPORAL.Nombre_Asociado, TEMPORAL.Apellido_Asociado
from TEMPORAL
WHERE TEMPORAL.Nombre_Asociado is not null and TEMPORAL.Apellido_Asociado is not null;
select *from ASOCIADO

INSERT INTO UBICACION (direccion)
SELECT DISTINCT TEMPORAL.Ubicacion_Victima
from TEMPORAL
WHERE TEMPORAL.Ubicacion_Victima is not null;
select *from UBICACION

INSERT INTO CONTACTO (tipo_contacto)
SELECT DISTINCT TEMPORAL.Contacto_Fisico
from TEMPORAL
WHERE TEMPORAL.Contacto_Fisico is not null;
select *from CONTACTO

SET SQL_MODE='ALLOW_INVALID_DATES';
INSERT INTO VICTIMA (nombre,apellido,direccion,fecha_registro,fecha_muerte,fecha_primeraSospecha,id_hospital,estado)
SELECT DISTINCT Nombre_Victima,Apellido_Victima,Direccion_Victima,Fecha_Confirmacion,
Fecha_Muerte,Fecha_Primera_Sospecha,id_hospital,Estado_Victima
from TEMPORAL
inner join HOSPITAL on  HOSPITAL.nombre = Nombre_hospital;
select *from VICTIMA

SET SQL_MODE='ALLOW_INVALID_DATES';
INSERT INTO VICTIMA_TRATAMIENTO (inicio_tratamiento,fin_tratamiento,efectividad_victima,id_victima,id_tratamiento)
SELECT distinct Fecha_Inicio_Tratamiento,Fecha_Fin_Tratamiento,Efectividad_En_Victima,id_victima,id_tratamiento
from TEMPORAL
inner join VICTIMA on  VICTIMA.nombre = Nombre_Victima AND VICTIMA.apellido = Apellido_Victima
inner join TRATAMIENTO on TRATAMIENTO.tratamiento = TEMPORAL.Tratamiento;
select *from VICTIMA_TRATAMIENTO

SET SQL_MODE='ALLOW_INVALID_DATES';
INSERT INTO UBICACION_VICTIMA (fecha_llegada,fecha_salida,id_ubicacion,id_victima)
select distinct Fecha_Llegada,Fecha_Retiro,id_ubicacion,id_victima
from TEMPORAL
inner join UBICACION ON UBICACION.direccion = TEMPORAL.Ubicacion_Victima
inner join VICTIMA on  VICTIMA.nombre = Nombre_Victima AND VICTIMA.apellido = Apellido_Victima;
select *from UBICACION_VICTIMA

SET SQL_MODE='ALLOW_INVALID_DATES';
INSERT INTO ASOCIADO_VICTIMA (fecha_contagio,id_victima,id_asociado)
select distinct Fecha_conocio,id_victima,id_asociado
from TEMPORAL
inner join VICTIMA on  VICTIMA.nombre = TEMPORAL.Nombre_Victima AND VICTIMA.apellido = TEMPORAL.Apellido_Victima
inner join ASOCIADO on  ASOCIADO.nombre = TEMPORAL.Nombre_Asociado AND ASOCIADO.apellido = TEMPORAL.Apellido_Asociado;
select *from ASOCIADO_VICTIMA

SET SQL_MODE='ALLOW_INVALID_DATES';
INSERT INTO CONTACTO_DETALLE (inicio_contacto,fin_contacto,id_contacto,id_asociado_victima)
select distinct Fecha_Inicio_Contacto,Fecha_Fin_Contacto,id_contacto,id_asociado_victima
from TEMPORAL
inner join CONTACTO ON CONTACTO.tipo_contacto = TEMPORAL.Contacto_Fisico
inner JOIN ASOCIADO_VICTIMA ON ASOCIADO_VICTIMA.fecha_contagio = TEMPORAL.Fecha_Conocio
select *from CONTACTO_DETALLE


