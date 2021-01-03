import React, { Component } from 'react';

class Bubble extends Component {    
    render() { 
        if (this.props.isNotification || false) {
            return (  
                <li>
                    <div className={"chat-notification"} >
                        <p className="chat-text">{this.props.msg}</p>
                    </div>
                </li>
            );
        };
        return (
            
            <li>
            <div className={"chat-bubble " + this.props.who} >
                <p className="chat-user">{this.props.user}</p>
                <p className="chat-text">{this.props.msg}</p>
                <p className="chat-time">{this.props.time}</p>
            </div>
        </li>
        )
    }
}
 
export default Bubble;