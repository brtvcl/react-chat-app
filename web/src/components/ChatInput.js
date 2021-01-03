import React, { Component } from 'react';
import {socket} from "../helpers/Socket";

class ChatInput extends Component {
  state = {  text:""}
  
  //Inputu işle
  handleInput = (e) => {
    this.setState({text:e.target.value});
  }

  //Mesaj göndermeyi işle
  handleSend = (e) => { 
    e.preventDefault();
    const input = this.state.text;
    //Input boş ise gönderme
    if (input.trim()) {
      socket.emit("send-chat-message",input);
      this.props.inputCallback(false,input,"me");
      this.setState({text:""});
    };  
  }


  render() { 
    return (  
      <div className="chat-input-container" id="chat-input-container">
      <form id="send-container" onSubmit={this.handleSend}>
        <input 
          onChange={this.handleInput}
          value={this.state.text}
          type="text" 
          autoComplete="off" 
          placeholder="Bir mesaj yazın.." 
          id="message-input" 
          className="chat-message-input"></input>
        <input 
          type="submit" 
          id="send-button" 
          value="➤" 
          className="chat-message-send"></input>
      </form>
      </div>
    );
  }
}
 
export default ChatInput;

