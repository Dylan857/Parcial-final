import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent {

  roles: any[] = []
  productId: string = '';
  
  constructor(private productService: ProductService, 
    private router: Router, private route: ActivatedRoute){}

  newProduct = new FormGroup({
    'id': new FormControl(''),
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

    this.route.params.subscribe(params => {
      this.productId = params['id'];
    });
    
    this.productService.getProduct(this.productId).subscribe(
      (response: any) => {
        console.log(response);
        this.newProduct.get("id")?.setValue(response.data[0].productId)
        this.name?.setValue(response.data[0].name)
        this.stock?.setValue(response.data[0].stock)
        this.value?.setValue(response.data[0].value)
        this.productTypeIdForm?.setValue(response.data[0].productType)
      },
      (error) => {

      }
    )
  }

  createProduct() {
    let product = this.newProduct.value
    console.log(product);
    

    this.productService.editProduct(product.id!, product).subscribe(
      response => {
          Swal.fire({
            title: 'Se edito correctamente el producto',
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
