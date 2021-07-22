import { Component, OnInit } from '@angular/core';
import { CommentsService } from 'src/app/services/comments.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  comments:any=[];

  constructor(private _commnets:CommentsService) { 

    this.listComments();

  }

  listComments(){
    this._commnets.getComments().subscribe((data:any)=>{
      this.comments = data;
      console.log(this.comments);
    });
  }

  ngOnInit(): void {
  }

  deletecomment(id){

    Swal.fire({
      title: '¿Estás seguro?',
      text: "Si lo eliminas perderás toda la información",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, estoy seguro'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title:'Se ha eliminado la categoria',
          icon: 'success',
          confirmButtonText: 'Cerrar'
        });
        this._commnets.deleteComment(id).subscribe((data:any)=>{

          this.listComments();
    
        })
      }
    });


  }

}
