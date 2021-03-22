import { Component, OnInit } from '@angular/core';
import { Response } from 'src/app/models/response';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products;
  productSub;

  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    this.productSub = this.productService.getProduct()
      .subscribe((data:Response) => {
        this.products=data.result;
      }, () => {
        console.log('Erreur');
      })
  }

}
