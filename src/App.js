import React, {Component} from 'react';
import axios from "axios";
import './App.css';
import MyForm from './components/form';
import Loader from './components/Loader';
import TasksList from './components/tasksList';
import Message from './components/error'; 

class App extends Component {

  constructor(props)
  {
      super(props);
      this.state =
      {
          Tasks:[],
          Customer: {},
          loader :false,
          //url:"mongodb+srv://root:mi0oQrgjEhbgLcPL@cluster0.xfwpe.mongodb.net/products?retryWrites=true&w=majority",
          url:"http://todos.cd/api/todos",
          connectStatus : false
      }
      
  }
  
  getTasks = async ()=>{
      this.setState({ loader: true })
      await axios.get(this.state.url).then( response => {
        this.setState({
          Tasks : response.data,
          loader : false,
          connectStatus : true
        })

      }).catch( error => {
          console.error(error);
          this.setState({
            loader : false,
            connectStatus : false
          })
      });
      
  };

  deleteTask = async id =>
  {
      this.setState({ loader : true});
      //let lien = ${this.state.url}/${id};
      await axios.delete(`${this.state.url}/${id}`).then(response =>{
        console.log(response.data.message);
      }).catch(error => { console.error(error)});
      this.getTasks();
  };

  creatTask = async data =>
  {
    this.setState({loader : true})
    await axios.post(this.state.url, {
        title : data.title,
        content : data.content,
        user : 3,
        status : 1
    }).then( response =>{
      console.log(response.data.message);
      this.getTasks();
    }).catch(error => {console.error(401)});
    
  }

  editTask = async data => 
  {
    this.setState({task : {}, loader: true});
    await axios.put(`${this.state.url}/${data.id}`,
    {
        title : data.title,
        content : data.content,
        user : data.user,
        status : data.status
    }).then(response =>{
      console.log(response.data.message);
    }).catch(error =>{

       return console.error({error : error});

    });
    this.getTasks();
  }

  componentDidMount()
  {
      this.getTasks();
  }

  onDelete = (id) => {
    this.deleteTask(id);
  };

  onEdit = data => {
    this.setState({
      Customer : data
    });
    
  };

  onFormSubmit = data => {
    if(data.isEdit)
    {
          this.editTask(data);
    }
    else
    {
          this.creatTask(data);
    }
  }

  render(){
  return (
            <div>
              <div className="ui fixed inverted menu">
                  <div className="ui container">
                    <a href="/#" className="header item">
                      React JS CRUD Laravel API RestFull
                    </a>
                  </div>
              </div>
              <div className="ui main container">
                  <MyForm 
                    form={this.state.Customer}
                    onFormSubmit = {this.onFormSubmit}
                  />
                  { this.state.loader ? <Loader />: ""}
                  { this.state.connectStatus ?  
                    <TasksList 
                      tasks= {this.state.Tasks}
                      onDelete = {this.onDelete} 
                      onEdit = {this.onEdit} 
                    /> : <Message />
                  }
              </div>
            </div>
  );
}
}

export default App;
