import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { CommentsService } from 'src/app/services/comments.service';
import { UsersService } from 'src/app/services/users.service';
import { Router, ActivatedRoute } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {

  
  users:any = [];
  form: FormGroup;

  constructor(private _comments:CommentsService, private _users:UsersService, private fb:FormBuilder, private _router: Router
    ) { 

    this._users.getUsers().subscribe( (data:any) =>{
      this.users = data;
      console.log(data);
    })

    this.createForm();

  }

  ngOnInit(): void {
  }

  get userValidate(){ return this.form.get('user_id').invalid && this.form.get('user_id').touched }
  get commentValidate(){ return this.form.get('comment').invalid && this.form.get('comment').touched }

  createForm(){
    this.form = this.fb.group({
      user_id: ['',Validators.required],
      comment: ['',Validators.required]
    })
  }

  addcomment(){

    if( this.form.invalid ){
      return Object.values( this.form.controls ).forEach( control => {
        control.markAsTouched();  
      });
    }

    let data = this.form.value;
    this._comments.createComment(data).subscribe( (data:any) =>{
      if(data){
        Swal.fire({
          title: `${data.messages}`,
          icon: 'success',
          confirmButtonText: 'Cerrar'
        });
      }
      this._router.navigate(['/admin/comentarios']);
      console.log(data);
    })
  
  }

}
