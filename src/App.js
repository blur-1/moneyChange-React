import React, { useEffect, useState } from 'react';
import { Fragment } from 'react';
import CurrencyRow from './CurrencyRow';
import './App.css';

const api_url = 'http://api.exchangeratesapi.io/v1/latest?access_key=74d21a0185cb423fbdc5be68ecbadf0e'

function App() {

  const[options, setOptions]= useState([])
  const[fromDefaultOption, setFromDefaultOption]= useState()
  const[toDefaultOption,setToDefaultOption]= useState()
  //console.log(options)
  const[amountDefault, setAmountDefault]= useState(1);
  const[exchangeRate, setExchangeRate] =  useState();
  const[amountFromInput, setAmountFromInput]= useState(true);

  let fromAmountVal, toAmountVal
  if(amountFromInput){
    fromAmountVal = amountDefault;
    toAmountVal = parseFloat(amountDefault * exchangeRate).toFixed(2);
  }
  else{
    toAmountVal = amountDefault;
    fromAmountVal =  parseFloat(amountDefault / exchangeRate).toFixed(2);
  }

  useEffect(()=>{
      fetch(api_url).then(res => res.json())
      .then(result => {
            setOptions([result.base, ...Object.keys(result.rates)])
            setFromDefaultOption(result.base)
            const currencyPen = Object.keys(result.rates)[113]
            setToDefaultOption(currencyPen)
             /*const ff = Object.keys(result.rates).indexOf('PEN')
            console.log(ff);*/
            setExchangeRate(result.rates[currencyPen])
            //console.log(result.rates[currencyPen])
      })
  },[])
  
  useEffect(() => {
    if (fromDefaultOption != null && toDefaultOption != null) {
      fetch(api_url).then(res => res.json())
      .then(result => {
            setExchangeRate(result.rates[toDefaultOption])
            //console.log(result.rates[toDefaultOption])
      })
    }   
  }, [fromDefaultOption, toDefaultOption])

  const handleFromAmountChange = (e)=>{
    setAmountDefault(e.target.value)
    setAmountFromInput(true)
  }
  const handleToAmountChange = (e)=>{
    setAmountDefault(e.target.value)
    setAmountFromInput(false)
  }

  return (
    <Fragment>
      <div className='convert'>
          <h1>Tipo de Cambio</h1>
          <div>
            <CurrencyRow
              options={options}
              selectedDefaultOption= {fromDefaultOption}
              onChangeOption= {(e) => setFromDefaultOption(e.target.value)}
              amount={fromAmountVal}
              onChangeAmount={handleFromAmountChange}
            />
          </div>
          <p>Equivale a </p>
          <div>
            <CurrencyRow
              options={options}
              selectedDefaultOption={toDefaultOption}
              onChangeOption= {(e) => setToDefaultOption(e.target.value)}
              amount={toAmountVal}
              onChangeAmount={handleToAmountChange}
            />
          </div>
      </div>
    </Fragment>
  );
}
export default App;
