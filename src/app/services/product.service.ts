import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  private apiUrl = 'http://127.0.0.1:8080/product/';
  private apiUrlProductsTypes = 'http://127.0.0.1:8080/product_type/';

  getProducts(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.apiUrl + 'get_products');
  }

  createProduct(product: any): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl + 'create_product', product)
  }

  editProduct(productId: string, product: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.put<any>(this.apiUrl + 'edit_product/' + productId, product, {headers})
  }

  deleteProduct(productId:string): Observable<any> {
    return this.httpClient.delete<any>(this.apiUrl + 'delete_product/' + productId)
  }

  getProductsTypes(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.apiUrlProductsTypes + 'get_product_type');
  }
}
