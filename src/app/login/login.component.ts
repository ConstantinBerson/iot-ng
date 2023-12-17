// login.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      developerId: ['', Validators.required],
      deviceId: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      // Add logic to handle login
      const { email, developerId, deviceId } = this.loginForm.value;
      console.log('Login submitted:', email, developerId, deviceId);
    }
  }
}
