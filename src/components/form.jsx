import React,{Component} from "react";
import Select from 'react-select';
import { TextArea } from 'semantic-ui-react';
export default class MyForm extends Component
{
    constructor(props)
    {
        super(props);
        this.state = 
        {
            form : {id:'', title:'', content:'', status:'', user:'', isEdit : false},
            btnName : "Save",
            btnClass: "ui primary button submit-button"
        }
        
    }
   

    isEmpty(obj)
    {
       return Object.entries(obj).length === 0 && obj.constructor === Object;
    }

    componentDidUpdate(prevProps)
    {
        if(prevProps !== this.props && !this.isEmpty(this.props.form))
        {
            this.setState({
                form : {...this.props.form, isEdit : true},
                btnClass :"ui orange button submit-button",
                btnName: "Update"
            });
        }
    }

    handleChange = event => {
        const { name, value} = event.target; 
        let form = this.state.form;
        form[name] = value;
        this.setState({ form })
    }

    onFormSubmit = event => {
        event.preventDefault();
        if(this.formvalidation())
        {
            this.props.onFormSubmit(this.state.form);
        }
        this.clearFormfields();
    }

    formvalidation = ()=> {
        if(document.getElementsByName("title")[0].value === '')
        {
            alert('Remplissez tous les champs requis');
            return false;
        }
        else
        {
            return true;
        }
    }
    clearFormfields = ()=>{
        this.setState({

            form : {id:'', title:'', content:'', status:'', user:'', isEdit : false}
        })
        document.querySelector(".form").reset();
    }
    render()
    {
        const options = [
            { value: '1', label: 'New' },
            { value: '1', label: 'Canceled' },
            { value: '3', label: 'Finish' }
          ]
        return(

            <form className="ui form">
                <div className="fields">
                    <div className="four wide field">
                        <label>Title</label>
                        <input 
                        type="text" 
                        name="title" 
                        placeholder="Title" 
                        onChange ={this.handleChange}
                        value={ this.state.form.title } 
                        />
                    </div>
                    <div className="four wide field">
                        <label>Description</label>
                        <TextArea  
                        rows="5" 
                        cols="40" 
                        name="content" 
                        placeholder="Description ..."  
                        onChange ={this.handleChange}
                        value={ this.state.form.content } 
                        />
                    </div>
                    <div className="four wide field">
                    <label>Status</label>
                        <Select options = {options}  value={ this.state.form.status } name="status"/>
                    </div>
                    <div className="four wide field">
                       <button className={this.state.btnClass} onClick={this.onFormSubmit}>{this.state.btnName}</button>
                    </div>
                </div>
            </form>
        )
    }
}