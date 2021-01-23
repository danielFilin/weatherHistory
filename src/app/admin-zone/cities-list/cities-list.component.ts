import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WeatherService } from 'src/app/shared/weather.service';

@Component({
  selector: 'app-cities-list',
  templateUrl: './cities-list.component.html',
  styleUrls: ['./cities-list.component.css']
})
export class CitiesListComponent implements OnInit, OnDestroy {
  listOfForbiddenCities;
  forbiddenCitiesSubscription: Subscription;
  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.forbiddenCitiesSubscription = this.weatherService.getForbiddenCities().subscribe((responseData) => {
      this.listOfForbiddenCities = responseData;
    });
  }

  ngOnDestroy() {
    this.forbiddenCitiesSubscription.unsubscribe();
  }

}
