import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { API_URL, token } from '../config/config';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private _http: HttpClient) { }

  getCategories(){
    const headers = new HttpHeaders({
      'Authorization':'Bearer ' + token
    });
    return this._http.get(`${API_URL}/categories`,{headers: headers});
  }

  getCategory(id:number){
    const headers = new HttpHeaders({
      'Authorization':'Bearer ' + token
    });
    return this._http.get(`${API_URL}/categories/${id}`,{headers: headers});
  }

  getCategoryBySlug(name:string){
    const headers = new HttpHeaders({
      'Authorization':'Bearer ' + token
    });
    return this._http.get(`${API_URL}/categories-slug/${name}`,{headers: headers});
  }

  createCategory(data:any){
    const headers = new HttpHeaders({
      'Authorization':'Bearer ' + token,
    });
    return this._http.post(`${API_URL}/categories`,data,{headers: headers});
  }

  updateCategory(id:number, data:any){
    const headers = new HttpHeaders({
      'Authorization':'Bearer ' + token
    });
    return this._http.post(`${API_URL}/categories/${id}`, data,{headers: headers});
  }

  deleteCategory(id:number){
    const headers = new HttpHeaders({
      'Authorization':'Bearer ' + token
    });
    return this._http.delete(`${API_URL}/categories/${id}`,{headers: headers});
  }

}
