import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css']
})
export class CreateBlogComponent implements OnInit {

  form:FormGroup;
  formData: FormData = new FormData();

  constructor(
    private fb:FormBuilder,
    private _blog: BlogService
  ) {
    this.createForm();
  }

  ngOnInit(): void {
  }

  createForm(){
    this.form = this.fb.group({
      title: ['',Validators.required],
      imagen: ['',Validators.required],
      content: ['',Validators.required],
    })
  }

  uploadImage($event){
    this.formData.append('imagen',<File>$event.target.files[0]);
  }

  createBlog(){

    this.formData.append('title', this.form.get('title').value );
    this.formData.append('content', this.form.get('content').value );

    this._blog.createBlog(this.formData).subscribe( data =>{
      console.log(data);
    })

  }

  

}
