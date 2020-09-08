import React, {useContext, useState} from 'react';
import {ModalContext} from '../context/ModalContext';

//este Modal se usa como un componente en el html y va después del button
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';


function getModalStyle() {
    //Define la ubicación del Modal
    const top = 50 ;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    paper: {
        position: 'absolute',
        width: 500,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        overflow: 'scroll',
        height: '100%',
        maxHeight: 500,
        display: 'block'
    },
    header: {
        padding: '12px 0',
        borderBottom: '1px solid darkgrey'
    },
    content: {
        padding: "12px 0",
        overflow: 'scroll'
    }
}));

const Receta = ({receta}) => {

    //Configuración del modal de materialui. Esto va como style en el div del Modal
    const [modalStyle] = useState(getModalStyle);//Le pasamos el getModalStyle para obtener los estilos 
    //Cuando se abre o cierra el modal
    const [open, setOpen] = useState(false);//está false para que el modal esté cerrado al inicio

    const classes = useStyles();//Con esto accedemos a las clases del css creadas, en este caso la clase paper

    //abrir modal, se abre cuando se pulsa el button
    const handleOpen = () => {
        setOpen(true);
    }
    //volver a cerrar el modal
    const handleClose = () => {
        setOpen(false);
    }


    //extraer valores del Context
    const{informacion, guardarIdReceta, guardarReceta} = useContext(ModalContext);

    //funcion que extrae los ingredientes al venir cada uno por separados en vez de un array, por lo que no podemos iterar como se debería
    const mostrarIngredientes = informacion => {
        let ingredientes = [];
        //los ingredientes comienzan en 1 y como máximo hay 15 ingredientes y hay que revisar los que estén en null
        for(let i = 1; i < 16; i++){
            //si no es null se ejecuta el código
            if(informacion[`strIngredient${i}`]){
                ingredientes.push(
                    <li>Ingrediente: {informacion[`strIngredient${i}`]}. Cantidad: {informacion[`strMeasure${i}`]}</li>
                )
            }
        }
        return ingredientes;
    }

    return ( 
        <div className="col-md-4 mb-3">
            <div className="card">
                <h2 className="card-header">{receta.strDrink}</h2>

                <img className="card-img-top" src={receta.strDrinkThumb} alt={`Imagen de ${receta.strDrink}`}/>

                <div className="card-body">
                    <button
                        type="button"
                        className="btn btn-primary btn-block"
                        onClick={() => {
                            guardarIdReceta(receta.idDrink);
                            handleOpen();
                        }}
                    >Ver receta</button>

                    <Modal
                        open={open}
                        onClose={()=>{
                            guardarIdReceta(null);//volvemos a null el guardar el id cuando se cierra el modal
                            guardarReceta({});
                            handleClose();
                        }}
                    >
                        <div style={modalStyle} className={classes.paper}>
                            <h2>{informacion.strDrink}</h2>
                            <h3 className="mt-4">Instrucciones</h3>
                            <p>
                                {informacion.strInstructions}
                            </p>
                            <img className="img-fluid my-4" src={informacion.strDrinkThumb} />
                            <h3>Ingredientes y Cantidades</h3>
                            <ul>
                                {mostrarIngredientes(informacion)}
                            </ul>
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
     );
}
 
export default Receta;