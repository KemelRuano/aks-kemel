import React, { useState } from 'react';
import './App.css';
import { Button,Input } from './Diseño/Login.js';



function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUser = (event) => {
    setUsername(event.target.value);
  };

  const handlePass = (event) => {
    setPassword(event.target.value);
  };
  const EnvDate =  () => {
    const jsonData = {
    "Nombre": username,
      "Password": password
    };

    fetch('http://localhost:8000/Login', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jsonData),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data[0].credcorrectas);
      if(data[0].credcorrectas === 1){
        alert("Bienvenido");
      }else{
        alert("Usuario o contraseña incorrectos");
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
   
  }
  return (
    <div className="App">
      <header className="App-header">
        <Input user = {username} plu={handleUser} pass={password} plp = {handlePass}/>
        <Button onClick={EnvDate} label="Login"/>
      </header>
    </div>
    
  );
}

export default App;
