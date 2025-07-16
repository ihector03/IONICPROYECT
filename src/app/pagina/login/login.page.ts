import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AlertController, IonicModule, LoadingController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule, FormsModule],
})
export class LoginPage implements OnInit {
  
  username: string = '';
  password: string = '';
  isAuthenticated = false;

  constructor(
    private authService: AuthService,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private router: Router
  ) {}

  async ngOnInit() {
    this.isAuthenticated = await this.authService.isAuthenticated();
    if (this.isAuthenticated) {
      await this.redirectAuthenticatedUser();
    }
  }

  async login() {
    // Validaciones básicas
    if (!this.username.trim() || !this.password.trim()) {
      await this.showAlert('Error', 'Por favor ingrese usuario y contraseña');
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Iniciando sesión...',
      spinner: 'crescent'
    });
    await loading.present();

    try {
      const success = await this.authService.login(this.username, this.password);
      
      if (success) {
        await this.router.navigateByUrl('/perfil', { replaceUrl: true });
      } else {
        await this.showAlert('Error', 'Usuario o contraseña incorrectos');
      }
    } catch (error: unknown) {
      const errorMessage = this.getErrorMessage(error);
      await this.showAlert('Error', errorMessage);
    } finally {
      await loading.dismiss();
    }
  }

  private async redirectAuthenticatedUser(): Promise<void> {
    await this.router.navigate(['/perfil'], { 
      replaceUrl: true,
      queryParams: { from: 'auto-redirect' } // Opcional: para tracking
    });
  }

  private getErrorMessage(error: unknown): string {
    if (error instanceof Error) return error.message;
    if (typeof error === 'string') return error;
    return 'No se pudo conectar al servidor';
  }

  private async showAlert(header: string, message: string): Promise<void> {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}