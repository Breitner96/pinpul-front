import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders  } from '@angular/common/http';

import { API_URL } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  // token = localStorage.getItem('access_token');
  // url = 'http://pinpul-back.test/api';

  constructor(private http: HttpClient) {}

  getUsers(){

    const headers = new HttpHeaders({
      'Authorization':'Bearer ' + localStorage.getItem('access_token')
    });
    return this.http.get(`${API_URL}/users`,{headers: headers});
  }

  getUser(id:number){
    const headers = new HttpHeaders({
      'Authorization':'Bearer ' + localStorage.getItem('access_token')
    });
    return this.http.get(`${API_URL}/users/${id}`,{headers: headers});
  }

  createUser(data:any){
    const headers = new HttpHeaders({
      'Authorization':'Bearer ' + localStorage.getItem('access_token'),
      'Content-Type':'application/json'
    });
    return this.http.post(`${API_URL}/users`,data,{headers: headers});
  }

  updateUser(data:any){
    const headers = new HttpHeaders({
      'Authorization':'Bearer ' + localStorage.getItem('access_token'),
      'Content-Type':'application/json'
    });
    return this.http.put(`${API_URL}/users/${data.id}`, data,{headers: headers});
  }

  deleteUser(id:number){
    const headers = new HttpHeaders({
      'Authorization':'Bearer ' + localStorage.getItem('access_token')
    });
    return this.http.delete(`${API_URL}/users/${id}`,{headers: headers});
  }

}
