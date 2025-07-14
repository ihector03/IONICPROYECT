import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ComponentesModule } from 'src/app/componentes/componentes.module';
@Component({
  selector: 'app-infinite',
  templateUrl: './infinite.page.html',
  styleUrls: ['./infinite.page.scss'],
  imports: [IonicModule, CommonModule, RouterModule, ComponentesModule],
})
export class InfinitePage implements OnInit {
  datos = Array(140);
  visibleData: any[] = [];
  currentIndex = 0;
  itemsPerLoad = 21;
  constructor() { }
  ngOnInit() {
    for (let i = 0; i < this.datos.length; i++) {
      this.datos[i] = `Datos ${i+1}`;
    }
    this.loadMoreData();
  }
  loadMoreData(event?: any) {
    setTimeout(() => {
      const nextItems = this.datos.slice(this.currentIndex, this.currentIndex + this.itemsPerLoad);
      this.visibleData = [...this.visibleData, ...nextItems];
      this.currentIndex += this.itemsPerLoad;
      if (event) {
        event.target.complete();       
        if (this.currentIndex >= this.datos.length) {
          event.target.disabled = true;
        }
      }
    }, 1000);
  }
}