import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class ProvidersService {

  constructor(private _http: HttpClient) {}

  getProviders(){
    const headers = new HttpHeaders({
      'Authorization':'Bearer ' + localStorage.getItem('access_token')
    });
    return this._http.get(`${API_URL}/providers`,{headers: headers});
  }

  getProvider(id:number){
    const headers = new HttpHeaders({
      'Authorization':'Bearer ' + localStorage.getItem('access_token')
    });
    return this._http.get(`${API_URL}/providers/${id}`,{headers: headers});
  }

  getProviderByState(id:number){
    const headers = new HttpHeaders({
      'Authorization':'Bearer ' + localStorage.getItem('access_token')
    });
    return this._http.get(`${API_URL}/providers-state`,{headers: headers});
  }

  getProviderBySlug(slug:string){
    const headers = new HttpHeaders({
      'Authorization':'Bearer ' + localStorage.getItem('access_token')
    });
    return this._http.get(`${API_URL}/providers-slug/${slug}`,{headers: headers});
  }

  getProviderByUser(id:any){
    const headers = new HttpHeaders({
      'Authorization':'Bearer ' + localStorage.getItem('access_token')
    });
    return this._http.get(`${API_URL}/providers-user/${id}`,{headers: headers});
  }

  getProviderByDocument(slug:string){
    const headers = new HttpHeaders({
      'Authorization':'Bearer ' + localStorage.getItem('access_token')
    });
    return this._http.get(`${API_URL}/providers-document/${slug}`,{headers: headers});
  }

  // obtenerProveedoresInteres(){
  //   const headers = new HttpHeaders({
  //     'Authorization':'Bearer ' + localStorage.getItem('access_token')
  //   });
  //   return this._http.get(`${API_URL}/providers-document`,{headers: headers});
  // }

  createProvider(data:any){
    const headers = new HttpHeaders({
      'Authorization':'Bearer ' + localStorage.getItem('access_token'),
      // 'Content-Type':'application/json'
    });
    return this._http.post(`${API_URL}/providers`,data,{headers: headers});
  }

  updateProvider(id:number, data:any){
    const headers = new HttpHeaders({
      'Authorization':'Bearer ' + localStorage.getItem('access_token')
      // 'Content-Type':'application/json'
    });
    return this._http.post(`${API_URL}/providers/${id}`, data,{headers: headers});
  }

  deleteProvider(id:number){
    const headers = new HttpHeaders({
      'Authorization':'Bearer ' + localStorage.getItem('access_token')
    });
    return this._http.delete(`${API_URL}/providers/${id}`,{headers: headers});
  }

  addView(id:number){
    const headers = new HttpHeaders({
      'Authorization':'Bearer ' + localStorage.getItem('access_token')
    });
    return this._http.post(`${API_URL}/providers-slug`, id,{headers: headers});
  }

  contadorMesGratis(data:any){
    const headers = new HttpHeaders({
      'Authorization':'Bearer ' + localStorage.getItem('access_token')
    });
    return this._http.post(`${API_URL}/contador-mes-gratis`, data,{headers: headers});
  }

  getImages(){
    
  }

  eliminarFotoGaleria(data:any){
    // const headers = new HttpHeaders({
    //   'Authorization':'Bearer ' + localStorage.getItem('access_token')
    // });
    // return this._http.get(`${API_URL}/providers-image-delete/${id}`, {headers: headers});

    const headers = new HttpHeaders({
      'Authorization':'Bearer ' + localStorage.getItem('access_token'),
      // 'Content-Type':'application/json'
    });
    return this._http.post(`${API_URL}/providers-image-delete`,data,{headers: headers});
  }

}
