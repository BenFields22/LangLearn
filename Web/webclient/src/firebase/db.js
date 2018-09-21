import { db } from './firebase';

// User API

export const doCreateUser = (id, username, email) =>
  db.ref(`users/${id}`).set({
    username,
    email,
  });

export const doCreateWord = (english, russian) =>{
  db.ref('count').once('value').then(data =>{
    console.log("current id is ",data.val()+1);
    var num = data.val()+1;
    db.ref('count').set(num);
    db.ref(`words/${num}`).set({
      english,
      russian,
    });
  })
}

export const doDeleteWord = (id) =>{
  //db.ref('count').set(0);
  db.ref('count').once('value').then(data =>{
    db.ref('words').child(id).remove();
  });
}

  

export const onceGetUsers = () =>
  db.ref('users').once('value');

  export const onceGetWords = () =>
  db.ref('words').once('value');

// Other Entity APIs ...