import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
constructor(private _CartService:CartService){}
cartDetails:any={};


changeCount(id:string,count:number):void{

  if(count>0){
    this._CartService.updateQuantity(id,count).subscribe(
      {
        next:(response)=>{
      // console.log(response);
      this.cartDetails=response.data;
        }
      }
    )
  }
}

removeCartItem(id:string):void{
  this._CartService.deleteProduct(id).subscribe({
    next:(response)=>{
      // console.log(response);
      this.cartDetails=response.data;
      
    }
  })
}
clear():void{
  this._CartService.ClearCart().subscribe({
    next:(response)=>{
     if(response.message=="success"){
      this.cartDetails={};
      console.log(response);
     }
     
      
    }
  })
}


  ngOnInit(): void {
   this._CartService.getUserCart().subscribe({
    next:(response)=>{
console.log(response.data);

       this.cartDetails=response.data;
    },
    error:(err)=>{
      this.cartDetails='cart is empty'
      console.log(err);
      
    }
   })
  }

}
