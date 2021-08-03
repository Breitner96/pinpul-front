import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-list-blog',
  templateUrl: './list-blog.component.html',
  styleUrls: ['./list-blog.component.css']
})
export class ListBlogComponent implements OnInit {

  articles:any = [];

  constructor(
    private blogs: BlogService
  ) { }

  ngOnInit(): void {
    this.blogs.getBlogs().subscribe( (data:any) =>{
      this.articles = data;
    })
  }

}
