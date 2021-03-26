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