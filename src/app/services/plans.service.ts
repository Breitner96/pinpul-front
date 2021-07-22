import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL, token } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class PlansService {

  constructor(private _http: HttpClient) {}

  getPlans(){
    const headers = new HttpHeaders({
      'Authorization':'Bearer ' + token
    });
    return this._http.get(`${API_URL}/plans`,{headers: headers});
  }

  getPlan(id:number){
    const headers = new HttpHeaders({
      'Authorization':'Bearer ' + token
    });
    return this._http.get(`${API_URL}/plans/${id}`,{headers: headers});
  }

  createPlan(data:any){
    const headers = new HttpHeaders({
      'Authorization':'Bearer ' + token,
      'Content-Type':'application/json'
    });
    return this._http.post(`${API_URL}/plans`,data,{headers: headers});
  }

  updatePlan(data:any){
    const headers = new HttpHeaders({
      'Authorization':'Bearer ' + token,
      'Content-Type':'application/json'
    });
    return this._http.put(`${API_URL}/plans/${data.id}`, data,{headers: headers});
  }

  deletePlan(id:number){
    const headers = new HttpHeaders({
      'Authorization':'Bearer ' + token
    });
    return this._http.delete(`${API_URL}/plans/${id}`,{headers: headers});
  }

}
