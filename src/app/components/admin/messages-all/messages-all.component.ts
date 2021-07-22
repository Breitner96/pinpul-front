import { Component, OnInit } from '@angular/core';
import { MessagesService } from 'src/app/services/messages.service';
import Swal from 'sweetalert2';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-messages-all',
  templateUrl: './messages-all.component.html',
  styleUrls: ['./messages-all.component.css']
})
export class MessagesAllComponent implements OnInit {

  messages:any=[];
  form: FormGroup;
  can:boolean = true;
  infoBeforeSendMessage:any = [];

  constructor(
    private _messages:MessagesService,
    private fb:FormBuilder
  ) { 
    
  }

  ngOnInit(): void {
    this.listmessages();
    this.createForm();
  }

  catchId(id){
    // this._messages.getMessage(id).subscribe( (data:any) =>{
      // this.form.reset({
      //   usuario: this.messages.user.name
      // });
      // this.form.reset({
      //   asunto: data.asunto
      // });
    // });
  }

  createForm(){
    this.form = this.fb.group({
      id: '',
      provider_id: '',
      asunto: '',
      company: '',
      email: '',
      tel: '',
    });
  }


  listmessages(){

    if( localStorage.getItem('VLHAZGTXBI') == 'gerencia'){
      this._messages.getMessages().subscribe((data:any)=>{
        this.messages = data;
        console.log(data);
      });
    } else {
      this.can = false;
      this._messages.getMessagesProvider( parseInt(localStorage.getItem('provider_id') )  ).subscribe((data:any)=>{
        this.messages = data;
        console.log(data);
      });
    }

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
        
        this._messages.deleteMessage(id).subscribe((data:any)=>{
          this.listmessages();
        });
      }

    });

  }

  enviarMensaje(id:number = 0){
    this._messages.getGerenciaToProvider(id).subscribe( (data:any) =>{
      console.log(data);
      this.form.reset({
        id: data[0].id,
        provider_id: data[0].provider_id,
        asunto: data[0].asunto,
        company: data[0].company,
        email: data[0].email,
        tel: data[0].phone,
      });
    });

    var element = document.querySelector("#container__mensaje");
    var element2 = document.querySelector("#over2");
    element.classList.toggle("hidden2");
    element2.classList.toggle("hidden2");

    if(id == 0){ console.log(); }


    
  }

  enviarProvedorFree(){
    console.log(this.form.value);
    this._messages.sendGerenciaToProvider(this.form.value).subscribe( (data:any) =>{
      console.log(data);
    });
  }

}
