import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: any = {};
  searchName: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  getUser() {
    if (!this.searchName) {
      this.errorMessage = 'Please enter a Pokémon name.';
      return;
    }

    this.http.get(`https://pokeapi.co/api/v2/pokemon/${this.searchName.toLowerCase()}`).subscribe(
      (result: any) => {
        this.user = result;
        this.errorMessage = '';
      },
      (error) => {
        this.errorMessage = 'Pokémon not found. Please try again.';
        this.user = {};
      }
    );
  }
}