import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  implements OnInit{


constructor(private _EcomdataService:EcomdataService,private _CartService:CartService,private toastr: ToastrService
  ,private _WishlistService:WishlistService){}
products:Product[]=[];
categories:any[]=[]
searchTerm:string='';
wishlistData:string[]=[];




addFav(prodId:string|undefined):void{
  this._WishlistService.addToWishlist(prodId).subscribe({
    next:(response)=>{
      this.toastr.success(response.message)
      this.wishlistData=response.data;
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


//get all products
ngOnInit(): void {
  this._EcomdataService.getAllProducts().subscribe(
    {
      next:(response)=>{
      this.products=response.data;
        
      }
    }
  );

  this._EcomdataService.getAllCategories().subscribe(
    {
      next:(response)=>{
  //  console.log(response);
  this.categories=response.data;
   
        
      }
    }
  );

  this._WishlistService.getWishlist().subscribe({
    next:(response)=>{
   console.log('wishlist',response);
   const newData=response.data.map((item:any)=>item._id)
   console.log(newData);
   this.wishlistData=newData;
   
    }
  })

}





mainSliderOption: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  dots: false,
  navSpeed: 700,
  navText: ['', ''],
  autoplay:true,
 items:1,
  nav: true
}


categoriesSliderOption: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  dots: false,
  navSpeed: 700,
  navText: ['', ''],
  autoplay:true,
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 2
    },
    740: {
      items: 4
    },
    940: {
      items: 6
    }
  },
  nav: true
}


}




function next(value: any): void {
  throw new Error('Function not implemented.');
}

