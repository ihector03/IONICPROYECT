import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { Observable, from } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Asegúrate que esta URL sea correcta para tu entorno
  private apiUrl = 'http://localhost:81/ProyectoIonic/api/login.php';
  private _storage: Storage | null = null;

  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: Storage
  ) {
    this.initStorage();
  }

  private async initStorage() {
    this._storage = await this.storage.create();
  }

  async login(username: string, password: string): Promise<boolean> {
    try {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      });

      const body = {
        username: username.trim(),
        password: password.trim()
      };

      const response: any = await this.http.post(this.apiUrl, body, { headers }).toPromise();

      if (response?.success) {
        await this.setCurrentUser(response.user);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error en login:', error);
      throw new Error('No se pudo conectar al servidor');
    }
  }

  private async setCurrentUser(user: any): Promise<void> {
    if (this._storage) {
      await this._storage.set('currentUser', user);
    } else {
      console.warn('Storage no inicializado, usando localStorage como fallback');
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
  }

  async getCurrentUser(): Promise<any> {
  try {
    if (this._storage) {
      return await this._storage.get('currentUser');
    }
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    return null;
  }
}

  async isAuthenticated(): Promise<boolean> {
    const user = await this.getCurrentUser();
    return !!user;
  }

  async logout(): Promise<void> {
    if (this._storage) {
      await this._storage.remove('currentUser');
    }
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  // Versión alternativa usando Observables
  loginObservable(username: string, password: string): Observable<boolean> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const body = {
      username: username.trim(),
      password: password.trim()
    };

    return this.http.post<any>(this.apiUrl, body, { headers }).pipe(
      map(response => {
        if (response?.success) {
          this.setCurrentUser(response.user);
          return true;
        }
        return false;
      }),
      catchError(error => {
        console.error('Error en login:', error);
        throw new Error('No se pudo conectar al servidor');
      })
    );
  }
}