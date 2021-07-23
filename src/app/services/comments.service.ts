import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private _http: HttpClient) { }

  getComments(){
    const headers = new HttpHeaders({
      'Authorization':'Bearer ' + localStorage.getItem('access_token')
    });
    return this._http.get(`${API_URL}/comments`,{headers: headers});
  }

  getComment(id:number){
    const headers = new HttpHeaders({
      'Authorization':'Bearer ' + localStorage.getItem('access_token')
    });
    return this._http.get(`${API_URL}/comments/${id}`,{headers: headers});
  }

  createComment(data:any){
    const headers = new HttpHeaders({
      'Authorization':'Bearer ' + localStorage.getItem('access_token'),
      'Content-Type':'application/json'
    });
    return this._http.post(`${API_URL}/comments`,data,{headers: headers});
  }

  updateComment(data:any){
    const headers = new HttpHeaders({
      'Authorization':'Bearer ' + localStorage.getItem('access_token'),
      'Content-Type':'application/json'
    });
    return this._http.put(`${API_URL}/comments/${data.id}`, data,{headers: headers});
  }

  deleteComment(id:number){
    const headers = new HttpHeaders({
      'Authorization':'Bearer ' + localStorage.getItem('access_token')
    });
    return this._http.delete(`${API_URL}/comments/${id}`,{headers: headers});
  }

}
