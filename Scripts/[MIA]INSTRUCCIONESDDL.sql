create database Practica1;
use Practica1;

DROP TABLE CONTACTO_DETALLE;
DROP TABLE ASOCIADO_VICTIMA;
DROP TABLE UBICACION_VICTIMA;
DROP TABLE VICTIMA_TRATAMIENTO;
DROP TABLE VICTIMA;
DROP TABLE HOSPITAL;
DROP TABLE TRATAMIENTO;
DROP TABLE CONTACTO;
DROP TABLE ASOCIADO;
DROP TABLE UBICACION;
DROP TABLE TEMPORAL;

CREATE TABLE HOSPITAL(
id_hospital int not null AUTO_INCREMENT,
nombre varchar(200) NOT NULL,
direccion varchar(200) NOT NULL,
primary key (id_hospital)
);

CREATE TABLE TRATAMIENTO(
id_tratamiento int not null AUTO_INCREMENT,
efectividad int,
tratamiento varchar(200) NOT NULL,
primary key (id_tratamiento)
);

CREATE TABLE VICTIMA(
id_victima int not null auto_increment,
nombre varchar(200) not null,
apellido varchar(200) not null,
direccion varchar(200) not null,
fecha_registro datetime,
fecha_muerte datetime,
fecha_primeraSospecha datetime,
id_hospital int not null,
estado varchar(50),
primary key(id_victima),
foreign key (id_hospital) references HOSPITAL (id_hospital)
);
 ALTER TABLE VICTIMA MODIFY fecha_muerte datetime  NULL DEFAULT '1970-01-02';
 ALTER TABLE VICTIMA MODIFY fecha_registro datetime  NULL DEFAULT '1970-01-02';
 ALTER TABLE VICTIMA MODIFY fecha_primeraSospecha datetime  NULL DEFAULT '1970-01-02';

CREATE TABLE ASOCIADO(
id_asociado int not null auto_increment,
nombre varchar(200) not null,
apellido varchar(200) not null,
primary key(id_asociado)
);

CREATE TABLE UBICACION(
id_ubicacion int not null auto_increment,
direccion varchar(200),
primary key(id_ubicacion)
);

CREATE TABLE CONTACTO(
id_contacto int not null auto_increment,
tipo_contacto varchar(200) NOT NULL,
primary key(id_contacto)
);

CREATE TABLE VICTIMA_TRATAMIENTO(/*--------tratamiento_oersina*/
id_victima_tratamiento int not null auto_increment,
inicio_tratamiento datetime,
fin_tratamiento datetime,
id_victima int not null,
id_tratamiento int not null,
efectividad_victima int not null,
primary key (id_victima_tratamiento),
foreign key (id_victima) references VICTIMA (id_victima),
foreign key (id_tratamiento) references TRATAMIENTO (id_tratamiento)
);
ALTER TABLE VICTIMA_TRATAMIENTO MODIFY inicio_tratamiento datetime  NULL DEFAULT '1970-01-02';
ALTER TABLE VICTIMA_TRATAMIENTO MODIFY fin_tratamiento datetime  NULL DEFAULT '1970-01-02';

CREATE TABLE UBICACION_VICTIMA(/*---------ubicacion------*/
id_ubicacion_victima int not null auto_increment,
fecha_llegada datetime,
fecha_salida datetime,
id_ubicacion int not null,
id_victima int not null,
primary key (id_ubicacion_victima),
foreign key (id_victima) references VICTIMA (id_victima),
foreign key (id_ubicacion) references UBICACION (id_ubicacion)
);
ALTER TABLE UBICACION_VICTIMA MODIFY fecha_llegada datetime  NULL DEFAULT '1970-01-02';
ALTER TABLE UBICACION_VICTIMA MODIFY fecha_salida datetime  NULL DEFAULT '1970-01-02';

CREATE TABLE ASOCIADO_VICTIMA( /*----conocimiento--*/
id_asociado_victima int not null auto_increment,
fecha_contagio datetime,
id_victima int not null,
id_asociado int not null,
primary key (id_asociado_victima),
foreign key (id_victima) references VICTIMA (id_victima),
foreign key (id_asociado) references ASOCIADO (id_asociado)
);
ALTER TABLE ASOCIADO_VICTIMA MODIFY fecha_contagio datetime  NULL DEFAULT '1970-01-02';

CREATE TABLE CONTACTO_DETALLE(
id_contacto_detalle int not null auto_increment,
inicio_contacto datetime,
fin_contacto datetime,
id_contacto int not null,
id_asociado_victima int not null,
primary key (id_contacto_detalle),
foreign key (id_contacto) references CONTACTO (id_contacto),
foreign key (id_asociado_victima) references ASOCIADO_VICTIMA (id_asociado_victima)
);

CREATE TABLE TEMPORAL(
    Nombre_Victima              VARCHAR(150),
    Apellido_Victima            VARCHAR(150),
    Direccion_Victima           VARCHAR(150),
    Fecha_Primera_Sospecha      datetime,
    Fecha_Confirmacion          datetime,
    Fecha_Muerte                datetime,
    Estado_Victima              VARCHAR(150),
    Nombre_Asociado             VARCHAR(150),
    Apellido_Asociado           VARCHAR(150),
    Fecha_Conocio               datetime,
    Contacto_Fisico             VARCHAR(150),
    Fecha_Inicio_Contacto       datetime,
    Fecha_Fin_Contacto          datetime,
    Nombre_Hospital             VARCHAR(150),
    Direccion_Hospital          VARCHAR(150),
    Ubicacion_Victima           VARCHAR(150),
    Fecha_Llegada               datetime,
    Fecha_Retiro                datetime,
    Tratamiento                 VARCHAR(150),
    Efectividad                 integer,
    Fecha_Inicio_Tratamiento    datetime,
    Fecha_Fin_Tratamiento       datetime,
    Efectividad_En_Victima      integer
);
select*from TEMPORAL;
ALTER TABLE TEMPORAL MODIFY Fecha_Muerte datetime  NULL DEFAULT '1970-01-02';
ALTER TABLE TEMPORAL MODIFY Fecha_Inicio_Tratamiento datetime  NULL DEFAULT '1970-01-02';
ALTER TABLE TEMPORAL MODIFY Fecha_Muerte datetime  NULL DEFAULT '1970-01-02';

