import { Component, OnInit } from '@angular/core';
import { DIR_IMG , ANGULAR_IMG} from '../../config/config';
import { Router } from '@angular/router';
@Component({
  selector: 'app-vista-blog',
  templateUrl: './vista-blog.component.html',
  styleUrls: ['./vista-blog.component.css']
})
export class VistaBlogComponent implements OnInit {
  rootImage = DIR_IMG;
  rootNGIMg = ANGULAR_IMG;
  constructor() { }

  ngOnInit(): void {
  }

}
