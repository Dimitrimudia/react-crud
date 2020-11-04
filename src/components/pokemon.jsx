import React, { Component,PureComponent, useState, Fragment } from 'react';
import {render} from 'react-dom';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';



export class Tasks extends Component
{
    constructor(props)
    {
            super(props)
            this.state = 
            {
                Tasks : [],
                url : "http://todos.cd/api/todos"
            };
    }

    getTasks = async ()=>{
        const tasks = await axios.get(this.state.url);
        this.setState({
            Tasks :tasks.data
        });
       
    }

    render()
    {
        return(
            <div>
                <h1>Liste des taches</h1>
                Value : {this.state.Tasks}
            </div>
        )
    }
}
