import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL, token } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class RatingsService {

  constructor(private _http: HttpClient) { }

  getRatings(){
    const headers = new HttpHeaders({
      'Authorization':'Bearer ' + token
    });
    return this._http.get(`${API_URL}/ratings`,{headers: headers});
  }

  getRating(id:number){
    const headers = new HttpHeaders({
      'Authorization':'Bearer ' + token
    });
    return this._http.get(`${API_URL}/ratings/${id}`,{headers: headers});
  }

  createRating(data:any){
    const headers = new HttpHeaders({
      'Authorization':'Bearer ' + token,
      'Content-Type':'application/json'
    });
    return this._http.post(`${API_URL}/ratings`,data,{headers: headers});
  }

  updateRating(id:number){
    const headers = new HttpHeaders({
      'Authorization':'Bearer ' + token,
      'Content-Type':'application/json'
    });
    return this._http.put(`${API_URL}/ratings/${id}`, id,{headers: headers});
  }

  deleteRating(id:number){
    const headers = new HttpHeaders({
      'Authorization':'Bearer ' + token
    });
    return this._http.delete(`${API_URL}/ratings/${id}`,{headers: headers});
  }

}
