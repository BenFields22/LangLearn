import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase/app';
import "./tester.css";
import { db } from '../firebase';

class Tester extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question:null,
      answer:null,
      words:null,
      size:0,
      current:0,
    };
  }
  componentDidMount(){
    console.log("Fired did mount with current "+this.state.current);
    db.onceGetWords().then(snapshot =>{
      this.setState({ words: snapshot.val() });
      var mywords = this.state.words;
      var keys = Object.keys(mywords);
      this.setState({size:keys.length})
      console.log(keys);
      for(var i = 0;i< keys.length;i++){
        console.log(keys[i]);
        console.log(mywords[keys[i]].english);
        if(i === this.state.current){
          this.setState({question:mywords[keys[i]].english})
          break;
        }
      }
    }
    );
  }

  checkAnswer = ()=>{
    console.log("checking answer");
    var entered = this.state.answer;
    console.log("entered ",entered);
    const db = firebase.database();
    var ref = db.ref('words');
    ref.orderByChild('english').equalTo(this.state.question).on("child_added", function(snapshot) {
      console.log(snapshot.val().russian);
      var correct = snapshot.val().russian;
      if(correct === entered){
        alert("correct");
      }
      else{
        alert("Wrong. Correct answer is "+correct);
      }
    });
  }

  nextQuestion = ()=>{
    console.log("size is "+this.state.size);
    var num = this.state.current;
    this.setState({current:num+1})
    if(this.state.current >= this.state.size){
      alert("Complete all words")
      return;
    }
    var mywords = this.state.words;
      var keys = Object.keys(mywords);
      for(var i = 0;i< keys.length;i++){
        console.log(keys[i]);
        console.log(mywords[keys[i]].english);
        if(i === this.state.current){
          this.setState({question:mywords[keys[i]].english})
        }
      }
      //this.componentDidMount();
  }

  
  render(){
    const { question } = this.state;
    return (
      <div>
      <h1>Quiz</h1>
      <hr/>

      <div id="questionLine">{question}</div><input onChange={event=>this.setState({'answer':event.target.value})} type="text" ></input>
      <br/><button type="button" onClick={this.checkAnswer}>Check</button>
      <br/><button type="button" onClick={this.nextQuestion}>Next</button>
      </div>
    )
  }
}


  

export default Tester;