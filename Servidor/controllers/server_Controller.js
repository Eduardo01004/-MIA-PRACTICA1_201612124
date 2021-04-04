var sessionController = {}

var mysql = require('mysql');


var connection = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: 'Lamaravilla_96',
   database: 'Practica1',
   port: 3306
});

/*-----------------------CONSULTAS-------------*/

sessionController.c1 = async function (req, res) {
    var sql = "select HOSPITAL.nombre,HOSPITAL.direccion, count(VICTIMA.fecha_muerte) AS muertos \n" +
    "from VICTIMA \n"+
    "inner join HOSPITAL on HOSPITAL.id_hospital = VICTIMA.id_hospital\n"+
    "WHERE VICTIMA.fecha_muerte is not null and VICTIMA.fecha_muerte != '' and HOSPITAL.nombre != ''\n" +
    "group by HOSPITAL.nombre , HOSPITAL.direccion\n"
    "ORDER BY muertos desc;\n"

    connection.query(sql,async function(error, result){
        if(error){  
            console.log("Error al conectar");
            console.log(error);
        
        }else{
            console.log(JSON.stringify(result))
            res.json(result);
           
        }
    }
    );
}

sessionController.c2 = async function (req, res) {
    var sql = "select VICTIMA.nombre,VICTIMA.apellido,VICTIMA_TRATAMIENTO.efectividad_victima AS Efectividad, VICTIMA.estado, \n" +
    "TRATAMIENTO.tratamiento as Tratamiento \n"+
    "FROM VICTIMA\n"+
    "inner join VICTIMA_TRATAMIENTO ON VICTIMA.id_victima = VICTIMA_TRATAMIENTO.id_victima\n" +
    "inner join TRATAMIENTO ON TRATAMIENTO.id_tratamiento = VICTIMA_TRATAMIENTO.id_tratamiento\n"
    "WHERE TRATAMIENTO.tratamiento = 'TRANSFUSIONES DE SANGRE' AND VICTIMA.estado = 'EN CUARENTENA' and TRATAMIENTO.tratamiento != '' \n" + 
    "and VICTIMA_TRATAMIENTO.efectividad_victima > 5;"

    connection.query(sql,async function(error, result){
        if(error){  
            console.log("Error al conectar");
            console.log(error);
        
        }else{
            console.log(JSON.stringify(result))
            res.json(result);
           
        }
    }
    );
}

sessionController.c3 = async function (req, res) {
    var sql = "select VICTIMA.nombre, VICTIMA.apellido, VICTIMA.direccion, COUNT(VICTIMA.id_victima) AS ASOCIADOS \n" +
    "from VICTIMA \n"+
    "inner join ASOCIADO_VICTIMA ON VICTIMA.id_victima = ASOCIADO_VICTIMA.id_victima\n"+
    "WHERE VICTIMA.fecha_muerte is not null AND VICTIMA.fecha_muerte != '0000-00-00 00:00:00' \n" +
    "GROUP BY  VICTIMA.id_victima,VICTIMA.nombre,VICTIMA.apellido,VICTIMA.direccion \n"
    "having count(VICTIMA.id_victima) > 3;\n"

    connection.query(sql,async function(error, result){
        if(error){  
            console.log("Error al conectar");
            console.log(error);
        
        }else{
            console.log(JSON.stringify(result))
            res.json(result);
           
        }
    }
    );
}

sessionController.c4 = async function (req, res) {
    var sql = "select VICTIMA.nombre, VICTIMA.apellido,VICTIMA.estado,CONTACTO.tipo_contacto AS Contacto_fisico, \n" +
    "COUNT(VICTIMA.id_victima) AS Numero_asociados\n"+
    "from VICTIMA \n"+
    "inner join ASOCIADO_VICTIMA ON (VICTIMA.id_victima = ASOCIADO_VICTIMA.id_victima)\n"+
    "inner join CONTACTO_DETALLE ON ASOCIADO_VICTIMA.id_asociado_victima = CONTACTO_DETALLE.id_asociado_victima\n"+
    "inner join CONTACTO ON CONTACTO_DETALLE.id_contacto = CONTACTO.id_contacto\n"+
    "WHERE CONTACTO.tipo_contacto = 'Beso' and VICTIMA.estado = 'Sospecha'\n" +
    "group by VICTIMA.nombre, VICTIMA.apellido,VICTIMA.estado,CONTACTO.tipo_contacto \n"
    "HAVING COUNT(VICTIMA.id_victima) > 2;\n"

    connection.query(sql,async function(error, result){
        if(error){  
            console.log("Error al conectar");
            console.log(error);
        
        }else{
            console.log(JSON.stringify(result))
            res.json(result);
           
        }
    }
    );
}

sessionController.c5 = async function (req, res) {
    var sql = "select * from(\n"+
    "SELECT VICTIMA.nombre,VICTIMA.apellido,TRATAMIENTO.tratamiento,COUNT(VICTIMA.id_victima) as Cantidad \n" +
    "from VICTIMA \n"+
    "inner join VICTIMA_TRATAMIENTO ON VICTIMA.id_victima = VICTIMA_TRATAMIENTO.id_victima \n"+
    "inner join TRATAMIENTO ON VICTIMA_TRATAMIENTO.id_tratamiento = TRATAMIENTO.id_tratamiento  \n"+
    "WHERE TRATAMIENTO.tratamiento = 'Oxigeno' \n" +
    "group by VICTIMA.nombre,VICTIMA.apellido,TRATAMIENTO.tratamiento \n"+
    "order by COUNT(VICTIMA.id_victima) DESC) AS C \n"+
    "LIMIT 5 ;" 

    connection.query(sql,async function(error, result){
        if(error){  
            console.log("Error al conectar");
            console.log(error);
        
        }else{
            console.log(JSON.stringify(result))
            res.json(result);
           
        }
    }
    );
}

sessionController.c6 = async function (req, res) {
    var sql = "select VICTIMA.nombre,VICTIMA.apellido, VICTIMA.fecha_muerte,UBICACION.direccion,TRATAMIENTO.tratamiento \n" +
    "from VICTIMA \n"+
    "inner join UBICACION_VICTIMA ON VICTIMA.id_victima = UBICACION_VICTIMA.id_victima \n"+
    "inner JOIN UBICACION ON UBICACION_VICTIMA.id_ubicacion = UBICACION.id_ubicacion \n"+
    "inner join VICTIMA_TRATAMIENTO ON VICTIMA.id_victima = VICTIMA_TRATAMIENTO.id_victima \n"+
    "inner join TRATAMIENTO ON VICTIMA_TRATAMIENTO.id_tratamiento = TRATAMIENTO.id_tratamiento \n"+
    "WHERE UBICACION.direccion = '1987 Delphine Well' AND TRATAMIENTO.tratamiento = 'Manejo de la presion arterial'; \n" 

    connection.query(sql,async function(error, result){
        if(error){  
            console.log("Error al conectar");
            console.log(error);
        
        }else{
            console.log(JSON.stringify(result))
            res.json(result);
           
        }
    }
    );
}
sessionController.c7 = async function (req, res) {
    var sql = "select A.nombre,A.apellido,A.direccion, NO_TRATAMIENTOS from( \n" +
    "select VICTIMA.id_victima,VICTIMA.nombre,VICTIMA.apellido,VICTIMA.direccion,COUNT(ASOCIADO_VICTIMA.id_victima) AS ALLEGADO \n" +
    "from VICTIMA \n"+
    "INNER JOIN ASOCIADO_VICTIMA ON VICTIMA.id_victima = ASOCIADO_VICTIMA.id_victima \n"+
    "group by VICTIMA.id_victima,VICTIMA.nombre,VICTIMA.apellido,VICTIMA.direccion \n" +
    "HAVING COUNT(ASOCIADO_VICTIMA.id_victima) < 2 \n" +
    ") A inner JOIN \n" + 
    "(select VICTIMA.id_victima,VICTIMA.nombre,VICTIMA.apellido,VICTIMA.direccion,COUNT(VICTIMA_TRATAMIENTO.id_victima) AS NO_TRATAMIENTOS \n" +
    "FROM VICTIMA \n" +
    "inner JOIN VICTIMA_TRATAMIENTO ON VICTIMA_TRATAMIENTO.id_victima = VICTIMA.id_victima \n" +
    "group by VICTIMA.id_victima,VICTIMA.nombre,VICTIMA.apellido,VICTIMA.direccion \n" +
    "HAVING COUNT(VICTIMA_TRATAMIENTO.id_victima) = 2) \n" +
    "TRATAMIENTOS ON TRATAMIENTOS.id_victima = A.id_victima; \n"


    connection.query(sql,async function(error, result){
        if(error){  
            console.log("Error al conectar");
            console.log(error);
        
        }else{
            console.log(JSON.stringify(result))
            res.json(result);
           
        }
    }
    );
}
sessionController.c8 = async function (req, res) {
    var sql = "select date_format(fecha_primeraSospecha,'%m') AS MES, nombre,apellido, trat as NO_TRATAMIENTO FROM ( \n" +
    "select VICTIMA.nombre,VICTIMA.apellido,VICTIMA.fecha_primeraSospecha,count(VICTIMA_TRATAMIENTO.id_victima) AS trat \n"+
    "from VICTIMA_TRATAMIENTO \n"+
    "INNER JOIN VICTIMA ON VICTIMA.id_victima = VICTIMA_TRATAMIENTO.id_victima \n" +
    "group by VICTIMA.nombre,VICTIMA.apellido,VICTIMA.fecha_primeraSospecha \n" +
    "order by count(VICTIMA_TRATAMIENTO.id_victima) desc \n" +
    "limit 5 \n" +
    ")as t1 union \n" +
    "(  \n" +
    "select date_format(VICTIMA.fecha_primeraSospecha,'%m'),VICTIMA.nombre,VICTIMA.apellido,count(VICTIMA_TRATAMIENTO.id_victima) AS trat2 \n" +
    " from VICTIMA_TRATAMIENTO \n" +
    " INNER JOIN VICTIMA ON VICTIMA.id_victima = VICTIMA_TRATAMIENTO.id_victima \n" +
    "group by VICTIMA.nombre,VICTIMA.apellido,VICTIMA.fecha_primeraSospecha \n" + 
    "order by count(VICTIMA_TRATAMIENTO.id_victima) asc \n" +
    "limit 5 \n" +
    "); \n" 


    connection.query(sql,async function(error, result){
        if(error){  
            console.log("Error al conectar");
            console.log(error);
        
        }else{
            console.log(JSON.stringify(result))
            res.json(result);
           
        }
    }
    );
}

sessionController.c9 = async function (req, res) {
    var sql = "select HOSPITAL.nombre,HOSPITAL.direccion,truncate(count(HOSPITAL.id_hospital) / (SELECT COUNT(*) FROM VICTIMA WHERE VICTIMA.id_hospital)*100,2) * 100 as Porcentaje \n" +
    "from HOSPITAL\n"+
    "INNER JOIN VICTIMA ON VICTIMA.id_hospital = HOSPITAL.id_hospital \n"+
    "where  HOSPITAL.nombre != '' \n" +
    "group by HOSPITAL.id_hospital,HOSPITAL.nombre,HOSPITAL.direccion \n"
    "order by porcentaje asc; \n"

    connection.query(sql,async function(error, result){
        if(error){  
            console.log("Error al conectar");
            console.log(error);
        
        }else{
            console.log(JSON.stringify(result))
            res.json(result);
           
        }
    }
    );
}

sessionController.c10 = async function (req, res) {
    var sql = " select ANI.nombre AS Nombre, ANI.tipo_contacto as Contacto, truncate(cont/T*100,2) as Victimas\
    from(\
        select nombre, Max(cont) as maxi from(\
            select HOSPITAL.nombre,CONTACTO.tipo_contacto,COUNT(CONTACTO.id_contacto) AS cont\
            FROM HOSPITAL\
            inner JOIN VICTIMA ON VICTIMA.id_hospital = HOSPITAL.id_hospital\
            INNER JOIN ASOCIADO_VICTIMA ON VICTIMA.id_victima = ASOCIADO_VICTIMA.id_victima\
            INNER JOIN CONTACTO_DETALLE ON ASOCIADO_VICTIMA.id_asociado_victima = CONTACTO_DETALLE.id_asociado_victima\
            INNER JOIN CONTACTO ON CONTACTO_DETALLE.id_contacto = CONTACTO.id_contacto\
            GROUP BY HOSPITAL.nombre,CONTACTO.tipo_contacto\
        )c2 GROUP BY nombre\
    )maximos inner join \
    (\
        select HOSPITAL.nombre,COUNT(CONTACTO_DETALLE.id_contacto) AS T\
        FROM HOSPITAL\
        inner JOIN VICTIMA ON VICTIMA.id_hospital = HOSPITAL.id_hospital\
        INNER JOIN ASOCIADO_VICTIMA ON VICTIMA.id_victima = ASOCIADO_VICTIMA.id_victima\
        INNER JOIN CONTACTO_DETALLE ON ASOCIADO_VICTIMA.id_asociado_victima = CONTACTO_DETALLE.id_asociado_victima\
        GROUP BY HOSPITAL.nombre\
    )TOTALES ON TOTALES.nombre = maximos.nombre inner join \
    (\
        select HOSPITAL.nombre,CONTACTO.tipo_contacto,COUNT(CONTACTO.id_contacto) AS cont\
        FROM HOSPITAL\
        inner JOIN VICTIMA ON VICTIMA.id_hospital = HOSPITAL.id_hospital\
        INNER JOIN ASOCIADO_VICTIMA ON VICTIMA.id_victima = ASOCIADO_VICTIMA.id_victima\
        INNER JOIN CONTACTO_DETALLE ON ASOCIADO_VICTIMA.id_asociado_victima = CONTACTO_DETALLE.id_asociado_victima\
        INNER JOIN CONTACTO ON CONTACTO_DETALLE.id_contacto = CONTACTO.id_contacto\
        GROUP BY HOSPITAL.nombre,CONTACTO.tipo_contacto\
    ) ANI ON ANI.cont = maximos.maxi and ANI.nombre = maximos.nombre\
    where ANI.tipo_contacto != '' and ANI.nombre != '' \
    order by ANI.nombre; ";

    connection.query(sql,async function(error, result){
        if(error){  
            console.log("Error al conectar");
            console.log(error);
        
        }else{
            console.log(JSON.stringify(result))
            res.json(result);
           
        }
    }
    );
}


/*----------------------------------REQUEST DE LOS MODELOS-----------------*/
sessionController.elT = async function (req, res) {
    var sql = "DROP TABLE TEMPORAL;"
    connection.query(sql,async function(error, result){
        if(error){  
            console.log("Error al conectar");
        
        }else{
           
            
            res.send("Tabla Temporal Eliminada");
           
        }
    });
}

sessionController.elM = async function (req, res) {
    var sql = " DROP TABLE CONTACTO_DETALLE; "

    connection.query(sql,async function(error, result){
        if(error){  
            console.log("Error al conectar");
            console.log(error);
        
        }else{
           
            
            res.send("Tablas Eliminadas"); 
        }
    });

    var sql1 = " DROP TABLE ASOCIADO_VICTIMA;"
    connection.query(sql1,async function(error, result){
        if(error){  
            console.log("Error al conectar");
            console.log(error);
        
        }
    });
    var sql2 = " DROP TABLE UBICACION_VICTIMA;"
    connection.query(sql2,async function(error, result){
        if(error){  
            console.log("Error al conectar");
            console.log(error);
        
        }
    });
    var sql3 = " DROP TABLE VICTIMA_TRATAMIENTO; "
    connection.query(sql3,async function(error, result){
        if(error){  
            console.log("Error al conectar");
            console.log(error);
        
        }
    });
    var sql4 = " DROP TABLE VICTIMA; "
    connection.query(sql4,async function(error, result){
        if(error){  
            console.log("Error al conectar");
            console.log(error);
        
        }
    });
    var sql5 = " DROP TABLE HOSPITAL;"
    connection.query(sql5,async function(error, result){
        if(error){  
            console.log("Error al conectar");
            console.log(error);
        
        }
    });
    var sql6 = " DROP TABLE TRATAMIENTO; "
    connection.query(sql6,async function(error, result){
        if(error){  
            console.log("Error al conectar");
            console.log(error);
        
        }
    });
    var sql7 = " DROP TABLE CONTACTO;"
    connection.query(sql7,async function(error, result){
        if(error){  
            console.log("Error al conectar");
            console.log(error);
        
        }
    });
    var sql8 = " DROP TABLE ASOCIADO;"
    connection.query(sql8,async function(error, result){
        if(error){  
            console.log("Error al conectar");
            console.log(error);
        
        }
    });

    var sql9 = " DROP TABLE UBICACION;"
    connection.query(sql9,async function(error, result){
        if(error){  
            console.log("Error al conectar");
        
        }
    });
}

sessionController.carT = async function (req, res) {
    var sql = "CREATE TABLE TEMPORAL(\
        Nombre_Victima              VARCHAR(150),\
        Apellido_Victima            VARCHAR(150),\
        Direccion_Victima           VARCHAR(150),\
        Fecha_Primera_Sospecha      datetime,\
        Fecha_Confirmacion          datetime,\
        Fecha_Muerte                datetime,\
        Estado_Victima              VARCHAR(150),\
        Nombre_Asociado             VARCHAR(150),\
        Apellido_Asociado           VARCHAR(150),\
        Fecha_Conocio               datetime,\
        Contacto_Fisico             VARCHAR(150),\
        Fecha_Inicio_Contacto       datetime,\
        Fecha_Fin_Contacto          datetime,\
        Nombre_Hospital             VARCHAR(150),\
        Direccion_Hospital          VARCHAR(150),\
        Ubicacion_Victima           VARCHAR(150),\
        Fecha_Llegada               datetime,\
        Fecha_Retiro                datetime,\
        Tratamiento                 VARCHAR(150),\
        Efectividad                 integer,\
        Fecha_Inicio_Tratamiento    datetime,\
        Fecha_Fin_Tratamiento       datetime,\
        Efectividad_En_Victima      integer );"
    
        var consulta =connection.query(sql, function (err, result) {
            if (err) throw err;
            //else res.send("Carga de Datos a la Tabla Temporal exitosa")
            console.log("Tabla Temporal creada");
          });

    var sql2 = "LOAD DATA LOCAL INFILE '//home//eduardo//Escritorio//Practica1_201612124//Entrada//GRAND_VIRUS_EPICENTER.csv'\
    INTO TABLE TEMPORAL\
    CHARACTER SET UTF8 \n" +
    "FIELDS TERMINATED BY ';' \n " +
    "ignore 1 lines;"

    var consulta =connection.query(sql2, function (err, result) {
        if (err) throw err;
        else res.send("Carga de Datos a la Tabla Temporal exitosa");
        console.log("Tabla Temporal creada");
      });

    
}

sessionController.carM = async function (req, res) {
    var caca = "SET SQL_MODE='ALLOW_INVALID_DATES';"
    var consulta =connection.query(caca, function (err, result) {
        if (err) throw err;
      });
    var sql = "CREATE TABLE HOSPITAL(\
        id_hospital int not null AUTO_INCREMENT,\
        nombre varchar(200) NOT NULL,\
        direccion varchar(200) NOT NULL,\
        primary key (id_hospital)\
        );"

    var consulta =connection.query(sql, function (err, result) {
        if (err) throw err;
      });

      var sql2 = "INSERT INTO HOSPITAL(nombre,direccion)\
                SELECT DISTINCT TEMPORAL.Nombre_Hospital, TEMPORAL.Direccion_Hospital\
                from TEMPORAL\
                WHERE TEMPORAL.Nombre_Hospital is not null AND TEMPORAL.Direccion_Hospital is not null;"

    var consulta =connection.query(sql2, function (err, result) {
        if (err) throw err;
      });

      var sql3 = "CREATE TABLE TRATAMIENTO(\
        id_tratamiento int not null AUTO_INCREMENT,\
        efectividad int,\
        tratamiento varchar(200) NOT NULL,\
        primary key (id_tratamiento)\
        );"

    var consulta =connection.query(sql3, function (err, result) {
        if (err) throw err;
      });

    var sql4 = "INSERT INTO TRATAMIENTO (efectividad,tratamiento)\
    SELECT DISTINCT TEMPORAL.Efectividad, TEMPORAL.Tratamiento\
    from TEMPORAL\
    WHERE TEMPORAL.Efectividad is not null and TEMPORAL.Tratamiento is not null;"

    var consulta =connection.query(sql4, function (err, result) {
        if (err) throw err;
      });

      var sql5 = "CREATE TABLE VICTIMA(\
        id_victima int not null auto_increment,\
        nombre varchar(200) not null,\
        apellido varchar(200) not null,\
        direccion varchar(200) not null,\
        fecha_registro datetime,\
        fecha_muerte datetime,\
        fecha_primeraSospecha datetime,\
        id_hospital int not null,\
        estado varchar(50),\
        primary key(id_victima),\
        foreign key (id_hospital) references HOSPITAL (id_hospital)\
        );"

    var consulta =connection.query(sql5, function (err, result) {
        if (err) throw err;
      });

      var sql6 = "INSERT INTO VICTIMA (nombre,apellido,direccion,fecha_registro,fecha_muerte,fecha_primeraSospecha,id_hospital,estado)\
      SELECT DISTINCT Nombre_Victima,Apellido_Victima,Direccion_Victima,Fecha_Confirmacion,\
      Fecha_Muerte,Fecha_Primera_Sospecha,id_hospital,Estado_Victima\
      from TEMPORAL\
      inner join HOSPITAL on  HOSPITAL.nombre = Nombre_hospital AND HOSPITAL.direccion = TEMPORAL.Direccion_Hospital;"
  
      var consulta =connection.query(sql6, function (err, result) {
          if (err) throw err;
        });

        var sql7 = "CREATE TABLE ASOCIADO(\
            id_asociado int not null auto_increment,\
            nombre varchar(200) not null,\
            apellido varchar(200) not null,\
            primary key(id_asociado)\
            );"
    
        var consulta =connection.query(sql7, function (err, result) {
            if (err) throw err;
          });

          var sql8 = "INSERT INTO ASOCIADO (nombre,apellido)\
          SELECT DISTINCT TEMPORAL.Nombre_Asociado, TEMPORAL.Apellido_Asociado\
          from TEMPORAL\
          WHERE TEMPORAL.Nombre_Asociado is not null and TEMPORAL.Apellido_Asociado is not null;"
      
          var consulta =connection.query(sql8, function (err, result) {
              if (err) throw err;
            });

            var sql9 = "CREATE TABLE UBICACION(\
                id_ubicacion int not null auto_increment,\
                direccion varchar(200),\
                primary key(id_ubicacion)\
                );"
        
            var consulta =connection.query(sql9, function (err, result) {
                if (err) throw err;
              });

              var sql10 = "INSERT INTO UBICACION (direccion)\
              SELECT DISTINCT TEMPORAL.Ubicacion_Victima\
              from TEMPORAL\
              WHERE TEMPORAL.Ubicacion_Victima is not null;"
          
              var consulta =connection.query(sql10, function (err, result) {
                  if (err) throw err;
                });

            var sql11 = "CREATE TABLE CONTACTO(\
                id_contacto int not null auto_increment,\
                tipo_contacto varchar(200) NOT NULL,\
                primary key(id_contacto)\
                );"
        
            var consulta =connection.query(sql11, function (err, result) {
                if (err) throw err;
              });


              var sql12 = "INSERT INTO CONTACTO (tipo_contacto)\
              SELECT DISTINCT TEMPORAL.Contacto_Fisico\
              from TEMPORAL\
              WHERE TEMPORAL.Contacto_Fisico is not null;"
          
              var consulta =connection.query(sql12, function (err, result) {
                  if (err) throw err;
                });

                var sql13 = "CREATE TABLE VICTIMA_TRATAMIENTO(\
                    id_victima_tratamiento int not null auto_increment,\
                    inicio_tratamiento datetime,\
                    fin_tratamiento datetime,\
                    id_victima int not null,\
                    id_tratamiento int not null,\
                    efectividad_victima int not null,\
                    primary key (id_victima_tratamiento),\
                    foreign key (id_victima) references VICTIMA (id_victima),\
                    foreign key (id_tratamiento) references TRATAMIENTO (id_tratamiento)\
                    );"
            
                var consulta =connection.query(sql13, function (err, result) {
                    if (err) throw err;
                  });

                  var sql14 = "INSERT INTO VICTIMA_TRATAMIENTO (inicio_tratamiento,fin_tratamiento,efectividad_victima,id_victima,id_tratamiento)\
                  SELECT distinct Fecha_Inicio_Tratamiento,Fecha_Fin_Tratamiento,Efectividad_En_Victima,VICTIMA.id_victima,TRATAMIENTO.id_tratamiento\
                  from TEMPORAL\
                  inner join VICTIMA on  VICTIMA.nombre = TEMPORAL.Nombre_Victima AND VICTIMA.apellido = TEMPORAL.Apellido_Victima\
                  inner join TRATAMIENTO on TRATAMIENTO.tratamiento = TEMPORAL.Tratamiento;"
              
                  var consulta =connection.query(sql14, function (err, result) {
                      if (err) throw err;
                    });


                    var sql15 = "CREATE TABLE UBICACION_VICTIMA(\
                        id_ubicacion_victima int not null auto_increment,\
                        fecha_llegada datetime,\
                        fecha_salida datetime,\
                        id_ubicacion int not null,\
                        id_victima int not null,\
                        primary key (id_ubicacion_victima),\
                        foreign key (id_victima) references VICTIMA (id_victima),\
                        foreign key (id_ubicacion) references UBICACION (id_ubicacion)\
                        );"
                
                    var consulta =connection.query(sql15, function (err, result) {
                        if (err) throw err;
                      });
                    
                      var sql16 = "INSERT INTO UBICACION_VICTIMA (fecha_llegada,fecha_salida,id_ubicacion,id_victima)\
                      select distinct Fecha_Llegada,Fecha_Retiro,id_ubicacion,id_victima\
                      from TEMPORAL\
                      inner join UBICACION ON UBICACION.direccion = TEMPORAL.Ubicacion_Victima\
                      inner join VICTIMA on  VICTIMA.nombre = Nombre_Victima AND VICTIMA.apellido = Apellido_Victima;"
                  
                      var consulta =connection.query(sql16, function (err, result) {
                          if (err) throw err;
                        });

                        var sql17 = "CREATE TABLE ASOCIADO_VICTIMA(\
                            id_asociado_victima int not null auto_increment,\
                            fecha_contagio datetime,\
                            id_victima int not null,\
                            id_asociado int not null,\
                            primary key (id_asociado_victima),\
                            foreign key (id_victima) references VICTIMA (id_victima),\
                            foreign key (id_asociado) references ASOCIADO (id_asociado)\
                            );"
                    
                        var consulta =connection.query(sql17, function (err, result) {
                            if (err) throw err;
                          });
                        
                          var sql18 = "INSERT INTO ASOCIADO_VICTIMA (fecha_contagio,id_victima,id_asociado)\
                          select distinct Fecha_conocio,id_victima,id_asociado\
                          from TEMPORAL\
                          inner join VICTIMA on  VICTIMA.nombre = TEMPORAL.Nombre_Victima AND VICTIMA.apellido = TEMPORAL.Apellido_Victima\
                          inner join ASOCIADO on  ASOCIADO.nombre = TEMPORAL.Nombre_Asociado AND ASOCIADO.apellido = TEMPORAL.Apellido_Asociado;"
                      
                          var consulta =connection.query(sql18, function (err, result) {
                              if (err) throw err;
                            });


                            var sql19 = "CREATE TABLE CONTACTO_DETALLE(\
                                id_contacto_detalle int not null auto_increment,\
                                inicio_contacto datetime,\
                                fin_contacto datetime,\
                                id_contacto int not null,\
                                id_asociado_victima int not null,\
                                primary key (id_contacto_detalle),\
                                foreign key (id_contacto) references CONTACTO (id_contacto),\
                                foreign key (id_asociado_victima) references ASOCIADO_VICTIMA (id_asociado_victima)\
                                );"
                        
                            var consulta =connection.query(sql19, function (err, result) {
                                if (err) throw err;
                              });
                            
                              var sql20 = "INSERT INTO CONTACTO_DETALLE (inicio_contacto,fin_contacto,id_contacto,id_asociado_victima)\
                              select distinct Fecha_Inicio_Contacto,Fecha_Fin_Contacto,id_contacto,id_asociado_victima\
                              from TEMPORAL\
                              inner join CONTACTO ON CONTACTO.tipo_contacto = TEMPORAL.Contacto_Fisico\
                              inner JOIN ASOCIADO_VICTIMA ON ASOCIADO_VICTIMA.fecha_contagio = TEMPORAL.Fecha_Conocio"
                          
                              var consulta =connection.query(sql20, function (err, result) {
                                  if (err) throw err;
                                  console.log("Tablas creadas con exito");
                                  res.send("Tablas creadas con exito");
                                });


}

module.exports = sessionController