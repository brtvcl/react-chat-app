import React, { Component } from 'react';
import { socket } from '../helpers/Socket';

class Modal extends Component {

    componentDidMount() {
        this.setState({class:"modal visible"});
    }

    handleNameChange = (e) => {
        this.setState({value:e.target.value});
    }
    
    userConnect = () => {
        socket.emit("new-user",this.state.value);
        this.props.connectCallback(true,"Sohbete katıldınız");
        this.setState({class:"modal unvisible"});
    }

    state = { class:"modal unvisible",value:"" }
    
    render() { 
        return (  
        <div className={this.state.class}>
        <div className="modal-content">
            İsim :&nbsp;<input type="text" onChange={this.handleNameChange}></input> 
            &nbsp;<button type="button" onClick={this.userConnect}>Bağlan</button>
        </div>
      </div>
        );
    }
}
 
export default Modal;