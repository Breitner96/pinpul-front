import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DIR_IMG , ANGULAR_IMG} from '../../../config/config';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  localUserName = localStorage.getItem('user_name');

  rootImage = DIR_IMG;
  rootNGIMg = ANGULAR_IMG;

  constructor(private _router:Router ) { }

  ngOnInit(): void {
  }

  logout(){
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_name');
    localStorage.removeItem('VLHAZGTXBI');
    localStorage.removeItem('SB177IRHUL');
    localStorage.removeItem('access_token');
    localStorage.removeItem('provider_id');
    this._router.navigate(['/login']);
  }
}
