import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { WeatherService } from '../shared/weather.service';

@Component({
  selector: 'app-search-weather',
  templateUrl: './search-weather.component.html',
  styleUrls: ['./search-weather.component.css']
})
export class SearchWeatherComponent implements OnInit, OnDestroy {
  weatherDataForm: FormGroup;
  infoMessageSubscription: Subscription;
  cityData = {};
  listOfCities = [];
  infoMessage: string;

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.weatherDataForm = new FormGroup({
      'fromDate': new FormControl(null),
      'toDate': new FormControl(null, [Validators.required]),
      'location': new FormControl(null, Validators.required)
    });
    this.infoMessageSubscription = this.weatherService.getQueryInfoMessage().subscribe((responseData) => {
      this.infoMessage = responseData;
    });
    this.listOfCities = this.weatherService.getAllCities();
  }

  onGetWeather() {
    const userQuery = {
      fromDate: this.weatherDataForm.value.fromDate,
      toDate: this.weatherDataForm.value.toDate,
      location: this.weatherDataForm.value.location
    }
    this.cityData = this.weatherService.getData(userQuery);
    this.weatherDataForm.reset();
  }

  ngOnDestroy() {
    this.infoMessageSubscription.unsubscribe();
  }

}
