import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class EmailsService {

  constructor(private _http: HttpClient) { }

  contactPinpul(data:any){
    const headers = new HttpHeaders({
      'Content-Type':'application/json'
    });
    return this._http.post(`${API_URL}/send-email-pinpul`,data,{headers: headers});
  }
  contactProvider(data:any){
    const headers = new HttpHeaders({
      'Content-Type':'application/json'
    });
    return this._http.post(`${API_URL}/send-email-provider`,data,{headers: headers});
  }

}
