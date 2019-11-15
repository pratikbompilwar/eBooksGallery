import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userForm: FormGroup;

  constructor(private fb: FormBuilder, private userSvc: UserService) {
    this.userForm = this.fb.group({
      username: new FormControl("", Validators.required),
      password: new FormControl("", Validators.compose([Validators.required, Validators.minLength(8)])),
      name: new FormControl("", Validators.required),
      address: new FormControl("", Validators.required),
      email: new FormControl("", Validators.compose([Validators.required, Validators.email]))
    })
  }

  ngOnInit() {
  }

  public get Username() {
    return this.userForm.controls["username"];
  }
  public get Password() {
    return this.userForm.controls["password"];
  }
  public get Name() {
    return this.userForm.controls["name"];
  }
  public get Email() {
    return this.userForm.controls["email"];
  }
  public get Address() {
    return this.userForm.controls["address"];
  }

  register() {
    if (this.userForm.valid) {
      let user: User = this.userForm.value;
      user.usertype = "user";
      this.userSvc.addUser(user)
        .subscribe(
          result => {
            console.log(result);
            alert("Registered successfully");
          },
          err => { alert("Error in registering user") }
        )
    } else {
      alert("Invalid form data")
    }
  }
}
