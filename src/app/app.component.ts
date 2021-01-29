import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';

export interface obj {user:string, message:string, timeStamp:any, color?:string}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hmwk11';
  public user : string;
  public message : string;
  public color : string;

  messageArray:obj[];

  // accessing collection
  constructor(private db:AngularFirestore){
    //display messages in order
    db.collection<obj>('chat', ref => ref.orderBy('timeStamp')).valueChanges().subscribe(res => {
      this.messageArray = res;
    });
    // save name and coloe in local, when refresh the page stays the same
    this.user = localStorage.getItem('user');
    this.color = localStorage.getItem('color');
  }

  ngOnInIt():void{};

  add(){
    this.db.collection('/chat').add({
      user : this.user,
      message : this.message,
      color : this.color,
      timeStamp : firebase.default.firestore.Timestamp.now(),
    })
    // console.log(this.user);
    // console.log(this.color);
    // console.log(this.message);
  }

  handleUser(){
    localStorage.setItem('user', this.user)
  }

  handleColor(){
    localStorage.setItem('color', this.color)
  }
}
