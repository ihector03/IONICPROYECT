import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthGuard, authGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['isAuthenticated']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });

    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  // Prueba para la función guard (compatibilidad)
  describe('authGuard function', () => {
    it('should be created', () => {
      const executeGuard: any = authGuard;
      expect(executeGuard).toBeTruthy();
    });
  });

  // Pruebas para la clase guard
  describe('canActivate', () => {
    it('should return true when user is authenticated', (done) => {
      authService.isAuthenticated.and.returnValue(Promise.resolve(true));
      
      guard.canActivate({} as any, {} as any).subscribe(result => {
        expect(result).toBeTrue();
        done();
      });
    });

    it('should redirect to login when user is not authenticated', (done) => {
      authService.isAuthenticated.and.returnValue(Promise.resolve(false));
      
      guard.canActivate({} as any, {} as any).subscribe(result => {
        expect(result).toBeFalse();
        expect(router.navigate).toHaveBeenCalledWith(['/login']);
        done();
      });
    });
  });
});