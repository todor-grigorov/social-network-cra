import React from 'react'
import '../css/InputOption.css';

const InputOption = ({ Icon, id, title, color, handleClick }) => {
    return (
        <div className="inputOption" onClick={(e) => { handleClick(e, id) }}>
            <Icon style={{ color: color }} />
            <h4>{title}</h4>
        </div>
    )
}

export default InputOption
