import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  
  constructor(private productService: ProductService, private router: Router){}

  products: Product[] = [];

  ngOnInit(): void {
    this.getProduct()
  }

  getProduct() {

    this.productService.getProducts().subscribe(
      (response: any) => {
        this.products = response.data
      },
      (error) => {
        console.log(error.error);
      }
    )
  }

  goToEditProduct(productId: string) {
    this.router.navigate(['/edit-product', productId]);
  }

  deleteProduct(productId: string) {
    this.productService.deleteProduct(productId).subscribe(
      (response: any) => {
        Swal.fire({
          title: 'Se elimino correctamente el usuario',
          icon: 'success',
          timer: 3000,
          timerProgressBar: true
        });
        this.getProduct();
      })
  }
}
