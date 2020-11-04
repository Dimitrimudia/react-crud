import React, { Component } from "react";


export default class MyTask extends Component
{
    onDelete = () =>{
        this.props.onDelete(this.props.item.id)
    };

    onEdit = () =>
    {
        this.props.onEdit(this.props.item)
    }

    render()
    {

            const {id, title, user, created_at} = this.props.item;
            return (
                <tr>
                    <td style={{ textAlign:"center" }}>{id}</td>
                    <td>{title}</td>
                    <td>{user}</td>
                    <td>{created_at}</td>
                    <td>
                        <button className="mini ui blue button" onClick={this.onEdit}>Editer</button>
                        <button className="mini ui red button" onClick={this.onDelete}>Effacer</button>
                    </td>
                </tr>
            )
    }
}

