import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ComponentesModule } from 'src/app/componentes/componentes.module';

interface Alumno {
  name: string;
  beca: boolean; 
}
@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.page.html',
  styleUrls: ['./checkbox.page.scss'],
  imports: [IonicModule, CommonModule, RouterModule, ComponentesModule],
})
export class CheckboxPage implements OnInit {
  constructor() { }
  ngOnInit() {
  }
  infoNombres: Alumno[] = [
    {
    name: 'Hector',
    beca: true
    },
    {
    name: 'Carlo',
    beca: false
    },
    {
    name: 'Lola',
    beca: true
    },
    {
    name: 'Mano',
    beca: false
    }
    ,
    {
    name: 'David',
    beca: false
    }
  ]
}