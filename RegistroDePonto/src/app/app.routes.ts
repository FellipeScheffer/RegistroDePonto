import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { LoginComponent } from './pages/login/login';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // 👈 raiz vai pro login
  { path: 'login', component: LoginComponent },
  { path: 'home', component: Home }
];


