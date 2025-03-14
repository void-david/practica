import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  onSubmit(event: Event) {
    event.preventDefault();
    // Implement register logic here
  }

  resetForm() {
    const form = document.querySelector('form') as HTMLFormElement;
    form.reset();
  }
}