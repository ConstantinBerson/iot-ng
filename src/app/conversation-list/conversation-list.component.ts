import { Component, OnInit } from '@angular/core';
import { AllService } from '../all.service';

@Component({
  selector: 'app-conversation-list',
  templateUrl: './conversation-list.component.html',
  styleUrls: ['./conversation-list.component.scss']
})
export class ConversationListComponent implements OnInit{
  conversation:any;
  constructor(private service:AllService){}

  ngOnInit(): void {
      this.service.getConversationList().subscribe({next:(res)=>{
        this.conversation=res;
        this.service.participant=this.conversation[0].participants
        console.log(this.conversation);
      },error:(error)=>{
        if(error.status==401){
          this.service.refreshToken()?.subscribe((res:any)=>{
            this.service.access=res.access_token;
            this.service.refresh=res.refresh_token;
            this.service.getConversationList().subscribe((conv)=>{
              this.conversation=conv;
              this.service.participant=this.conversation[0].participants
            })
          })
        }
      }});
      this.service.conversationListSchedule().subscribe((res)=>{
        this.conversation=res
      })
  }

  typing(){
    this.service.socket.emit('typing',{ participantId: this.service.participant[0]._id, isTyping: true })
  }

}
