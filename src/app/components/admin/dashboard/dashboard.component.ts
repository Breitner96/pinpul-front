import { Component, OnInit } from '@angular/core';
import { GoogleChartComponent } from 'angular-google-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  title:any = 'Categorías  Populares';  
  type:any = 'PieChart';  
  data2:any = [  
     ['Categoria 1', 5.0],  
     ['Categoria 2', 36.8],  
     ['Categoria 3', 42.8],  
     ['Categoria 4', 18.5],  
     ['Categoria 5', 16.2]  
  ];
  data:any = []
  columnNames:any = ['Name', 'Percentage'];  
  options:any = {   colors: ['#22a6b3', '#eb4d4b', '#f0932b', '#6ab04c', '#686de0'], is3D: true};
  width:any = 500;  
  height:any = 300; 
  

  constructor() { }

  ngOnInit(): void {
  }



}
