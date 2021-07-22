import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

	show:boolean = true;
	show2:boolean = false;
	name:any;

	public currentNumber: number = 1;
	public example: any = null;
	public images: string[] = [
		'/assets/img/at_01.jpg',
		'/assets/img/p1.jpg',
		'/assets/img/at_02.jpg',
		'/assets/img/at_03.jpg',
		'/assets/img/at_04.jpg',
		'/assets/img/rm_01.jpg',
		'/assets/img/rm_02.jpg',
		'/assets/img/rm_03.jpg',
		'/assets/img/rm_04.jpg',
	];

	public examples: any[] = [
		{
			title: 'Simple use',
			html: '<slider-carousel [images]="example.images"></slider-carousel>'
		},
		{
			title: 'With auto-size',
			html: '<slider-carousel [images]="example.images" [auto-size]="true"></slider-carousel>'
		},
		{
			title: 'With auto-size and max-width',
			html: '<slider-carousel [images]="example.images" [auto-size]="true" max-width="500px"></slider-carousel>'
		},
		{
			title: 'With fixed height and max-width',
			html: '<slider-carousel [images]="example.images" height="350px" max-width="600px"></slider-carousel>'
		}
	];


  	constructor(private _activateR: ActivatedRoute) {
		// this.selectExample(1);
		this.name = this._activateR.snapshot.params['nombre'];
	}


  	ngOnInit(): void {}
	
	info(){
		console.log('Click en info');
		this.show = true;
		this.show2 = false;
		console.log(this.show)
		console.log(this.show2)
		let info:any= document.getElementById('info');
		let contacto:any = document.getElementById('contacto');
		let tab:any =document.getElementById('tab');
		tab.setAttribute("style", "border-bottom: none;");
		info.setAttribute("style", "background:white;");
		contacto.setAttribute("style", "background:#ccc;");
		// info.addClass("active");
		// contacto.removeClass("active");
	}
 
  contacto(){
	console.log('Click en contacto');
	this.show = false;
	this.show2 = true;
	console.log(this.show)
	console.log(this.show2)
	let info:any= document.getElementById('info');
	let contacto:any = document.getElementById('contacto');
	let tab:any =document.getElementById('tab');
	tab.setAttribute("style", "border-bottom: none;");
	info.setAttribute("style", "background:#ccc;");
	contacto.setAttribute("style", "background:white;");
	// contacto.addClass("active");
	// info.removeClass("active");
  }

  mostrar(){
    
    console.log('click categoria');
    let cat_lista:any = document.getElementById('categoria_lista');
    cat_lista.setAttribute("style", "display:inline-block;");
    
  }
  cerrar(){
    console.log('click cerrar categoria');
    let cat_lista:any = document.getElementById('categoria_lista');
    cat_lista.setAttribute("style", "display:none;");
  }


}
// let info:any = document.getElementById('contacto')?.addEventListener('click',()=>{
// 	let tagContacto:any = document.getElementById('contentContacto');
// 	let tagInfo:any = document.getElementById('contenInfo');
// 	tagInfo.style.display = "none";
// 	tagContacto.style.display = "block";
	
// })

// function openCity(evt:any, cityName:any):any {
// 	// Declare all variables
// 	let i:number;
// 	let tabcontent:any;
// 	let tablinks:any;
  
// 	// Get all elements with class="tabcontent" and hide them
// 	tabcontent = document.getElementsByClassName("tabcontent");
// 	for (i = 0; i < tabcontent.length; i++) {
// 	  tabcontent[i].style.display = "none";
// 	}
  
// 	// Get all elements with class="tablinks" and remove the class "active"
// 	tablinks = document.getElementsByClassName("tablinks");
// 	for (i = 0; i < tablinks.length; i++) {
// 	  tablinks[i].className = tablinks[i].className.replace(" active", "");
// 	}
  
// 	// Show the current tab, and add an "active" class to the button that opened the tab
// 	let city:any= document.getElementById('cityName');
// 	city.style.display = "block";
// 	evt.currentTarget.className += " active";
//   }

//   let tag:any = document.getElementsByClassName('tablinks');
//   tag.addEventListener('click', openCity);
