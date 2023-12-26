import "../Diseño/Css.css"
export function Button({ onClick, label}) {

    return (
        <button onClick={onClick}>{label}</button>
    );
};

export function Input({user , plu , pass , plp}) {
    
        return (
                // <label htmlFor="username">Usuario:</label>
                <div className = "form">
                    <label htmlFor="username"> Usuario: </label>
                    <input
                        type="text"
                        id="username"
                        value={user}
                        onChange={plu}
                        placeholder="Ingresa tu usuario"
                    />
                    <label htmlFor="username"> Contraseña: </label>
                    <input
                        type="text"
                        id="username"
                        value={pass}
                        onChange={plp}
                        placeholder="Ingresa tu usuario"
                    />
                </div>
                
            );
    }
