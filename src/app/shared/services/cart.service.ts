import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _HttpClient:HttpClient) { }


  headers:any={token:localStorage.getItem('eToken')}


  orderId:any=jwtDecode(localStorage.getItem('eToken')!);


  addToCart(productId:string):Observable<any>{
 
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/cart`,{
      "productId": productId
  },
  {headers:this.headers}
  )
  }


  getUserCart():Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/cart`,{headers:this.headers})
  }


  deleteProduct(productId:string):Observable<any>{
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{headers:this.headers})
  }


  updateQuantity(productId:string,count:number):Observable<any>{
return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
  count: count
},
{headers:this.headers})
  }


ClearCart():Observable<any>{
  return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{headers:this.headers})

}


checkOut(cartId:string, userData:object):Observable<any>{
 
  return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=https://rodina-salama.github.io/ecommerce/`,{
    
      shippingAddress:userData                                                                 
},
{headers:this.headers}
)
}

getUserOrders():Observable<any>{
  return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${this.orderId.id}`)
}


}
