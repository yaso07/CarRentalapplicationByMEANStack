import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  constructor(private fb: FormBuilder,private user:UserService) {}

  ngOnInit() {}

  signupform = this.fb.group({
    username: ['',Validators.required],
    password: ['',Validators.required,],
    confirmpassword: ['',Validators.required],
  });

  @Output()
   SwapComponent: EventEmitter<Boolean>=new EventEmitter()
 navigate()
 {
      this.SwapComponent.emit(false)
 }
 addUser(data:any)
 {  
     this.user.addUser(data.value).subscribe((data)=>
     {
         alert("added")
     })
 }
}
