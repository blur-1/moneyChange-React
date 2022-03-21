import React from 'react';

const CurrencyRow = ({options, selectedDefaultOption, onChangeOption, amount,onChangeAmount}) => {
    return ( 
    <>
        <div>
            <input type='number' className='input' value={amount} onChange={onChangeAmount}/>

            <select value={selectedDefaultOption} onChange={onChangeOption}> 
                {options.map(itemOption =>(
                    <option key={itemOption+Math.random()} value={itemOption}>{itemOption}</option>
                    ))}
            </select>
        </div>
    </> 
    );
}
export default CurrencyRow ;