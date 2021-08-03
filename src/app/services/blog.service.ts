import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { API_URL } from '../config/config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  blogs:any = [];
  ENDPOINT = 'http://pinpul-back.test/api';

  constructor(private _http: HttpClient) { }

  getBlogs():Observable<any>{
    const headers = new HttpHeaders({
      'Authorization':'Bearer ' + localStorage.getItem('access_token')
    });
    return this._http.get(`${this.ENDPOINT}/blogs`,{headers: headers});
  }

  getBlog(id:number){
    const headers = new HttpHeaders({
      'Authorization':'Bearer ' + localStorage.getItem('access_token')
    });
    return this._http.get(`${this.ENDPOINT}/blogs/${id}`,{headers: headers});
  }

  getBlogsBySlug(name:string){
    const headers = new HttpHeaders({
      'Authorization':'Bearer ' + localStorage.getItem('access_token')
    });
    return this._http.get(`${this.ENDPOINT}/blog-slug/${name}`,{headers: headers});
  }

  createBlog(data:any){
    const headers = new HttpHeaders({
      'Authorization':'Bearer ' + localStorage.getItem('access_token'),
    });
    return this._http.post(`${this.ENDPOINT}/blogs`,data,{headers: headers});
  }

  updateBlog(id:number, data:any){
    const headers = new HttpHeaders({
      'Authorization':'Bearer ' + localStorage.getItem('access_token')
    });
    return this._http.post(`${this.ENDPOINT}/blogs/${id}`, data,{headers: headers});
  }

  deleteBlog(id:number){
    const headers = new HttpHeaders({
      'Authorization':'Bearer ' + localStorage.getItem('access_token')
    });
    return this._http.delete(`${this.ENDPOINT}/blogs/${id}`,{headers: headers});
  }

}
