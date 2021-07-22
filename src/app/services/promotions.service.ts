import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL, token } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class PromotionsService {

  constructor(private _http: HttpClient) { }

  getPromotions(){
    const headers = new HttpHeaders({
      'Authorization':'Bearer ' + token
    });
    return this._http.get(`${API_URL}/promotions`,{headers: headers});
  }

  getPromotion(id:number){
    const headers = new HttpHeaders({
      'Authorization':'Bearer ' + token
    });
    return this._http.get(`${API_URL}/promotions/${id}`,{headers: headers});
  }

  createPromotion(data:any){
    const headers = new HttpHeaders({
      'Authorization':'Bearer ' + token,
      // 'Content-Type':'application/json'
    });
    return this._http.post(`${API_URL}/promotions`,data,{headers: headers});
  }

  updatePromotion(id:number, data:any){
    const headers = new HttpHeaders({
      'Authorization':'Bearer ' + token
      // 'Content-Type':'application/json'
    });
    return this._http.post(`${API_URL}/promotions/${id}`, data,{headers: headers});
  }

  deletePromotion(id:number){
    const headers = new HttpHeaders({
      'Authorization':'Bearer ' + token
    });
    return this._http.delete(`${API_URL}/promotions/${id}`,{headers: headers});
  }

}
