import React from 'react'
import '../css/InputOption.css';

const InputOption = ({ Icon, title, color, handleClick }) => {
    return (
        <div className="inputOption" onClick={handleClick}>
            <Icon style={{ color: color }} />
            <h4>{title}</h4>
        </div>
    )
}

export default InputOption
