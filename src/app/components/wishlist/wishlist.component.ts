import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent  implements OnInit{
 


  constructor(private _WishlistService:WishlistService, private  toastr: ToastrService ,private _CartService:CartService){}
  products:Product[]=[];
  wishlistData:string[]=[];


  addFav(prodId:string|undefined):void{
    this._WishlistService.addToWishlist(prodId).subscribe({
      next:(response)=>{
        this.toastr.success(response.message)
    console.log(response);
    
      }
    })
  }

  
removeFav(prodId:string|undefined):void{
  this._WishlistService.removeItemWishlist(prodId).subscribe({
    next:(response)=>{
      this.toastr.info('Product removed successfully from your wishlist')
      this.wishlistData=response.data;
  console.log(response);
  
  this._WishlistService.getWishlist().subscribe({
    next:(response)=>{
      this.products=response.data;
    }
  })

    }
  })

  }
  

  addCart(id:string):void{
    this._CartService.addToCart(id).subscribe(
   {   next:(response)=>{
       console.log(response);
       this.toastr.success('It has been successfully added')
        
   }
  }
    )
  }

ngOnInit(): void {
  this._WishlistService.getWishlist().subscribe({
    next:(response)=>{
    // console.log(response);
    this.products=response.data;
    const newData=response.data.map((item:any)=>item._id)
    //console.log(newData);
    this.wishlistData=newData;
    }
  })
}
}
