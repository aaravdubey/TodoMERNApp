import React, { useState } from "react";
import axios from "axios";
const API_BASE = "http://localhost:3000/todo";

type CheckboxData = {
    id: string;
    key: string;
    value: string;
    isChecked: boolean;
    updateTodoFunc: Function;
    deleteTodoFunc: Function;
}

const CheckboxView = (props: CheckboxData) => {

    return (
        <div className="checkbox" style={{ backgroundColor: props.isChecked ? '#717b8a' : '#0d295f' }}>

            <input type={'checkbox'} id={props.id} value={props.value} checked={props.isChecked} onChange={() => {props.updateTodoFunc(props.id)}} />

            <label htmlFor={props.id} style={{textDecorationLine: props.isChecked? 'line-through' : 'none'}}> {props.value} </label>
            
            <button className="cross" onClick={() => {props.deleteTodoFunc(props.id)}} >⨯</button>
        </div>
    )
}

export default CheckboxView;