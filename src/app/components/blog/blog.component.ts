import { Component, OnInit } from '@angular/core';
import { DIR_IMG , ANGULAR_IMG} from '../../config/config';
import { Router } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  rootImage = DIR_IMG;
  rootNGIMg = ANGULAR_IMG;
  articles:any = [];

  constructor(
    private _blog: BlogService
  ) { }

  ngOnInit(){
    this._blog.getBlogs().subscribe( data =>{
      this.articles = data;
    });
  }

}
