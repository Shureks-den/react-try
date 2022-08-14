import React from 'react';
import './Input.css'

export default function Input(props) {
    return (
        <div className="form__group">
            <input className="form__input" id={props.label} type={props.isPassword ? 'password' : 'text'} placeholder={props.label} value={props.value} onChange={props.onChangeEvent}/>
            <label htmlFor="name" className="form__label">{props.label}</label>
        </div>
    )
}
