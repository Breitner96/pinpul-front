import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  options: any;

  constructor(private http: HttpClient) {
    this.options = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      })
    };
  }

  signIn(credenciales:any) {
    const headers = new HttpHeaders( {'Content-Type':'application/json'} );
    return this.http.post(`${API_URL}/login`,credenciales,{headers: headers});
  }

  singUp(data:any){
    const headers = new HttpHeaders( {'Content-Type':'application/json'} );
    return this.http.post(`${API_URL}/register`,data,{headers: headers});
  }

  logout() {
    localStorage.removeItem('access_token');
  }

}
