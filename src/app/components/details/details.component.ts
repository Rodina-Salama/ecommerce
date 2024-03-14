import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Product } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
constructor(private _ActivatedRoute:ActivatedRoute, private _EcomdataService:EcomdataService, private _CartService:CartService){}



addCart(id:string):void{
  this._CartService.addToCart(id).subscribe(
 {   next:(response)=>{
     console.log(response);
      
 }
}
  )
}

detailSliderOption: OwlOptions = {
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
    940: {
      items: 2
    }
  },
  nav: true
}

 productDetails:Product={} as Product;

  ngOnInit(): void {
   this._ActivatedRoute.paramMap.subscribe({
    next:(params)=>{
    let idProduct:any= params.get('id');


    this._EcomdataService.getProductDetails(idProduct).subscribe({
      next:(response)=>{
    console.log(response.data);
    this.productDetails=response.data;
      },
    })
    }


   })
  }

}
