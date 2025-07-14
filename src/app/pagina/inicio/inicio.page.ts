import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
interface estlista{
  name: string;
  redirectTo: string;
  icon: string;
}
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  imports: [IonicModule, CommonModule, RouterModule],
})
export class InicioPage {
  /*constructor() { }
  ngOnInit() {
  }*/
  Elementos: estlista[] = [ 
    {
      name: 'Alerta',
      redirectTo: '/alert',
      icon: 'alert-outline'
    },
    {
      name: 'Card',
      redirectTo: '/card',
      icon: 'card-outline'
    },
    {
      name: 'DateTime',
      redirectTo: '/datetime',
      icon: 'calendar-number-outline'
    },
    {
      name: 'CheckBox',
      redirectTo: '/checkbox',
      icon: 'file-tray-outline'
    },
    {
      name: 'Fab',
      redirectTo: '/fab',
      icon: 'list-outline'
    },
    {
      name: 'Grid',
      redirectTo: '/grid',
      icon: 'document-outline'
    },
    {
      name: 'Infinite',
      redirectTo: '/infinite',
      icon: 'infinite-outline'
    },
    {
      name: 'Input',
      redirectTo: '/inputs',
      icon: 'locate-outline'
    },
     {
      name: 'Modal',
      redirectTo: '/modal',
      icon: 'grid-outline'
    },
     {
      name: 'Popover',
      redirectTo: '/popover',
      icon: 'navigate-outline'
    },
     {
      name: 'List',
      redirectTo: '/list',
      icon: 'person-circle-outline'
    }
  ]
}
