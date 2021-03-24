import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-add-or-edit-product-modal',
  templateUrl: './add-or-edit-product-modal.component.html',
  styleUrls: ['./add-or-edit-product-modal.component.css']
})
export class AddOrEditProductModalComponent implements OnInit, OnDestroy {

  @Input() product: Product;
  productForm: FormGroup;
  categories: Category[];
  categorisSub: Subscription;
  idCategory = 1;

  constructor(private fb: FormBuilder, private categoriesService: CategoriesService) {
    this.productForm = this.fb.group(
      {
        productInfos: fb.group({
          name: ['', Validators.required],
          description: ['', Validators.required],
          price: ['', Validators.required],
          stock: ['', Validators.required]
        }),
        illustration: fb.group({
          image: ['', Validators.required]
        })
      }
    );
  }

  ngOnInit(): void {
    this.categorisSub = this.categoriesService.getCategory()
      .subscribe((data) => {
        this.categories = data.result;
      }, (error) => {
        console.log('Probleme de chargemet de données!')
      }, () => {
        console.log('Chargement complet')
      })
  }

  get isProductInfoInvalid(): boolean {
    this.productForm.get('productInfos').invalid;
    return;
  }

  get isIllustrationInvalid(): boolean {
    this.productForm.get('illustration').invalid;
    return;
  }

  slectCategory(idCategory: number) {
    this.idCategory = idCategory;
  }

  ngOnDestroy(): void {
    this.categorisSub.unsubscribe();
  }
}
