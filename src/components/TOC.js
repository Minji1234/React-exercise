import React, { Component} from 'react';

class TOC extends Component {
  shouldComponentUpdate(newProps, newState)
  {
    // shouldComponentUpdate는 newProps(TOC 컴포넌트의 props가
    // 바꼈을 때 그 바뀐 값)와 newState라는 두 개의 매개변수를 가진다.
    // rendr 이전에 shouldComponentUpdate가 호출되고
    // 이게 리턴하는 값이 true면 render가 실행되고
    // false면 render가 실행되지 않는다.
    // shouldComponentUpdate는 이전에 바뀐 값과 새로 실행되는 값
    // (값: props, state)에 접근할 수 있다. 
    console.log('==> TOC render shouldComponentUpdate'
    , newProps.data
    , this.props.data
    )
    if (newProps.data === this.props.data)
    {
      return false; // 바뀐 게 없는 경우이므로 (push를 안 쓴 경우 가정)
    }
    else
    {
      return true;
    }
  }
  
    render() {
      console.log("TOC render");
      var lists = [];
      var data = this.props.data;
      var i = 0;
      while (i < data.length)
      {
        lists.push(
        <li key={data[i].id}>
        <a
         href={"/Content/"+data[i].id}
        // data-id={data[i].id}
        //  onClick={function(e){
        //    // event 개체는 target이라는 속성이 있고 target은 그 이벤트가 발생한 태그
        //    // (여기서는 a)를 가리킨다.
        //    // e.target을 이용하면 해당 a 태그가 갖고 있는 data-id라는 값에 접촉할 수 있다.
        //    // (여기서 data로 시작하는 속성은 dataset으로 접근이 가능하다.)
        //    e.preventDefault();
        //    this.props.onChangePage(e.target.dataset.id);
        //  }.bind(this)}

         // onClick = {function(id, ~~ e){
        // 아래와 같이 이런 식으로도 사용 가능!
        // (data-id 등 dataset 쓰지 않고도.)
        // }.bind(this, data[i].id, ~~)}
        // this 뒤의 data[i].id가 function 뒤의 id라는 매개변수로 들어간다!
        onClick={function(id, e)
        {
          e.preventDefault();
          this.props.onChangePage(id);
        }.bind(this, data[i].id)}
         >{data[i].title}</a></li>);
        i = i + 1;
      }
      return (
        <nav>
            <ul>
              {lists}
                {/* <li><a href="1.html">HTML</a></li>
                <li><a href="2.html">CSS</a></li>
                <li><a href="3.html">JavaScript</a></li> */}
            </ul>
        </nav>
      );
    }
  }

export default TOC;