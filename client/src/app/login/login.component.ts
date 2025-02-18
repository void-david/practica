import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = 'admin';
  password: string = 'admin';

  constructor(private router: Router) {}

  onSubmit(event: Event) {
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    const username = (target.querySelector('#username') as HTMLInputElement).value;
    const password = (target.querySelector('#password') as HTMLInputElement).value;

    if (username === this.username && password === this.password) {
      this.router.navigate(['/dashboard']);
    } else {
      alert('Invalid username or password');
    }
  }
}