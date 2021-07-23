import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class TypeDocumentsService {

  constructor(private _http: HttpClient) { }

  getTypeDocuments(){
    const headers = new HttpHeaders({
      'Authorization':'Bearer ' + localStorage.getItem('access_token')
    });
    return this._http.get(`${API_URL}/type-documents`,{headers: headers});
  }

  getTypeDocument(id:number){
    const headers = new HttpHeaders({
      'Authorization':'Bearer ' + localStorage.getItem('access_token')
    });
    return this._http.get(`${API_URL}/type-documents/${id}`,{headers: headers});
  }

  createTypeDocument(data:any){
    const headers = new HttpHeaders({
      'Authorization':'Bearer ' + localStorage.getItem('access_token'),
      'Content-Type':'application/json'
    });
    return this._http.post(`${API_URL}/type-documents`,data,{headers: headers});
  }

  updateTypeDocument(data:any){
    const headers = new HttpHeaders({
      'Authorization':'Bearer ' + localStorage.getItem('access_token'),
      'Content-Type':'application/json'
    });
    return this._http.put(`${API_URL}/type-documents/${data.id}`, data,{headers: headers});
  }

  deleteTypeDocument(id:number){
    const headers = new HttpHeaders({
      'Authorization':'Bearer ' + localStorage.getItem('access_token')
    });
    return this._http.delete(`${API_URL}/type-documents/${id}`,{headers: headers});
  }

}
