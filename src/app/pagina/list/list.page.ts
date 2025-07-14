import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ComponentesModule } from 'src/app/componentes/componentes.module';

interface Alumno {
  nombre: string;
  matricula: string;
  correo: string;
  foto: string; // nombre del archivo con extensión
}


@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
  imports: [IonicModule, CommonModule, RouterModule, ComponentesModule],
})
export class ListPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

   alumnos: Alumno[] = [
    {
      nombre: 'Max',
      matricula: '202200009',
      correo: '202200009@uprr.edu.mx',
      foto: '202200009.JPG'
    },
    {
      nombre: 'Roberto',
      matricula: '202200014',
      correo: '202200014@uprr.edu.mx',
      foto: '202200014.JPG'
    },
    {
      nombre: 'Juan',
      matricula: '202200016',
      correo: '202200016@uprr.edu.mx',
      foto: '202200016.JPG'
    },
    {
      nombre: 'Josue',
      matricula: '202200017',
      correo: '202200017@uprr.edu.mx',
      foto: '202200017.JPG'
    },
    {
      nombre: 'Yareli',
      matricula: '202200019',
      correo: '202200019@uprr.edu.mx',
      foto: '202200019.JPG'
    },
    {
      nombre: 'Hector',
      matricula: '202200021',
      correo: '202200021@uprr.edu.mx',
      foto: '202200021.JPG'
    },
    {
      nombre: 'Selene',
      matricula: '202200033',
      correo: '202200033@uprr.edu.mx',
      foto: '202200033.JPG'
    },
    {
      nombre: 'Aaron',
      matricula: '202200050',
      correo: '202200050@uprr.edu.mx',
      foto: '202200050.JPG'
    },
    {
      nombre: 'Catalina',
      matricula: '202200059',
      correo: '202200059@uprr.edu.mx',
      foto: '202200059.JPG'
    },
    {
      nombre: 'Valentin',
      matricula: '202200081',
      correo: '202200081@uprr.edu.mx',
      foto: '202200081.JPG'
    },
    {
      nombre: 'Edxel',
      matricula: '202200095',
      correo: '202200095@uprr.edu.mx',
      foto: '202200095.JPG'
    },
    {
      nombre: 'Fernando',
      matricula: '202200097',
      correo: '202200097@uprr.edu.mx',
      foto: '202200097.JPG'
    }
  ];

}
