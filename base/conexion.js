const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
// Configuración de la conexión

const config = {
    host: 'localhost',
    user: 'root',
    password: 'mysql',
    port: 4000
};
const app = express();
app.set('port', process.env.PORT || 8000);
app.use(cors({
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
}));
  app.use(express.json());

app.post('/login', (req, res) => {
        const jsonData = req.body;
        const {Usuario , Password  }= jsonData;
        const sql = 'SELECT COUNT(*) AS Msg FROM kruano202006373.Usuarios WHERE usuario = ? AND pass = ?';
        query(sql, [Usuario, Password])
        .then(results => {
            return res.json(results);
        })
        .catch(error => {
            console.log(error);
            return res.json(error);
        });
});

app.post('/registro', (req, res) => {
    const jsonData = req.body;
    const { Usuario, Password , Nombre , Edad } = jsonData;
    console.log(jsonData);

    const checkUserQuery = 'SELECT COUNT(*) AS Msg FROM kruano202006373.Usuarios WHERE usuario = ?';

    query(checkUserQuery, [Usuario])
        .then(result => {
            if (result[0].Msg === 0) {
                const insertUserQuery = 'INSERT INTO kruano202006373.Usuarios (usuario, pass , nombre, edad) VALUES (?, ?, ?, ?)';
                return query(insertUserQuery, [Usuario, Password , Nombre , Edad]);
            } else {
                return Promise.reject({ Msg: "Ya existe el Usuario" });
            }
        })
        .then(() => {
            return res.json({ Msg: "Usuario Creado" });
        })
        .catch(error => {
            return res.json(error);
        });
});

app.post('/modificar', (req, res) => {
    const jsonData = req.body;
    const {Usuario, Password , Nombre , Edad} = jsonData;

    const checkUserQuery = 'SELECT COUNT(*) AS Msg FROM kruano202006373.Usuarios WHERE usuario = ?';

    query(checkUserQuery, [Usuario])
        .then(result => {
            if (result[0].Msg > 0) {
                const updateQuery = 'UPDATE kruano202006373.Usuarios SET pass = ?, nombre = ? ,edad = ?  WHERE usuario = ?';
                return query(updateQuery, [Password, Nombre , Edad , Usuario]);
            } else {
                return Promise.reject({ Msg: "El usuario no existe" });
            }
        })
        .then(() => {
            return res.json({ Msg: "Usuario modificado exitosamente" });
        })
        .catch(error => {
            return res.json(error);
        });
});


app.post('/eliminar', (req, res) => {
    const jsonData = req.body;
    const { Usuario } = jsonData;
    const checkUserQuery = 'SELECT COUNT(*) AS Msg FROM kruano202006373.Usuarios WHERE usuario = ?';
    query(checkUserQuery, [Usuario])
        .then(result => {
            if (result[0].Msg > 0) {
                const deleteQuery = 'DELETE FROM kruano202006373.Usuarios WHERE usuario = ?';
                return query(deleteQuery, [Usuario]);
            } else {
                return Promise.reject({ Msg: "El usuario no existe" });
            }
        })
        .then(() => {
            return res.json({ Msg: "Usuario eliminado exitosamente" });
        })
        .catch(error => {
            return res.json(error);
        });
});

app.post('/search', (req, res) => {
    const jsonData = req.body;
    const {Usuario }= jsonData;
    const sql = 'SELECT * FROM  KRuano202006373.Usuarios WHERE usuario = ?;';
    query(sql, [Usuario])
    .then(results => {
        return res.json(results);
    })
    .catch(error => {
        return res.json(error);
    });
});



async function query(sql, params) {
    const connection = await mysql.createConnection(config);
    const [results] = await connection.execute(sql, params);
    connection.end(
        function(err){
            if(err){
                return console.log("Error de conexion:" , err.message);
            }
            console.log("Conexion Cerrada Exitosamente");
        }
    );

    connection.destroy();
    return results;
}


app.listen(app.get('port'));
console.log('Servidor en puerto', app.get('port'));