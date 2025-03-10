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
  type: any = {};
  searchType: string = '';
  searchName: string = '';
  errorMessage: string = '';
  errorMessageType: string = '';
  pokemonDetails: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 2;

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

  getType() {
    if (!this.searchType) {
      this.errorMessageType = 'Please enter a type name.';
      return;
    }

    this.http.get(`https://pokeapi.co/api/v2/type/${this.searchType.toLowerCase()}`).subscribe(
      (result: any) => {
        this.type = result;
        this.errorMessageType = '';
        this.pokemonDetails = [];
        this.type.pokemon.forEach((pokemonEntry: any) => {
          this.http.get(pokemonEntry.pokemon.url).subscribe(
            (pokemonResult: any) => {
              this.pokemonDetails.push(pokemonResult);
            }
          );
        });
      },
      (error) => {
        this.errorMessageType = 'Type not found. Please try again.';
        this.type = {};
      }
    );
  }

  get paginatedPokemonDetails() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.pokemonDetails.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.currentPage * this.itemsPerPage < this.pokemonDetails.length) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}