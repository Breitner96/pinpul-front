import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private _http: HttpClient) { }

  getMessages(){
    const headers = new HttpHeaders({
      'Authorization':'Bearer ' + localStorage.getItem('access_token')
    });
    return this._http.get(`${API_URL}/messages`,{headers: headers});
  }

  getMessagesProvider(id:any){
    const headers = new HttpHeaders({
      'Authorization':'Bearer ' + localStorage.getItem('access_token')
    });
    return this._http.get(`${API_URL}/messages-providers/${id}`,{headers: headers});
  }

  getMessage(id:any){
    const headers = new HttpHeaders({
      'Authorization':'Bearer ' + localStorage.getItem('access_token')
    });
    return this._http.get(`${API_URL}/messages/${id}`,{headers: headers});
  }

  deleteMessage(id:number){
    const headers = new HttpHeaders({
      'Authorization':'Bearer ' + localStorage.getItem('access_token')
    });
    return this._http.delete(`${API_URL}/messages/${id}`,{headers: headers});
  }

  getGerenciaToProvider(id:any){
    const headers = new HttpHeaders({
      'Authorization':'Bearer ' + localStorage.getItem('access_token')
    });
    return this._http.get(`${API_URL}/get-gerencia-to-provider/${id}`,{headers: headers});
  }

  sendGerenciaToProvider(data){
    const headers = new HttpHeaders({
      'Authorization':'Bearer ' + localStorage.getItem('access_token'),
      'Content-Type':'application/json'
    });
    return this._http.post(`${API_URL}/send-gerencia-to-provider`,data,{headers: headers});

    // const headers = new HttpHeaders({
    //   'Authorization':'Bearer ' + localStorage.getItem('access_token'),
    //   'Content-Type':'application/json'
    // });
    // return this._http.put(`${API_URL}/send-gerencia-to-provider/${data.id}`, data,{headers: headers});

  }

}
