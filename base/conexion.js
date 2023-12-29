const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
// Configuración de la conexión

const config = {
    host: 'localhost',
    user: 'root',
    password: 'mysql',
    port: 3306
};
const app = express();
app.set('port', process.env.PORT || 8000);
app.use(cors({
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
}));
  app.use(express.json());

app.post('/Login', (req, res) => {
        const jsonData = req.body;
        console.log(jsonData);
        const {Nombre , Password  }= jsonData;
        const sql = 'SELECT COUNT(*) AS credcorrectas FROM KRuano202006373.login WHERE nombre = ? AND password = ?';
        query(sql, [Nombre, Password])
        .then(results => {
            return res.json(results);
        })
        .catch(error => {
            console.log(error);
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