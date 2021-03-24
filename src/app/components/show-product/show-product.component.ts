import { Component,Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';


@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.component.html',
  styleUrls: ['./show-product.component.css']
})
export class ShowProductComponent implements OnInit {

  @Input() products:Product[];
  productModalOpen:boolean=false;

  constructor() { }

  ngOnInit(): void {

    console.log('Produits: ',this.products)
  }

  onEdit(product):void{
    this.productModalOpen=true;
  }
  onDelete(product):void{}

  AddProduct():void{
    this.productModalOpen=true;
  }
}
