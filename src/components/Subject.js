import React, { Component} from 'react';

class Subject extends Component {
  
    render() {
      console.log("Subject render");
      return (
        <header>
          <h1><a href="/" onClick={function(e) // 링크 클릭했을 때 발생하는 이벤트이다.
          {
            e.preventDefault();
            this.props.onChangePage(); // function으로 정의되어 있어서 그렇다.
          }.bind(this)}>{this.props.title}</a></h1>
          {this.props.sub}
        </header>
      );
    }
  }

export default Subject;