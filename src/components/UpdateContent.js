import React, { Component} from 'react';

class UpdateContent extends Component {
  constructor(props){
    super(props);
    this.state = {
      id:this.props.data.id,
      title:this.props.data.title,
      desc:this.props.data.desc
    }
  }
  inputFormHandler(e){
    console.log(e.target.value);
    this.setState({[e.target.name]:e.target.value});
  }
    render() {
      console.log(this.props.data);
      console.log("UpdateContent log");
      return (
        // 만든 폼을 어디로 전송할 것이냐는 form action을 이용하는데
        // 아래의 예제의 경우 create_process라는 페이지로 사용자가 입력한
        // 정보를 전송한다는 뜻이고
        // method는 사용자가 데이터를 추가하거나 수정/삭제할 때는 url이 노출되지 않도록
        // post방식으로 보내야 한다.

        // 여기서 CreateContent.js 파일의 onSubmit는
        // form이 submit되었을 때 작동을 의미하는, 즉 form의 tag의 일종이고
        // App.js의 this.props.onSubmit(e.target.title.value,
        // e.target.desc.value)의 onSubmit는
        // App.js 파일의 <CreateContent onSubmit= 부분을 통해 생성한,
        // 즉 CreateContent의 props의 하나이다.

        // 원래 폼 태그에서는 submit 버튼을 클릭했을 때 action에 연결된
        // 페이지로 화면이 이동되는데 여기서는 리액트를 이용해 페이지 전환없이 작동하는
        // 웹이므로 submit 이후 화면이 바뀌지 않도록 preventDefault 씀.
        <article>
          <h2>Update</h2>
          <form action="/create_process" method="post"
          onSubmit={function(e){
            e.preventDefault();
            // 여기서 e.target은 폼 자체를 가리킨다.
            this.props.onSubmit(
              this.state.id,
              this.state.title,
              this.state.desc
              // e.target.id.value, // 왠지 모르겠는데 위처럼 써야 함.
              // e.target.title.value, // name이 title인 것의 value 값
              // e.target.desc.value // name이 desc인 것의 value 값??????
            );
          }.bind(this)}
          >
          <input type="hidden" name="id" value={this.state.id}></input>
            <p>
              <input
               type="text" 
               name="title" 
               placeholder="title"
               value = {this.state.title}
              //  onChange={function(e){
              //    // e.target은 event 객체의 target 즉
              //    // 자신이 속한 태그인 input 태그를 가리키므로
              //    // e.target.value는 input 태그의 value를 가리킨다.
              //  }.bind(this)}
              onChange={this.inputFormHandler.bind(this)}
               ></input>
              </p>
            <p>
              <textarea
               name="desc" 
               placeholder="description"
               value={this.state.desc}
               onChange={this.inputFormHandler.bind(this)}
               ></textarea>
              </p>
            <p><input type="submit"></input></p>
          </form>
        </article>
      );
    }
  }

export default UpdateContent;