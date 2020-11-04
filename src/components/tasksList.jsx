import React, {Component} from "react";
import MyTask from './task';


export default class TasksList extends Component{
  
    onDelete = (id) =>{
        //console.log('customer list', id); 
        this.props.onDelete(id);
        
    };

    onEdit = (data) =>{
        
        this.props.onEdit(data);
        //console.log('customer list', data); 
        
    };

    render()
    {

        let Tasks = this.props.tasks.data;
        return (
            <div className="data">
                <table className="ui celled table">
            <thead>
                <tr>
                    <th style={{ width: "50px", textAlign: "center" }}>#</th>
                    <th>Titre</th>
                    <th>Proprietaire</th>
                    <th>Date de cr&eacute;ation</th>
                    <th className={{ width: "148px" }}>Action</th>
                </tr>
            </thead>
             <tbody>
                 {
                     Tasks ? Tasks.map(task => {
                         return <MyTask 
                         item = {task} 
                         key ={task.id} 
                         onDelete={this.onDelete} 
                         onEdit={this.onEdit}
                         />
                        }) :''
                 }
             </tbody>
            </table>
            </div>
        )
    }
}
