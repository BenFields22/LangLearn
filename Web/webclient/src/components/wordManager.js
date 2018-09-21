import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "./wordManager.css";
import { db } from '../firebase';

class Manager extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addEnglish : null,
      addRussian : null,
      deleteEnglish : null,
      words:null,
    };
  }
  componentDidMount(){
    db.onceGetWords().then(snapshot =>
      this.setState({ words: snapshot.val() })
    );
  }

  updateWords = ()=>{
    db.onceGetWords().then(snapshot =>
      this.setState({ words: snapshot.val() })
    );
  }

  addWord = ()=>{
    if(this.state.addEnglish===null || this.state.addRussian===null){
      alert("Please provide both the english word and the russian word to add");
      return;
    }
    db.doCreateWord(this.state.addEnglish,this.state.addRussian);
    alert("Word Added");
    this.componentDidMount();
  }

  deleteWord=()=>{
    if(this.state.deleteEnglish===null ){
      alert("Please provide english word to delete");
      return;
    }
    db.doDeleteWord(this.state.deleteEnglish);
    console.log(this.state.deleteEnglish);
    alert("Word Deleted");
    this.componentDidMount();
  }

  render(){
    const { words } = this.state;
    return (
      <div className="manager">
        <div className="ADDCont">
          <table>
            <tbody>
            <tr>
              <td>English</td>
              <td><input onChange={event=>this.setState({'addEnglish':event.target.value})}></input></td>
            </tr>
            <tr>
              <td>Russian</td>
              <td><input onChange={event=>this.setState({'addRussian':event.target.value})}></input></td>
            </tr>
            </tbody>
          </table>
          <button type="button" onClick={this.addWord} className="addButton">ADD</button>
        </div>
        <div className="deleteCont">
          <table>
          <tbody>
            <tr>
              <td>ID</td>
              <td><input onChange={event=>this.setState({'deleteEnglish':event.target.value})}></input></td>
            </tr>
            </tbody>
          </table>
          <button type="button" onClick={this.deleteWord} className="deleteButton">DELETE</button>
        </div>

        <div id="listWords">
        { !!words && <WordList words={words} /> }
        </div>
        
      </div>
    )
  }
}

const WordList = ({ words }) =>
  <div>
    <h2>List of Words</h2>
    (ID-English-Russian)
    {Object.keys(words).map(key =>
      <div key={key}>{key}-{words[key].english}-{words[key].russian}</div>
    )}
  </div>
  

export default Manager;