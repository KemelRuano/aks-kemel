import "../Diseño/Css.css"
export function Button({ onClick, label}) {

    return (
        <button onClick={onClick}>{label}</button>
    );
};

export function Input({user , plu , place , name}) {
    
        return (
                // <label htmlFor="username">Usuario:</label>
                <div className = "form">
                    <label htmlFor="username"> {name} </label>
                    <input
                        type="text"
                        id="username"
                        value={user}
                        onChange={plu}
                        placeholder={place}
                    />
                </div>
                
            );
}

// dame una funcion que genere una tabla con los datos de la base de datos

export function Tabla({data}) { 
    return (
        <div className="table-container">
            <table className="table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Edad</th>
                        <th>Usuario</th>
                        <th>Password</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.nombre}</td>
                            <td>{item.edad}</td>
                            <td>{item.usuario}</td>
                            <td>{item.pass}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
       

