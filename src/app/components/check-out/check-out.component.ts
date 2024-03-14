import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit{
constructor(private _FormBuilder:FormBuilder, private _ActivatedRoute:ActivatedRoute ,private _CartService:CartService){}


cartId:any='';
ngOnInit(): void {
  this._ActivatedRoute.paramMap.subscribe({
    next:(params)=>{
  // console.log(params.get('id'));
  this.cartId=params.get('id');
  
    }
  })
}



checkOut:FormGroup=this._FormBuilder.group({
  details:new FormControl(null,[Validators.required ]),
  phone:new FormControl(null,[Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)]),
  city:new FormControl(null,[Validators.required ])
})



handleForm():void{
  console.log(this.checkOut.value);
  this._CartService.checkOut(this.cartId,this.checkOut.value).subscribe({
    next:(response)=>{
// console.log(response);
    if(response.status=="success"){
   window.open(response.session.url,'_self')
}
    }
  })
}
}
