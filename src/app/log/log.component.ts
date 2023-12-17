import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { AuthService } from "src/app/service/auth.service";

@Component({
  selector: "app-log",
  templateUrl: "./log.component.html",
  styleUrls: ["./log.component.scss"],
})
export class LogComponent implements OnInit {
  logForm: FormGroup;
  wrongPwd: boolean = false;
  constructor(
    private router: Router,
    private authService: AuthService,
    private Loader: NgxUiLoaderService
  ) {
    this.logForm = new FormGroup({
      pwd: new FormControl("", [Validators.required]),
    });
  }

  ngOnInit(): void {}

  logIn() {
    this.authService.login(this.logForm.controls["pwd"].value).then((res) => {
      if (res) {
        this.wrongPwd = false;
        this.authService.canLog();
        this.router.navigate(["/"]);
      } else {
        this.wrongPwd = true;
        console.log("test");
      }
    });
  }
}
