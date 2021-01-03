import React, { Component } from 'react';

class Frame extends Component {
  constructor(props) {
    super(props);
    // create a ref to store the textInput DOM element
    this.bottomRef = React.createRef();
  }
  state = {  }

  componentDidUpdate = () => {
    this.bottomRef.current.scrollIntoView({behavior:"smooth"});
  };
  render() { 
      return (  
      <div className="frame" id="frame" onClick={this.addMessage}>
      <ul id="message-container">
        {this.props.messages}
        <div ref={this.bottomRef}></div>
      </ul>
    </div>
      );
  }
}
 
export default Frame;