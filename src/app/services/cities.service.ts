import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  constructor(private _http: HttpClient) { }

  getCities(){
    const headers = new HttpHeaders({
      'Authorization':'Bearer ' + localStorage.getItem('access_token')
    });
    return this._http.get(`${API_URL}/cities`,{headers: headers});
  }

  getCity(id:number){
    const headers = new HttpHeaders({
      'Authorization':'Bearer ' + localStorage.getItem('access_token')
    });
    return this._http.get(`${API_URL}/cities/${id}`,{headers: headers});
  }

  createCity(data:any){
    const headers = new HttpHeaders({
      'Authorization':'Bearer ' + localStorage.getItem('access_token'),
      'Content-Type':'application/json'
    });
    return this._http.post(`${API_URL}/cities`,data,{headers: headers});
  }

  updateCity(data:any){
    const headers = new HttpHeaders({
      'Authorization':'Bearer ' + localStorage.getItem('access_token'),
      'Content-Type':'application/json'
    });
    return this._http.put(`${API_URL}/cities/${data.id}`, data,{headers: headers});
  }

  deleteCity(id:number){
    const headers = new HttpHeaders({
      'Authorization':'Bearer ' + localStorage.getItem('access_token')
    });
    return this._http.delete(`${API_URL}/cities/${id}`,{headers: headers});
  }

}
