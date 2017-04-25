import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Comment extends React.Component{

constructor(){
  super();
  this.state={editing:false};
}

edit(){
  this.setState({editing:true});
}

remove(){
 this.props.deletefromboard(this.props.index);
}

save(){
  this.props.updatecommenttext(this.refs.newtext.value,this.props.index);
  this.setState({editing:false});

}

rendernormal(){
  return (
        <div className='outer'>
        <div className='inner'>{this.props.children}</div>
        <button onClick={this.edit.bind(this)} className='primary'> Edit </button>
        <button onClick={this.remove.bind(this)} className='secondary'> Remove </button>
        </div>
    );
}

renderform(){
  return (
      <div className='outer'>
        <textarea ref="newtext" defaultValue={this.props.children} className='textareaa'></textarea>
        <button onClick={this.save.bind(this)} className='saving'> Save </button>
      </div>
    );
}

 render(){
    if(this.state.editing){
      return this.renderform();
    }
    else{
      return this.rendernormal();
    }
  }
}

class Board extends React.Component{

constructor(){
  super();
  this.state={
     comments:[],
  };
}

add(text){
  var arr = this.state.comments;
  arr.push(text);
  this.setState({comments:arr});
}

removecomment(i){
  var arr = this.state.comments;
  arr.splice(i,i);
  this.setState({comments:arr});
}

updatecomment(newtext, i){
  var arr = this.state.comments;
  arr[i] =  newtext;
  this.setState({comments:arr});
}

eachcomment(item,i){
  return (
  <Comment key={i} index={i} updatecommenttext={this.updatecomment.bind(this)} deletefromboard={this.removecomment.bind(this)}>
    {item}
  </Comment>);
}

render(){
    return (
      <div>
        <h2 className='heading'> Comment Box </h2>
        <button className='adding' onClick={this.add.bind(this,'This is a new comment')}>Add New</button>
        <div className='board'>
        {
          this.state.comments.map(this.eachcomment.bind(this))
        }
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Board/>,document.getElementById('root'));
