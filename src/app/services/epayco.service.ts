import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class EpaycoService {

  constructor(private _http: HttpClient) { }

  createTokenClient(data:any){

    const headers = new HttpHeaders({
      'Content-Type':'application/json'
    });
    return this._http.post(`${API_URL}/epayco-token`,data,{headers: headers});

  }


}
