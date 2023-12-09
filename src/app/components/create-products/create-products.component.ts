import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-products',
  templateUrl: './create-products.component.html',
  styleUrls: ['./create-products.component.css']
})
export class CreateProductsComponent {

  constructor(private productService: ProductService, private router: Router){}

  roles: any[] = []
  
  

  newProduct = new FormGroup({
    'name': new FormControl('', [Validators.required]),
    'stock': new FormControl('', [Validators.required]),
    'value': new FormControl('', [Validators.required]),
    'productTypeId': new FormControl('', [Validators.required]),
  });

  get name () {
    return this.newProduct.get("name")
  }

  get stock () {
    return this.newProduct.get("stock")
  }

  get value () {
    return this.newProduct.get("value")
  }

  get productTypeIdForm () {
    return this.newProduct.get("productTypeId")
  }

  ngOnInit(): void {
    this.productService.getProductsTypes().subscribe(
      (response: any) => {
        this.roles = response.data
        console.log(this.roles);
        
      }
    )
  }

  createProduct() {
    let product = this.newProduct.value
    console.log(product);

    this.productService.createProduct(product).subscribe(
      response => {
          Swal.fire({
            title: 'Se creo correctamente el producto',
            icon: 'success',
            timer: 3000,
            timerProgressBar: true
          });
          this.router.navigate(['/products']);
        },
      error => {
        Swal.fire({
          title: error.error.message,
          icon: 'error',
        });
      }
    )
  }
}
