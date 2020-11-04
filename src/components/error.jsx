import React , {Component} from 'react';
import FlashMessage from 'react-flash-message';
import { FaBeer } from 'react-icons/fa';
import '../App.css';


class Message extends Component{

    constructor(props)
    {
        super(props);
        this.state = {

            
        }
    }

    render(){

        return(
            <FlashMessage duration={5000} persistOnHover={true} >
                <FaBeer/>
                <p>
                    Pas de connexion au serveur
                </p>
            </FlashMessage>
        )
    }


}


export default Message;