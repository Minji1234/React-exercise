import React, { Component} from 'react';
import TOC from "./components/TOC"
import ReadContent from "./components/ReadContent"
import CreateContent from "./components/CreateContent"
import UpdateContent from "./components/UpdateContent"
import Subject from "./components/Subject"
import Control from "./components/Control"
import './App.css';

// class Subject extends Component {
//   render() {
//     return (
//       <header>
//         <hi>{this.props.title}</hi>
//         {this.props.sub}
//       </header>
//     );
//   }
// }

// class TOC extends Component {
//   render() {
//     return (
//       <nav>
//           <ul>
//               <li><a href="1.html">HTML</a></li>
//               <li><a href="2.html">CSS</a></li>
//               <li><a href="3.html">JavaScript</a></li>
//           </ul>
//       </nav>
//     );
//   }
// }

// class Content extends Component {
//   render() {
//     return (
//       <article>
//         <h2>{this.props.title}</h2>
//         {this.props.desc}
//       </article>
//     );
//   }
// }

// App이 내부적으로 사용할 요소는 state를 이용한다!
// 아래의 예시를 보면 상위 컴포넌트인 App의 상태를 하위 컴포넌트로 전달하고 싶을 때
// 상위 컴포넌트의 state 값을 하위 컴포넌트의 props 값으로 전달하면 된다
// render() {
//   return (
//     <div className="App">
//       <Subject
//         title={this.state.subject.title}
// (하위 컴포넌트인 Subject에게 props 값으로 this.state.subject.title을 보낸 것을 알 수 있음.)

class App extends Component {
  constructor(props) {
    super(props);
    this.max_content_id = 3;
    this.state = {
      mode:"welcome",
      selected_content_id:2,
      subject:{title:"WEB", sub:"World Wide Web!"},
      Welcome:{title:"Welcome", desc:"Hello, React!!"},
      contents:[
        {id:1, title:"HTML", desc:"HTML is HyperText ..."},
        {id:2, title:"CSS", desc:"CSS is for design"},
        {id:3, title:"JavaScript", desc:"JavaScript is for interactive"}
      ]
    }
  }
  getReadContent(){
    var i = 0;
      while(i < this.state.contents.length)
      {
        var data = this.state.contents[i];
        if (data.id === this.state.selected_content_id)
        {
          break;
        }
        i = i + 1;
      }
      return data;
  }
  // props나 state 값이 바뀌면 해당되는 컴포넌트(하위 컴포넌트도 포함)의 render 함수가 호출된다.
  // 즉 화면이 다시 그려진다.
  getContent(){
    var _title, _desc, _article = null;
    if (this.state.mode === "welcome")
    {
      _title = this.state.Welcome.title;
      _desc = this.state.Welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    } else if (this.state.mode === "read")
    {
      var _content = this.getReadContent();
      _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>
    } else if (this.state.mode === "create")
    {
      _article = <CreateContent onSubmit={function(_title, _desc){
        // append content to this.state.contents
        this.max_content_id = this.max_content_id + 1;
        // this.state.contents.push({id:this.max_content_id, title:_title, desc:_desc});
        var _contents = Array.from(this.state.contents);
        _contents.push({id:this.max_content_id, title:_title, desc:_desc});
        this.setState({
          contents:_contents,
          selected_content_id:this.max_content_id,
          mode:'read'
        });
        console.log(_title, _desc);
      }.bind(this)}></CreateContent>
    } else if (this.state.mode === "update")
    {
      _content = this.getReadContent();
      _article = <UpdateContent data={_content} onSubmit={
        function(_id, _title, _desc){
        // append content to this.state.contents
        // this.state.contents.push({id:this.max_content_id, title:_title, desc:_desc});
        var _contents = Array.from(this.state.contents); // Arrays.from: 배열 깊은 복사 기능
        var i = 0;
        while (i < _contents.length)
        {
          if (_contents[i].id === _id)
          {
            _contents[i] = {id:_id, title:_title, desc:_desc};
            break;
          }
          i = i + 1;
        }
        this.setState({
          contents:_contents,
          mode:'read'
        });
        console.log(_title, _desc);
      }.bind(this)}></UpdateContent>
    }
    return _article;
  }

  render() {
    console.log("App log");
    
    return (
      <div className="App">
        <Subject
          title={this.state.subject.title}
          sub={this.state.subject.sub}
          //  {/* 이벤트를 설치하고 싶다면 onChangePage라는 이벤트에 함수를 설치해 두면
          // 이 컴포넌트 안에서 링크를 클릭하면 onChangePage의 함수를 실행한다. */}
          onChangePage={function(){
            this.setState(
              {mode:'welcome'});
          }.bind(this)}
        >
        </Subject>
        {/* <header>
          <h1><a href="/" onClick = {function(e){ // onClick으로 이렇게 이벤트를 설치해 놓으면
            // 이벤트가 실행될 때(=function이 호출될 때) function의 첫 번째 매개변수의 값으로
            // 이벤트라고 하는 객체를 주입한다.
            console.log(e);
            e.preventDefault();
            // 이벤트에는 preventDefault()라는 함수가 있는데 이 함수는 이벤트가 발생한 태그(여기서는 a)가
            // 자신의 역할을 수행하지 못하도록 막기 때문에
           // alert('hi'); // 알람창 누르면 reload 되는 문제점을 제거해 준다. (a는 연결된 html을 여는 역할이었으므로)
           this.setState({ // 객체가 생성된 뒤 동적으로 state를 할당할 때에는 setState 함수를 사용해야 한다.
            // this.state.mode = "welcome"; 이런 식으로 하면 안 된다!
              mode:'welcome'
           });
          }.bind(this)}>{this.state.subject.title}</a></h1>
          {this.state.subject.sub}
        </header> */}
        {/* <Subject title="React" sub="For UI"></Subject> */}
        <TOC
         data={this.state.contents}
         onChangePage={function(id)
        {
          this.setState({
            mode:'read',
            selected_content_id:Number(id)
        });
        }.bind(this)}
         >
        </TOC>
        <Control onChangeMode={function(_mode){
          // onChangeMode라고 하는 이벤트를 Control component에 추가한 것.
          if (_mode === "delete"){
            var _contents = Array.from(this.state.contents);
            if (window.confirm("Really?"))
            {
              var i = 0;
              while (i < _contents.length)
              {
                if (_contents[i].id === this.state.selected_content_id) {
                  _contents.splice(i, 1); // i로부터 1개의 원소를 지운다는 뜻.
                  break;
                }
                i = i + 1;
              }
            }
            this.setState({
              mode:'welcome',
              contents:_contents
            })
            alert("Deleted Successfully!");
          } else {
            this.setState({
              mode:_mode
            });
          }
        }.bind(this)}></Control>
        {this.getContent()}
      </div>
    );
  }
}

export default App;