import React,{useEffect,useState} from 'react';
import styled from '@emotion/styled';
import useMoneda from '../hooks/useMoneda';
import useCriptoMoneda from '../hooks/useCriptomoneda';
import axios from 'axios';
import Error from './Error';

const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius:10px;
    color:#fff;
    transform: background-color .3s ease;

    &:hover{
        background-color: #326ac0;
        cursor: pointer;

    }

`



const Formulario = ({guardarMoneda,guardarCriptoMoneda}) => {
    //utilizar useMoneda

    //state del listado de criptomonedas
    const [listacripto, guardarcriptomonedas]=useState([])
    const [error, guardarError]= useState(false)
    const MONEDAS = [
        {codigo:'USD',nombre:'Dolar de USA'},
        {codigo:'MXN',nombre:'Peso Mexicano'},
        {codigo:'ARS',nombre:'Peso Argentino'},
        {codigo:'EUR',nombre:'Euro'}
    ]


//utilizar useMoneda
    const [moneda, SelectMoneda] = useMoneda('Elige tu moneda','',MONEDAS)

//utilizar useCriptomoneda

    const[criptoMoneda, SelectCripto]= useCriptoMoneda('Elige tu Criptomoneda','',listacripto)

    //ejecutar el llamado a la api

    useEffect(()=>{
        const consultarAPI=async()=>{
            const url= `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD`;

            const resultado = await axios.get(url)
            guardarcriptomonedas(resultado.data.Data)
        
    }
    consultarAPI()
},[])

    const cotizarMoneda =e=>{
        e.preventDefault()
        //validar ambos campos
        if(moneda===''||criptoMoneda===''){guardarError(true);return}
        else{
            guardarError(false)
            guardarMoneda(moneda)
            guardarCriptoMoneda(criptoMoneda)
        }

    }

    return ( 

        <form
            onSubmit={cotizarMoneda}
        >   {error?<Error mensaje="Ambos campos son obligatorios"/>:null}
            <SelectMoneda/>

            <SelectCripto/>
            <Boton
                type='submit'
                value='Calcular'
            /> 
        </form>

    );
}
 
export default Formulario;