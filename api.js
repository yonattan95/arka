const express = require('express');

const {Pool} = require('pg');

//variables globales
const pool_pg = new Pool({
    user:'postgres',
    password: 'root',
    database: 'bd_arka',
    port: 5432,
    host: '192.168.0.29'
});
const router = express.Router();

//middleware
router.use(express.json());

//router general

//vehiculo
router.route('/vehiculos/')
.get((req,res)=>{
    pool_pg.query('SELECT * FROM VEHICULOS',(err,rs)=>{
        res.json(rs.rows);
    });
})
.post((req,res)=>{
    const brand_id = req.body.id_marca;
    const category_id = req.body.id_categoria;
    const user_id = req.body.id_usuario;
    const license_plate = req.body.numero_placa;
    const sql_query = `SELECT add_vehicle(${brand_id},${category_id},${user_id},'${license_plate}')`;
    pool_pg.query(sql_query,(err,rs)=>{
        if(err){
            res.sendStatus(500);
        }else{
            res.status(200).send(res.rowCount.toString());
        }
    });
});
//reserva
router.route('/reservas/')
.get((req,res)=>{
    const sql_query = `SELECT * FROM RESERVAS`;
    pool_pg.query(sql_query,(err,rs)=>{
        if(err){
            res.sendStatus(500);
        }else{
            res.status(200).send(rs.rows.toString());
        }
    });
})
.post((req,res)=>{
    const reservation_state_id = req.body.id_estado_reservacion;
    const user_id = req.body.id_usuario;
    const vehicle_id = req.body.id_vehiculo;
    const place_id = req.body.id_espacio;
    const reservation_date = req.body.fecha_reservacion;
    const finished_date = req.body.fecha_terminado;
    const rent_hours = req.body.horas_alquiladas;
    const sql_query = `SELECT add_reservation(${reservation_state_id},${user_id},${vehicle_id},${place_id},${reservation_date},${finished_date},${rent_hours})`;
    pool_pg.query(sql_query,(err,rs)=>{
        if(err){
            res.sendStatus(500);
        }else{
            res.status(200).send(rs.rowCount.toString());
        }
    });
});
//usuario
router.route('/usuarios/')
.get((req,res)=>{
    const sql_query = `SELECT * FROM USUARIOS`;
    pool_pg.query(sql_query,(err,rs)=>{
        if(err){
            res.sendStatus(500);
        }else{
            res.status(200).send(rs.rows);
        }
    });
})
.post((req,res)=>{
    const profile_id = req.body.id_perfil;
    const name = req.body.nombre;
    const last_name_1 = req.body.apellido_paterno;
    const last_name_2 = req.body.apellido_materno;
    const dni = req.body.dni;
    const cellphone = req.body.celular;
    const email = req.body.correo;
    const user_name = req.body.usuario;
    const password = req.body.contraseña;
    const address = req.body.direccion;
    const sql_query = `SELECT add_user(${profile_id},'${name}','${last_name_1}','${last_name_2}','${dni}','${cellphone}','${email}','${user_name}','${password}','${address}')`;
    pool_pg.query(sql_query,(err,rs)=>{
        if(err){
            res.sendStatus(500);
        }else{
            res.status(200).send(rs.rowCount.toString());
        }
    });
});
//cochera
router.route('/cocheras/')
.get((req,res)=>{
    const sql_query = `SELECT * FROM COCHERAS`;
    pool_pg.query(sql_query,(err,rs)=>{
        if(err){
            res.sendStatus(500);
        }else{
            res.status(200).send(rs.rows);
        }
    });
})
.post((req,res)=>{
    const user_id = req.body.id_usuario;
    const location = req.body.ubicacion;
    const latitud = req.body.latitud;
    const longitud = req.body.longitud;
    const rate = req.body.tarifa;
    const name = req.body.nombre;
    const quantity_place = req.body.cantidad_espacios;
    const url_image = req.body.url_foto;
    const sql_query = `SELECT add_garage(${user_id},'${location}','${latitud}','${longitud}',${rate},'${name}',${quantity_place},'${url_image}')`;
    pool_pg.query(sql_query,(err,rs)=>{
        if(err){
            res.sendStatus(500);
        }else{
            res.status(200).send(rs.rowCount.toString());
        }
    });
});
//categoria
router.route('/categorias/')
.get((req,res)=>{
    pool_pg.query('SELECT * FROM CATEGORIAS', (err,rs)=>{
        res.json(rs.rows);
    });
})
.post((req,res)=>{  
    const nombreCategoria = req.body.nombre;
    const sql_query = `SELECT add_category('${nombreCategoria}')`;
    pool_pg.query(sql_query,(err,rs)=>{
        if (err){
            res.status(503).send(`Error al intentar agregar una categoria.\nDetalle: ${err.where}.\nReferencia: ${err.hint}`);
        }else{
            res.status(200).send(rs.rowCount.toString());
        }
    });
});

router.route('/categoria/:id')
.get((req,res)=>{
    pool_pg.query(`SELECT * FROM CATEGORIAS WHERE id=${req.params.id}`, (err,rs)=>{
        res.json(rs.rows);
    });
});
//marca
router.route('/marcas/')
.get((req,res)=>{
    const sql_query = `SELECT * FROM MARCAS`;
    pool_pg.query(sql_query,(err,rs)=>{
        if(err){
            res.sendStatus(500);
        }else{
            res.status(200).send(rs.rows);
        }
    });
})
.post((req,res)=>{
    const name = req.body.nombre;
    const sql_query = `SELECT add_brand('${name}')`;
    pool_pg.query(sql_query,(err,rs)=>{
        if(err){
            res.sendStatus(500);
        }else{
            res.status(200).send(rs.rowCount.toString());
        }
    });
});


//exportando router
module.exports = router;