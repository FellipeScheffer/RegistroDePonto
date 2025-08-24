import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,               // precisa estar aqui
  imports: [],
  templateUrl: './home.html',
  styleUrls: ['./home.css']       // tem que ser plural e array
})
export class Home { }
