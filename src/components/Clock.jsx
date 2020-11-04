import React, { Component, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button , Card} from 'react-bootstrap';

function Compteur()
 {
    const [count, setCount] = useState(0); 
    const handleClick = function (e)
    {
        e.preventDefault();
        setCount(10);
    }
 return <Button onClick={handleClick}>Nombre : {count}</Button>

 }

function Field ({name, value, onChange, children}) 
{

        return <div className="form-group">
                    <label htmlFor={name}>{children}</label>
                    <input type="text" value={value} name={name} onChange={onChange} id={name} className="form-control"/>
                </div>
}

function Checkbox ({name, value, onChange, children}) 
{
        return <div className="form-check">
            <input type="checkbox" checked={value} name={name} onChange={onChange} id={name} className="form-check-input"/>
            <label htmlFor={name} className="form-check-label">{children}</label>
        </div>
}

export  class Clock extends Component
{
    constructor(props)
    {
        super(props)
        this.state = 
        {
            nom:'',
            prenom :'',
            newsletter : false
 
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }


    handleChange (e)
    {
        const name = e.target.name
        const type = e.target.type
        const value = type === 'checkbox'? e.target.checked : e.target.value
        this.setState({
            [name]: value
        })

    }

    handleSubmit (e)
    {
        e.preventDefault()
        const data = JSON.stringify(this.state)
        this.setState({
            nom:'',
            prenom :'',
            newsletter : false
        })
    
    }


    render()
    {
        return <form className="container mt-4" onSubmit={this.handleSubmit}>
                <Field name="nom" value={this.state.value} onChange={this.handleChange}>Nom</Field>
                <Field name="prenom" value={this.state.value} onChange={this.handleChange}>Pr&eacute;nom</Field>
                <Checkbox name="newsletter" value={this.state.newsletter}  onChange={this.handleChange}>S'abonner &agrave; la newsletter</Checkbox>
                <div className="form-group">
                    <Button type="submit">Envoyer</Button>
                </div>
                {JSON.stringify(this.state)}
                <Compteur/>
            </form> 
    }
}