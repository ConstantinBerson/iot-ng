import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AllService } from '../all.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  logForm:FormGroup;
  constructor(private service:AllService,private router:Router){
    this.logForm=new FormGroup({
      mail:new FormControl(''),
      pwd:new FormControl('')
    })
  }
  
  logIn(){
    this.service.login(this.logForm.controls['mail'].value,this.logForm.controls['pwd'].value).subscribe((res:any)=>{
      this.service.access=res.access_token;
      this.service.refresh=res.refresh_token;
      this.router.navigate(['/home']);
      this.service.getUser().subscribe((user)=>{        
        this.service.user=user;
        this.service.initSocket();
      })
    })
  }
}
