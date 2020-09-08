import React,{createContext, useState, useEffect} from 'react';
import axios from 'axios';

//Crear el Context
export const ModalContext = createContext();

const ModalProvider = (props) => {

    //state del provider
    const [idreceta, guardarIdReceta] = useState(null);//no va a ver ninguna seleccionada por eso null
    const [informacion, guardarReceta] = useState({});
    
    //ejecutar llamado a la api una vez que tengamos una receta
    useEffect(()=>{
        
        const obtenerReceta = async() => {
            if(!idreceta) return;

            const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idreceta}`;
            const resultado = await axios.get(url);
            guardarReceta(resultado.data.drinks[0]);//se pasa al Receta.js en el onClose para que no haga el efecto de mostrar la imagen anterior
        }

        obtenerReceta();

    },[idreceta]);

    return ( 
        <ModalContext.Provider
            value={{
                informacion,
                guardarIdReceta,
                guardarReceta
            }}
        >
            {props.children}

        </ModalContext.Provider>
     );
}
 
export default ModalProvider;