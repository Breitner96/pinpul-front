import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL, token } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class PunctuationService {

  constructor(private _http: HttpClient) { }

  getPunctuations(){
    const headers = new HttpHeaders({
      'Authorization':'Bearer ' + token
    });
    return this._http.get(`${API_URL}/punctuations`,{headers: headers});
  }

  getPunctuation(id:number){
    const headers = new HttpHeaders({
      'Authorization':'Bearer ' + token
    });
    return this._http.get(`${API_URL}/punctuations/${id}`,{headers: headers});
  }

  createPunctuation(data:any){
    const headers = new HttpHeaders({
      'Authorization':'Bearer ' + token,
      'Content-Type':'application/json'
    });
    return this._http.post(`${API_URL}/punctuations`,data,{headers: headers});
  }

  updatePunctuation(data:any){
    const headers = new HttpHeaders({
      'Authorization':'Bearer ' + token,
      'Content-Type':'application/json'
    });
    return this._http.put(`${API_URL}/punctuations/${data.id}`, data,{headers: headers});
  }

  deletePunctuation(id:number){
    const headers = new HttpHeaders({
      'Authorization':'Bearer ' + token
    });
    return this._http.delete(`${API_URL}/punctuations/${id}`,{headers: headers});
  }

  changeStatePt(id:any){
    const headers = new HttpHeaders({
      'Authorization':'Bearer ' + token,
      'Content-Type':'application/json'
    });
    return this._http.post(`${API_URL}/punctuations-state`,id,{headers: headers});
  }


}
