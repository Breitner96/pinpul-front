import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class PlansService {

  constructor(private _http: HttpClient) {}

  getPlans(){
    const headers = new HttpHeaders({
      'Authorization':'Bearer ' + localStorage.getItem('access_token')
    });
    return this._http.get(`${API_URL}/plans`,{headers: headers});
  }

  getPlan(id:number){
    const headers = new HttpHeaders({
      'Authorization':'Bearer ' + localStorage.getItem('access_token')
    });
    return this._http.get(`${API_URL}/plans/${id}`,{headers: headers});
  }

  createPlan(data:any){
    const headers = new HttpHeaders({
      'Authorization':'Bearer ' + localStorage.getItem('access_token'),
      'Content-Type':'application/json'
    });
    return this._http.post(`${API_URL}/plans`,data,{headers: headers});
  }

  updatePlan(data:any){
    const headers = new HttpHeaders({
      'Authorization':'Bearer ' + localStorage.getItem('access_token'),
      'Content-Type':'application/json'
    });
    return this._http.put(`${API_URL}/plans/${data.id}`, data,{headers: headers});
  }

  deletePlan(id:number){
    const headers = new HttpHeaders({
      'Authorization':'Bearer ' + localStorage.getItem('access_token')
    });
    return this._http.delete(`${API_URL}/plans/${id}`,{headers: headers});
  }

}
