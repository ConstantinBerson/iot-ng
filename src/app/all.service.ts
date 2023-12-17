import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Socket, io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class AllService {
  access:string;
  refresh:string;
  user:any;
  participant;
  url="http://localhost:3000/";
  socket:Socket=io('http://localhost:3000');
  public conversation$: BehaviorSubject<string> = new BehaviorSubject('');
  public conversationList$: BehaviorSubject<string> = new BehaviorSubject('');
  constructor(private http:HttpClient,private router:Router) {}

  login(mail:string,pwd:string){
    return this.http.post(this.url+"v1/auth/login",{
      "email": mail,
      "password": pwd
    })
  }

  refreshToken(){
    if(this.refresh){
      const header=new HttpHeaders({
        'Authorization': `Bearer ${this.refresh}`
      })
      return this.http.post(this.url+"v1/auth/login",{},{headers:header})
    }else{
      this.router.navigate(['/'])
      return;
    }
  }

  getUser(){
    const header=new HttpHeaders({
      'Authorization': `Bearer ${this.access}`
    })
    return this.http.get(this.url+"v1/user",{headers:header})
  }

  sendMessage(recipientId:string,message:string){
    const header=new HttpHeaders({
      'Authorization': `Bearer ${this.access}`
    })
    return this.http.post(this.url+"v1/message",{
        "content": message,
        "recipientId": recipientId
    },{headers:header})
  }

  getConversationList(){
    const header=new HttpHeaders({
      'Authorization': `Bearer ${this.access}`
    })
    return this.http.get(this.url+"v1/message/conversations",{headers:header});
  }

  getConversation(){
    const header=new HttpHeaders({
      'Authorization': `Bearer ${this.access}`
    })
    return this.http.get(this.url+"v1/message/message/655758e3704076d3e2f090bb",{headers:header});
  }

  conversationListSchedule(){    
    this.socket.on('findConversationList',(res)=>{
      console.log(res);

      if(res.userId==this.user._id){
        this.conversationList$=res.data
      }
    })
    return this.conversationList$.asObservable();
  }

  conversationSchedule(){
    this.socket.on('findMessage',(res)=>{
      console.log(res);
      
      if(res.recipient==this.user._id){
        this.conversation$=res.data
      }
    })
    return this.conversation$.asObservable();
  }

}
