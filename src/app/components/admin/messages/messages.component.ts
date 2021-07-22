import { Component, OnInit } from '@angular/core';
import { MessagesService } from 'src/app/services/messages.service';
import Swal from 'sweetalert2';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  storageProviderID = localStorage.getItem('provider_id');

  messages = [];

  constructor( 
    private _message: MessagesService
   ) {}

   ngOnInit(): void {
    this.listMessagesProviders();
  }

   listMessagesProviders(){
    this._message.getMessagesProvider(this.storageProviderID).subscribe( (data:any) =>{
      this.messages = data;
      console.log(data);
    });
   }

  
  deleteMessage(id){

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
        
        this._message.deleteMessage(id).subscribe((data:any)=>{

          this.listMessagesProviders();
          
        })
      }

    });



  }

}
