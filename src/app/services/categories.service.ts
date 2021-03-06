import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { API_URL } from '../config/config';
import { Observable } from 'rxjs';
import { map, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  categories:any = [];

  constructor(private _http: HttpClient) { }

  obtenerCategorias(){
    // https://pinpul.com/site/public_html/api/categories
    // http://pinpul-back.test/api/categories
    fetch('http://pinpul-back.test/api/categories').then( resp => {
      console.log( resp.json );
      return resp.json
      // this.categories = resp.json;
    });
    // return this.categories;
  }

  getCategories(){
    const headers = new HttpHeaders({
      'Authorization':'Bearer ' + localStorage.getItem('access_token')
    });
    return this._http.get('http://pinpul-back.test/api/categories',{headers: headers});
  }

  getCategory(id:number){
    const headers = new HttpHeaders({
      'Authorization':'Bearer ' + localStorage.getItem('access_token')
    });
    return this._http.get(`${API_URL}/categories/${id}`,{headers: headers});
  }

  getCategoryBySlug(name:string){
    const headers = new HttpHeaders({
      'Authorization':'Bearer ' + localStorage.getItem('access_token')
    });
    return this._http.get(`${API_URL}/categories-slug/${name}`,{headers: headers});
  }

  createCategory(data:any){
    const headers = new HttpHeaders({
      'Authorization':'Bearer ' + localStorage.getItem('access_token'),
    });
    return this._http.post(`${API_URL}/categories`,data,{headers: headers});
  }

  updateCategory(id:number, data:any){
    const headers = new HttpHeaders({
      'Authorization':'Bearer ' + localStorage.getItem('access_token')
    });
    return this._http.post(`${API_URL}/categories/${id}`, data,{headers: headers});
  }

  deleteCategory(id:number){
    const headers = new HttpHeaders({
      'Authorization':'Bearer ' + localStorage.getItem('access_token')
    });
    return this._http.delete(`${API_URL}/categories/${id}`,{headers: headers});
  }

}
