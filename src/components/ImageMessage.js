import React from 'react'
import { useState } from 'react';
const ImageMessage = (props) => {
    return (
        <div className={`img-message ${props.side ? 'float-right' : 'float-left'}`}>
            <img
                className="img-thumbnail "
                src={props.image}
            />          
        </div>
    );       
}

export default ImageMessage;