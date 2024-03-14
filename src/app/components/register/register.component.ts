import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormControlOptions, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private _AuthService:AuthService, private _Router:Router){}
 msgError:string='';

registerForm:FormGroup=new FormGroup({
  name: new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
  email: new FormControl(null,[Validators.required,Validators.email]),
  password: new FormControl(null,[Validators.required , Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)]),
  rePassword: new FormControl(null),
  phone: new FormControl(null,[Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)]),
},{validators:[this.confirmPassword]} as FormControlOptions)




confirmPassword(group:FormGroup):void{
let password=group.get('password');
let rePassword= group.get('rePassword')


if(password?.value==null){
  rePassword?.setErrors({required:true})
}
 else if(password?.value != rePassword?.value){

  rePassword?.setErrors({mismatch:true})
}

}

handleForm():void{
 
  // console.log(this.registerForm.value);
  if(this.registerForm.valid){
   
    this._AuthService.setRegister(this.registerForm.value).subscribe({
        next:(response)=>{
            // console.log(response);
            if (response.message=='success'){
            this._Router.navigate(['/login'])
            }
            
        },
        error:(err:HttpErrorResponse)=>{
          console.log(err.error.message);
          this.msgError=err.error.message;
        }
      } )
  }


}
}
