import React, { Component} from 'react';

class Control extends Component {
    render() {
      console.log("Subject render");
      return (
        <ul>
        <li><a href="/create" onClick={function(e){
            // create 버튼을 눌렀을 때, 즉 onClick을 발동시켰을 때
            // onChangeMode라는 handler가 실행되도록 하는 것.
            e.preventDefault();
            this.props.onChangeMode('create');
        }.bind(this)}>create</a></li>
        <li><a href="/update" onClick={function(e){
            e.preventDefault();
            this.props.onChangeMode('update');
        }.bind(this)}>update</a></li>
        <li><input onClick={function(e){
            e.preventDefault();
            this.props.onChangeMode('delete');
        }.bind(this)} type="button" value="delete"></input></li>
      </ul>
      );
    }
  }

export default Control;