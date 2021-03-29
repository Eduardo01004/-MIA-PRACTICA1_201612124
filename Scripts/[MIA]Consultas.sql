use Practica1;

/*-----------------------consulta 1 ---------------------------*/
select HOSPITAL.nombre,HOSPITAL.direccion, count(VICTIMA.fecha_muerte) AS muertos
from VICTIMA
inner join HOSPITAL on HOSPITAL.id_hospital = VICTIMA.id_hospital
WHERE VICTIMA.fecha_muerte is not null and VICTIMA.fecha_muerte != '' and HOSPITAL.nombre != ''
group by HOSPITAL.nombre , HOSPITAL.direccion
ORDER BY muertos desc;

/*-------------------consulta 2 ------------------*/

select VICTIMA.nombre,VICTIMA.apellido,VICTIMA_TRATAMIENTO.efectividad_victima AS Efectividad, VICTIMA.estado,
TRATAMIENTO.tratamiento as Tratamiento
FROM VICTIMA
inner join VICTIMA_TRATAMIENTO ON VICTIMA.id_victima = VICTIMA_TRATAMIENTO.id_victima
inner join TRATAMIENTO ON TRATAMIENTO.id_tratamiento = VICTIMA_TRATAMIENTO.id_tratamiento
WHERE TRATAMIENTO.tratamiento = 'TRANSFUSIONES DE SANGRE' AND VICTIMA.estado = 'EN CUARENTENA'
and VICTIMA_TRATAMIENTO.efectividad_victima > 5;

/*----------------consulta 3 -------------------------*/

select VICTIMA.nombre, VICTIMA.apellido, VICTIMA.direccion, COUNT(VICTIMA.id_victima) AS ASOCIADOS
FROM VICTIMA
inner join ASOCIADO_VICTIMA ON VICTIMA.id_victima = ASOCIADO_VICTIMA.id_victima
WHERE VICTIMA.fecha_muerte is not null AND VICTIMA.nombre != ''
GROUP BY  VICTIMA.nombre,VICTIMA.apellido,VICTIMA.direccion
having count(VICTIMA.id_victima) > 3;

/*-------------CONSULTA 4 -------------------*/
select VICTIMA.nombre, VICTIMA.apellido,VICTIMA.estado,CONTACTO.tipo_contacto AS Contacto_fisico,
COUNT(VICTIMA.id_victima) AS Numero_asociados
from VICTIMA
inner join ASOCIADO_VICTIMA ON (VICTIMA.id_victima = ASOCIADO_VICTIMA.id_victima)
inner join CONTACTO_DETALLE ON ASOCIADO_VICTIMA.id_asociado_victima = CONTACTO_DETALLE.id_asociado_victima
inner join CONTACTO ON CONTACTO_DETALLE.id_contacto = CONTACTO.id_contacto
WHERE CONTACTO.tipo_contacto = 'Beso' and VICTIMA.estado = 'Sospecha'
group by VICTIMA.nombre, VICTIMA.apellido,VICTIMA.estado,CONTACTO.tipo_contacto
HAVING COUNT(VICTIMA.id_victima) > 2;

/*---------CONSULTA 5 -----------------------*/
select * from(
SELECT VICTIMA.nombre,VICTIMA.apellido,TRATAMIENTO.tratamiento,COUNT(VICTIMA.id_victima) as Cantidad
FROM VICTIMA
inner join VICTIMA_TRATAMIENTO ON VICTIMA.id_victima = VICTIMA_TRATAMIENTO.id_victima
inner join TRATAMIENTO ON VICTIMA_TRATAMIENTO.id_tratamiento = TRATAMIENTO.id_tratamiento 
WHERE TRATAMIENTO.tratamiento = 'Oxigeno' 
group by VICTIMA.nombre,VICTIMA.apellido,TRATAMIENTO.tratamiento
order by COUNT(VICTIMA.id_victima) DESC) AS C
LIMIT 5 ;


/*---counsulta 6-------------------*/
select VICTIMA.nombre,VICTIMA.apellido, VICTIMA.fecha_muerte,UBICACION.direccion,TRATAMIENTO.tratamiento
FROM VICTIMA
inner join UBICACION_VICTIMA ON VICTIMA.id_victima = UBICACION_VICTIMA.id_victima
inner JOIN UBICACION ON UBICACION_VICTIMA.id_ubicacion = UBICACION.id_ubicacion
inner join VICTIMA_TRATAMIENTO ON VICTIMA.id_victima = VICTIMA_TRATAMIENTO.id_victima
inner join TRATAMIENTO ON VICTIMA_TRATAMIENTO.id_tratamiento = TRATAMIENTO.id_tratamiento
WHERE UBICACION.direccion = '1987 Delphine Well' AND TRATAMIENTO.tratamiento = 'Manejo de la presion arterial';


select A.nombre,A.apellido,A.direccion, NO_TRATAMIENTOS from(
select VICTIMA.id_victima,VICTIMA.nombre,VICTIMA.apellido,VICTIMA.direccion,COUNT(ASOCIADO_VICTIMA.id_victima) AS ALLEGADO
FROM VICTIMA 
INNER JOIN ASOCIADO_VICTIMA ON VICTIMA.id_victima = ASOCIADO_VICTIMA.id_victima
group by VICTIMA.id_victima,VICTIMA.nombre,VICTIMA.apellido,VICTIMA.direccion
HAVING COUNT(ASOCIADO_VICTIMA.id_victima) < 2
) A inner JOIN
(select VICTIMA.id_victima,VICTIMA.nombre,VICTIMA.apellido,VICTIMA.direccion,COUNT(VICTIMA_TRATAMIENTO.id_victima) AS NO_TRATAMIENTOS
FROM VICTIMA
inner JOIN VICTIMA_TRATAMIENTO ON VICTIMA_TRATAMIENTO.id_victima = VICTIMA.id_victima
group by VICTIMA.id_victima,VICTIMA.nombre,VICTIMA.apellido,VICTIMA.direccion
HAVING COUNT(VICTIMA_TRATAMIENTO.id_victima) = 2)
TRATAMIENTOS ON TRATAMIENTOS.id_victima = A.id_victima;

