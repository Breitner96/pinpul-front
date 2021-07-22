import { Component, OnInit } from '@angular/core';
import { DIR_IMG , ANGULAR_IMG} from '../../config/config';
import { Router } from '@angular/router';
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  rootImage = DIR_IMG;
  rootNGIMg = ANGULAR_IMG;

  constructor() { }

  ngOnInit(): void {
  }

}
