import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private _AuthService:AuthService, private _Router:Router){}
 msgError:string='';

loginForm:FormGroup=new FormGroup({

  email: new FormControl(null,[Validators.required,Validators.email]),
  password: new FormControl(null,[Validators.required , Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)]),
 
})



handleForm():void{
 
  // console.log(this.loginForm.value);
  if(this.loginForm.valid){
   
    this._AuthService.setLogin(this.loginForm.value).subscribe({
        next:(response)=>{
            // console.log(response);
            if (response.message=='success'){
              localStorage.setItem('eToken',response.token)
              this._AuthService.saveUserData();
            this._Router.navigate(['/home'])
            }
            
        },
        error:(err:HttpErrorResponse)=>{
          console.log(err.error.message);
          // this.msgError=err.error.message;
          this.msgError='incorrect email or password';
        }
      } )
  }


}
}
