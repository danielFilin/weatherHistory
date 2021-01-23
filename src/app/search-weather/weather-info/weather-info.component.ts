import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WeatherService } from 'src/app/shared/weather.service';

@Component({
  selector: 'app-weather-info',
  templateUrl: './weather-info.component.html',
  styleUrls: ['./weather-info.component.css']
})
export class WeatherInfoComponent implements OnInit, OnDestroy {
  weatherInfoSubscription: Subscription;
  weatherData;

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.weatherInfoSubscription = this.weatherService.getWeatherInfoUpdate().subscribe((responseData) => {
      this.weatherData = responseData;
    });
  }

  ngOnDestroy() {
    this.weatherInfoSubscription.unsubscribe();
  }

}
