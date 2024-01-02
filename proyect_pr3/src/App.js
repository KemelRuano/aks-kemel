import React, { useState } from 'react';
import './App.css';
import { Button,Input,Tabla } from './Diseño/Login.js';



function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [edad, setEdad] = useState('');

  const handleUser = (event) => {
    setUsername(event.target.value);
  };

  const handlePass = (event) => {
    setPassword(event.target.value);
  };
  const handleName = (event) => {
    setName(event.target.value);
  }
  const handleEdad = (event) => {
    setEdad(event.target.value);
  }
  const EnvDate =  () => {
    const jsonData = {
      "Usuario": username,
      "Password": password
    };

    fetch('http://localhost:8000/login', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jsonData),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data[0].credcorrectas);
      if(data[0].Msg === 1){
        alert("Bienvenido");
      }else{
        alert("Usuario o contraseña incorrectos");
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
   
  }
  const [mostrarRes, setMostrarRes] = useState(true);
  const [item, setitem] = useState([]);
 
  const ocRes =  () => {
    setMostrarRes(!mostrarRes);
  };


  const Registrar =  () => {
    const jsonData = {
        "Usuario": username,
        "Password": password,
        "Nombre": name,
        "Edad": edad
    };

    fetch('http://localhost:8000/registro', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
    })
    .then(response => response.json())
    .then(data => {
      alert(data.Msg);  
      setMostrarRes(!mostrarRes); 
      setEdad('');
      setName('');
      setPassword('');
      setUsername('');  
    })
    .catch((error) => {
        console.error('Error:', error);
    });
  };
  const Actualizar =  () => {
    const jsonData = {
      "Usuario": username,
      "Password": password,
      "Nombre": name,
      "Edad": edad
    };

    fetch('http://localhost:8000/modificar', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
    })
    .then(response => response.json())
    .then(data => {
      alert(data.Msg);  
      setMostrarRes(!mostrarRes); 
      setEdad('');
      setName('');
      setPassword('');
      setUsername('');  
    })
    .catch((error) => {
        console.error('Error:', error);
    });
  };

  const Buscar =  () => {
    const jsonData = {
      "Usuario": username
      };
  
      fetch('http://localhost:8000/search', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
      })
      .then(response => response.json())
      .then(data => {
        
        setitem(data);
        setUsername('');  
        
      })
      .catch((error) => {
        console.error('Error:', error);
      });

  };
  const Delete =  () => { 

    const jsonData = {
      "Usuario": username
      };
  
      fetch('http://localhost:8000/eliminar', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
      })
      .then(response => response.json())
      .then(data => {
        alert(data.Msg); 
        setUsername('');  
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
       
        <div>
            {mostrarRes ? (
     
               <div>
               <Input user = {username} plu={handleUser} place="Ingresa tu usuario" name="Usuario:"/>
               <Input user = {password} plu={handlePass} place="Ingresa tu password" name="Contraseña:"/>
               <Button onClick={EnvDate} label="Login"/>
               <Button onClick={ocRes} label="Registro"/>
               <br/>
               <br/>
               <br/>
               <br/>
               <div style={{"background":"green"}}>
               <Input user = {username} plu={handleUser} place="ingrese un usuario" name=" Buscar:"/>
               <Button onClick={Buscar} label="Buscar"/>
               <Button onClick={Delete} label="Eliminar"/>
               <Tabla data={item}/>
               </div>
               </div>
            ) : (
              <div >
               <Input user = {username} plu={handleUser} place="Ingresar Usuario" name="Usuario:"/>
               <Input user = {password} plu={handlePass} place="Ingresar Contraseña" name="Contraseña:"/>
               <Input user = {edad} plu={handleEdad} place="Ingresar Edad" name="Edad:"/>
               <Input user = {name} plu={handleName} place="Ingresar Nombre" name="Nombre:"/>
               <Button onClick={Registrar} label="Registrar"/>
               <Button onClick={Actualizar} label="Actualizar"/>
              </div>
            )}

            
          </div>
      </header>

    </div>
    
  );
}

export default App;
