import { Component, OnInit } from '@angular/core';
import { AllService } from '../all.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit{
  conversation:any;
  messageForm:FormGroup;
  constructor(private service:AllService){
    this.messageForm=new FormGroup({
      message:new FormControl('')
    })
  }

  ngOnInit(): void {
    this.service.getConversation().subscribe({next:(res)=>{
      this.conversation=res;
      console.log(this.conversation);
    },error:(error)=>{
      if(error.status==401){
        this.service.refreshToken()?.subscribe((res:any)=>{
          this.service.access=res.access_token;
          this.service.refresh=res.refresh_token;
          this.service.getConversationList().subscribe((conv)=>{
            this.conversation=conv;
          })
        })
      }
    }});
    this.service.conversationSchedule().subscribe((res)=>{
      this.conversation=res
    })
    this.service.socket.on('typing',(res)=>{
      console.log(res);
    })
  }

  isCurrent(userId:string){
    return userId==this.service.user.id
  }

  send(){
    this.service.sendMessage(this.service.participant[0]._id,this.messageForm.controls['message'].value).subscribe(()=>{
      this.messageForm.controls['message'].setValue('');
    });
  }

}
