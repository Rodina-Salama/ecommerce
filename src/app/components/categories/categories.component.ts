import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/interfaces/product';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  constructor(private _EcomdataService:EcomdataService){}


  categoryData:any[]=[];

  ngOnInit(): void {
   this._EcomdataService.getAllCategories().subscribe({
    next:(response)=>{
      console.log(response);
      
      this.categoryData=response.data;
    }
   })
  }

}
