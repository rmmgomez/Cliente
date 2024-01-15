import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../interfaces/product';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'products-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.css'
})
export class ProductsPageComponent {
  title = "My product's list";
  headers = {description: 'Product', price: 'Price', available: 'Available'};
  products: Product[] = [{
    id: 1,
    description: 'SSD hard drive',
    available: '2016-10-03',
    price: 75,
    imageUrl: 'assets/dinosaur.jpg',
    rating: 5
  },{
    id: 2,
    description: 'LGA1151 Motherboard',
    available: '2016-09-15',
    price: 96.95,
    imageUrl: 'assets/hand.jpg',
    rating: 4
  },{
    id: 3,
    description: 'Chicken',
    available: '2023-10-15',
    price: 10,
    imageUrl: 'assets/chicken.jpg',
    rating: 2
  }];
  showImage = true;

  newProduct!: Product;
  fileName!: string;

  constructor() {
    this.resetForm();
  }

  toggleImage() {
    this.showImage = !this.showImage;
  }

  changeImage(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (!fileInput.files || fileInput.files.length === 0) return;
    const reader = new FileReader();
    reader.readAsDataURL(fileInput.files[0]);
    reader.addEventListener('loadend', () => {
      this.newProduct.imageUrl = reader.result as string;
    });
  }

  addProduct() {
    this.newProduct.id = Math.max(...this.products.map(p => p.id!)) + 1;
    this.products.push(this.newProduct);
    this.resetForm();
  }

  resetForm() {
    this.newProduct = {
      description: '',
      price: 0,
      available: '',
      imageUrl: '',
      rating: 0
    }
    this.fileName = '';
  }
}
