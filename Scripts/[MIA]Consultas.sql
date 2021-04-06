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
WHERE TRATAMIENTO.tratamiento = 'TRANSFUSIONES DE SANGRE' AND VICTIMA.estado = 'EN CUARENTENA' and TRATAMIENTO.tratamiento != ''
and VICTIMA_TRATAMIENTO.efectividad_victima > 5;

/*----------------consulta 3 -------------------------*/

select VICTIMA.nombre, VICTIMA.apellido, VICTIMA.direccion, COUNT(VICTIMA.id_victima) AS ASOCIADOS
FROM VICTIMA
inner join ASOCIADO_VICTIMA ON VICTIMA.id_victima = ASOCIADO_VICTIMA.id_victima
WHERE VICTIMA.fecha_muerte is not null AND VICTIMA.fecha_muerte != '0000-00-00 00:00:00' 
GROUP BY  VICTIMA.id_victima,VICTIMA.nombre,VICTIMA.apellido,VICTIMA.direccion
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
select DISTINCT VICTIMA.nombre,VICTIMA.apellido, VICTIMA.fecha_muerte,UBICACION.direccion,TRATAMIENTO.tratamiento
FROM VICTIMA
inner join UBICACION_VICTIMA ON VICTIMA.id_victima = UBICACION_VICTIMA.id_victima
inner JOIN UBICACION ON UBICACION_VICTIMA.id_ubicacion = UBICACION.id_ubicacion
inner join VICTIMA_TRATAMIENTO ON VICTIMA.id_victima = VICTIMA_TRATAMIENTO.id_victima
inner join TRATAMIENTO ON VICTIMA_TRATAMIENTO.id_tratamiento = TRATAMIENTO.id_tratamiento
WHERE UPPER(UBICACION.direccion) = '1987 Delphine Well' AND UPPER(TRATAMIENTO.tratamiento) = 'Manejo de la presion arterial';

/*--------------consulta 7------------*/
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

/*------------consulta 8-----------*/
select date_format(fecha_primeraSospecha,'%m') AS MES, nombre,apellido, trat as NO_TRATAMIENTO FROM
(
select VICTIMA.nombre,VICTIMA.apellido,VICTIMA.fecha_primeraSospecha,count(VICTIMA_TRATAMIENTO.id_victima) AS trat
from VICTIMA_TRATAMIENTO
INNER JOIN VICTIMA ON VICTIMA.id_victima = VICTIMA_TRATAMIENTO.id_victima
group by VICTIMA.nombre,VICTIMA.apellido,VICTIMA.fecha_primeraSospecha
order by count(VICTIMA_TRATAMIENTO.id_victima) desc
limit 5
)as t1 union
(
select date_format(VICTIMA.fecha_primeraSospecha,'%m'),VICTIMA.nombre,VICTIMA.apellido,count(VICTIMA_TRATAMIENTO.id_victima) AS trat2
from VICTIMA_TRATAMIENTO
INNER JOIN VICTIMA ON VICTIMA.id_victima = VICTIMA_TRATAMIENTO.id_victima
group by VICTIMA.nombre,VICTIMA.apellido,VICTIMA.fecha_primeraSospecha
order by count(VICTIMA_TRATAMIENTO.id_victima) asc
limit 5
);

/*----------CONSULTA 9 -----------*/

select HOSPITAL.nombre,HOSPITAL.direccion,truncate(count(HOSPITAL.id_hospital) / (SELECT COUNT(*) FROM VICTIMA WHERE VICTIMA.id_hospital)*100,2) as Porcentaje
from HOSPITAL
INNER JOIN VICTIMA ON VICTIMA.id_hospital = HOSPITAL.id_hospital
where  HOSPITAL.nombre != ''
group by HOSPITAL.id_hospital,HOSPITAL.nombre,HOSPITAL.direccion
order by porcentaje asc;

/*----------CONSULTA 10 -**********/

select distinct ANI.nombre AS Nombre, ANI.tipo_contacto as Contacto, truncate(cont/T*100,2) as Victimas
from(
	select distinct nombre, Max(cont) as maxi from(
		select distinct HOSPITAL.nombre,CONTACTO.tipo_contacto, COUNT(CONTACTO.id_contacto) AS cont
        FROM HOSPITAL
        inner JOIN VICTIMA ON VICTIMA.id_hospital = HOSPITAL.id_hospital
        INNER JOIN ASOCIADO_VICTIMA ON VICTIMA.id_victima = ASOCIADO_VICTIMA.id_victima
        INNER JOIN CONTACTO_DETALLE ON ASOCIADO_VICTIMA.id_asociado_victima = CONTACTO_DETALLE.id_asociado_victima
        INNER JOIN CONTACTO ON CONTACTO_DETALLE.id_contacto = CONTACTO.id_contacto
        GROUP BY HOSPITAL.nombre,CONTACTO.tipo_contacto

    )c2 GROUP BY nombre
)maximos inner join 
(
	select  distinct HOSPITAL.nombre,COUNT(CONTACTO_DETALLE.id_contacto) AS T
    FROM HOSPITAL
    inner JOIN VICTIMA ON VICTIMA.id_hospital = HOSPITAL.id_hospital
    INNER JOIN ASOCIADO_VICTIMA ON VICTIMA.id_victima = ASOCIADO_VICTIMA.id_victima
    INNER JOIN CONTACTO_DETALLE ON ASOCIADO_VICTIMA.id_asociado_victima = CONTACTO_DETALLE.id_asociado_victima
    GROUP BY HOSPITAL.nombre
)TOTALES ON TOTALES.nombre = maximos.nombre inner join 
(
	select  distinct HOSPITAL.nombre,CONTACTO.tipo_contacto,COUNT(CONTACTO.id_contacto) AS cont
	FROM HOSPITAL
	inner JOIN VICTIMA ON VICTIMA.id_hospital = HOSPITAL.id_hospital
	INNER JOIN ASOCIADO_VICTIMA ON VICTIMA.id_victima = ASOCIADO_VICTIMA.id_victima
	INNER JOIN CONTACTO_DETALLE ON ASOCIADO_VICTIMA.id_asociado_victima = CONTACTO_DETALLE.id_asociado_victima
	INNER JOIN CONTACTO ON CONTACTO_DETALLE.id_contacto = CONTACTO.id_contacto
	GROUP BY HOSPITAL.nombre,CONTACTO.tipo_contacto
    
) ANI ON ANI.cont = maximos.maxi and ANI.nombre = maximos.nombre 
where ANI.tipo_contacto != '' and ANI.nombre != ''
order by ANI.nombre;
