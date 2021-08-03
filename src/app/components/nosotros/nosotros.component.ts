import { Component, OnInit } from '@angular/core';
import { DIR_IMG , ANGULAR_IMG} from '../../config/config';

@Component({
  selector: 'app-nosotros',
  templateUrl: './nosotros.component.html',
  styleUrls: ['./nosotros.component.css']
})
export class NosotrosComponent implements OnInit {

  rootImage = DIR_IMG;
  rootNGIMg = ANGULAR_IMG;

  constructor() { }

  ngOnInit(): void {
  }

}
