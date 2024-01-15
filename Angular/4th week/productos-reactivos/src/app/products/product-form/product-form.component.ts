import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../interfaces/product';
import { ProductsService } from '../services/products.service';
import { Router } from '@angular/router';
import { CanComponentDeactivate } from '../interfaces/can-component-deactivate';

@Component({
  selector: 'product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent implements CanComponentDeactivate{
  @Output() add = new EventEmitter<Product>();
  #productsService = inject(ProductsService);
  #router = inject(Router);
  saved: boolean = false;
  fileName!: string;
  #fb = inject(NonNullableFormBuilder);

  productForm = this.#fb.group({
    description: ['', [Validators.required, Validators.minLength(5)]],
    price: [0, [Validators.required, Validators.min(0.1)]],
    available: ['', [Validators.required]],
    imageUrl: ['', [Validators.required]],
  });

  imageBase64: string = '';
  
  canDeactivate() {
    return this.saved || confirm('Do you want to leave this page?. Changes can be lost');
  }

  changeImage(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (!fileInput.files || fileInput.files.length === 0) return;
    const reader = new FileReader();
    reader.readAsDataURL(fileInput.files[0]);
    reader.addEventListener('loadend', (e) => {
      this.imageBase64 = reader.result as string;
    });
  }

  addProduct() {
    const product: Product = {
      ...this.productForm.getRawValue(),
      rating: 1,
      imageUrl: this.imageBase64,
    };
    this.#productsService.addProduct(product).subscribe(() => {
      this.saved = true;
      this.#router.navigate(['/products']);
    });
  }
  resetForm() {
    this.productForm.reset();
  }
  validClasses(formControl: FormControl, validClass: string, errorClass: string) {
    return {
      [validClass]: formControl.touched && formControl.valid,
      [errorClass]: formControl.touched && formControl.invalid,
    };
  }
}
