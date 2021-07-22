import { Component, OnInit } from '@angular/core';
import { PunctuationService } from 'src/app/services/punctuation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-punctuation',
  templateUrl: './punctuation.component.html',
  styleUrls: ['./punctuation.component.css']
})
export class PunctuationComponent implements OnInit {

  punctuations:any=[];

  constructor(
    private _punctuation:PunctuationService) {}

  ngOnInit(): void {
    this.listpunctuations();
  }

  listpunctuations(){
    this._punctuation.getPunctuations().subscribe((data:any)=>{
      this.punctuations = data;
      console.log(this.punctuations);
    });
  }

  changeState(id){
    this._punctuation.changeStatePt(id).subscribe( (data:any) =>{
      // console.log(data);
    });
  }

  deletePunctuation(id){

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
        this._punctuation.deletePunctuation(id).subscribe((data:any)=>{

          this.listpunctuations();
    
        })
      }
    });


  }


}
