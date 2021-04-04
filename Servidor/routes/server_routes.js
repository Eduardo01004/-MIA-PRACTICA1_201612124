var express = require('express');
var router = express.Router();
var session = require('../controllers/server_Controller');

router.get("/consulta1",session.c1);
router.get("/consulta2",session.c2);
router.get("/consulta3",session.c3);
router.get("/consulta4",session.c4);
router.get("/consulta5",session.c5);
router.get("/consulta6",session.c6);
router.get("/consulta7",session.c7);
router.get("/consulta8",session.c8);
router.get("/consulta9",session.c9);
router.get("/consulta10",session.c10);

router.delete("/eliminarTemporal",session.elT);
router.delete("/eliminarModelo",session.elM);
router.post("/cargarTemporal",session.carT);
router.post("/cargarModelo",session.carM);
module.exports = router