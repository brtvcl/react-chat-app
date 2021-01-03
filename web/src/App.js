  
import "./style.css";
import React, { Component } from 'react';
import Bubble from "./components/Bubble";
import Frame from "./components/Frame";
import Modal from "./components/Modal";
import ChatInput from "./components/ChatInput";
import { socket } from "./helpers/Socket";


class App extends Component {
  state = {messages: []};

  //Yeni gelen mesaj
  addMessage=(isNotification=false,msg="msg",who="me",user="user")=> {
    let message;
    //Bildirim ise gerekli parametreleri gönder
    if (isNotification) {
      message=(
        <Bubble msg={msg} isNotification={isNotification}></Bubble>
      );
    } 
    //Bildirim değilse normal parametreleri gönder
    else {
      message=(
        <Bubble who={who} msg={msg} user={who==="you"?user:undefined}></Bubble>
      );
    }
  
    let newMessages = [...this.state.messages,message];
    this.setState({messages:newMessages});
  };
  

  //React Hook ile serverdan gelen verileri uygula
  componentDidMount() {
    //Mesaj geldiğinde yeni <Bubble> ekle
    socket.on('chat-message',data => {
      console.log("yeni mesaj");
      this.addMessage(false, data.message, "you", data.name);
    });
    
    //Yeni kullanıcı katıldığında <Bubble> bildirim ekle
    socket.on('user-connected',name =>  {
      this.addMessage(true, `${name} sohbete katıldı`);
    });

    //Kullanıcı ayrıldığında <Bubble> bildirim ekle
    socket.on('user-disconnected',name =>  {
      this.addMessage(true, `${name} sohbetten ayrıldı`);
    });
  };

  render(){
    return (
      <div>
        <div className="header">
          Berat Vıcıl © 2021 
        </div>
        <Modal connectCallback={this.addMessage}></Modal>
        <Frame messages={this.state.messages} ></Frame>
        <ChatInput inputCallback={this.addMessage}></ChatInput>
      </div>
      
    );
  }
  
}

export default App;
