import { Component } from '@angular/core';
import { UsersService } from './services/users.service';
import { GoogleChartComponent } from 'angular-google-charts'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pinpul-front';

  // token:any = localStorage.getItem('access_token');

  // constructor(){
  //   if( this.token ){
  //     setTimeout( function(){
  //       localStorage.removeItem('access_token');
  //       console.log('Expiró el token');
  //     }, 10000); // 1 hora = 3600000
  //   }
  // }

}
