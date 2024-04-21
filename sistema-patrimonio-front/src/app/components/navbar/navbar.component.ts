import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

  constructor() { }

  userDataString = JSON.parse(localStorage.getItem('userData')  || '{}');
  usuario = this.userDataString.usuario
  email = this.userDataString.email

  ngOnInit() {}

}
