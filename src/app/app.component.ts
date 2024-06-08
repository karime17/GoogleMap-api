import {Component, ViewChild, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {GoogleMap} from '@angular/google-maps';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl:'./app.component.css',
  imports: [RouterOutlet, GoogleMap],
})
export class AppComponent implements OnInit {

  @ViewChild(GoogleMap) map!: GoogleMap;

  // ubicacion inicial para mostrar el mapa 
  center: google.maps.LatLngLiteral  = { lat: 43.6450740, lng: -115.9930810 };
  zoom = 12;

  ngOnInit(): void {
    this.setCurrentLocation();
  }
//metodo para obtener la ubicacion actual y despues mostrarla

  setCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('Position obtained:', position);
          this.center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          
          this.zoom = 18; // Acercar el mapa a la ubicación actual
          this.map.panTo(this.center); // Centrar el mapa en la ubicación actual
        },
        (error) => {
          console.error('Error obtaining location', error);
          alert('No se pudo obtener la ubicación actual.');
        }
      );
    } else {
      alert('La geolocalización no es soportada por este navegador.');
    }
  }

}

