import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CommentsService } from 'src/app/services/comments.service';
import { UsersService } from 'src/app/services/users.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.css']
})
export class EditCommentComponent implements OnInit {

  form: FormGroup;
  id:number;
  commentID:any = []
  users:any = [];

  constructor(private _comments:CommentsService, private _users:UsersService, private fb:FormBuilder,private rutaActiva: ActivatedRoute, private _router:Router) { 

    this._users.getUsers().subscribe( (data:any) =>{
      this.users = data;
      console.log(data);
    })

    this.id = this.rutaActiva.snapshot.params['id'];

    this._comments.getComment(this.id).subscribe( (data:any) =>{
      this.commentID = data;
      console.log( this.commentID);

      this.form.reset({
        id: this.commentID.id,
        user_id: this.commentID.user_id,
        comment: this.commentID.comment
      });

    })

    this.createForm();

  }

  ngOnInit(): void {
  }

  
  get userValidate(){ return this.form.get('user_id').invalid && this.form.get('user_id').touched }
  get commentValidate(){ return this.form.get('comment').invalid && this.form.get('comment').touched }

  createForm(){
    this.form = this.fb.group({
      id:'',
      user_id: ['',Validators.required],
      comment: ['',Validators.required]
    })
  }

  updatecomment(){

    if( this.form.invalid ){
      return Object.values( this.form.controls ).forEach( control => {
        control.markAsTouched();  
      });
    }

    let data = this.form.value;
    this._comments.updateComment(data).subscribe( (data:any) =>{
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
