import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  private apiUrl = 'http://127.0.0.1:8080/user/';

  getUsers(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.apiUrl + 'get_users');
  }

  deleteUser(userId:string): Observable<any> {
    return this.httpClient.delete<any>(this.apiUrl + 'delete_user/' + userId)
  }

  getCountries(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.apiUrl + 'get_countries')
  }

  getCities(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.apiUrl + 'get_cities')
  }

  getRoles(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.apiUrl + 'get_roles')
  }

  getUser(userId: string): Observable<any[]> {
    return this.httpClient.get<any[]>(this.apiUrl + 'get_user/' + userId);
  }

  editUser(userId: string, editUser: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.put<any>(this.apiUrl + 'edit_user/' + userId, editUser, {headers})
  }
}
