import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ComponentesModule } from 'src/app/componentes/componentes.module';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone:true,
  imports: [IonicModule, CommonModule, RouterModule, ComponentesModule],
})
export class PerfilPage implements OnInit {
  user: any;

  constructor(private authService: AuthService) {}

  async ngOnInit() {
    this.user = await this.authService.getCurrentUser();
  }

  async logout() {
    await this.authService.logout();
  }
}