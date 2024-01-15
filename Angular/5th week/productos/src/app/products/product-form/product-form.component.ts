import { Component, EventEmitter, Output, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { Product } from '../interfaces/product';
import { ProductsService } from '../services/products.service';
import { Router } from '@angular/router';
import { CanComponentDeactivate } from '../interfaces/can-component-deactivate';
import { MinDateDirective } from '../../validators/min-date.directive';
import { ConfirmModalComponent } from '../../modals/confirm-modal/confirm-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'product-form',
  standalone: true,
  imports: [CommonModule, FormsModule, MinDateDirective],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent implements CanComponentDeactivate{

  @Output() add = new EventEmitter<Product>();
  #productsService = inject(ProductsService);
  #router = inject(Router);
  saved: boolean = false;
  newProduct!: Product;
  fileName!: string;
  #modalService = inject(NgbModal);
  @ViewChild('addForm') addForm!: NgForm;
  canDeactivate() {
    if (this.saved || this.addForm.pristine) {
      return true;
    }
    const modalRef = this.#modalService.open(ConfirmModalComponent);
    modalRef.componentInstance.title = 'Changes not saved';
    modalRef.componentInstance.body = 'Do you want to leave the page?';
    return modalRef.result.catch(() => false);
  }

  constructor() {
    this.resetProduct();
  }

  changeImage(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (!fileInput.files || fileInput.files.length === 0) return;
    const reader = new FileReader();
    reader.readAsDataURL(fileInput.files[0]);
    reader.addEventListener('loadend', (e) => {
      this.newProduct.imageUrl = reader.result as string;
    });
  }

  addProduct() {
    if(this.addForm.valid) {
      this.#productsService.addProduct(this.newProduct).subscribe((p) => {
        this.saved = true;
        this.#router.navigate(['/products']);
      });
    }
  }

  private resetProduct() {
    this.newProduct = {
      description: '',
      available: '',
      imageUrl: '',
      rating: 1,
      price: 0
    };
    this.fileName = '';
  }
  validClasses(ngModel: NgModel, validClass: string, errorClass: string) {
    return {
      [validClass]: ngModel.touched && ngModel.valid,
      [errorClass]: ngModel.touched && ngModel.invalid
    };
  }
}
