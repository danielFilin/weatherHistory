import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import weatherData from '../weatherData/weatherData.json';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  gloabalWeatherData = weatherData;
  forbiddenCities = [];
  private weatherInfo = new Subject();
  private infoMessage = new Subject<string>();
  private listOfForbiddenCities = new Subject();

  constructor() { }

  getWeatherInfoUpdate() {
    return this.weatherInfo.asObservable();
  }

  getQueryInfoMessage() {
    return this.infoMessage.asObservable();
  }

  getForbiddenCities() {
    return this.listOfForbiddenCities.asObservable();
  }

  getForbiddenList() {
    return this.forbiddenCities;
  }

  getAllCities() {
    let allCities = [];
    this.gloabalWeatherData.map(city => {
      allCities.push(city.city.name);
    });
    return allCities;
  }

  getData(userQuery) {
    if (this.forbiddenCities.includes(userQuery.location)) {
      this.infoMessage.next('No data avaliable');
      return;
    }
    const startdate = new Date(userQuery.fromDate);
    var startMilliseconds = startdate.getTime();
    const endDate = new Date(userQuery.toDate);
    var endMilliseconds = endDate.getTime();
    const currentCity = this.gloabalWeatherData.find(city => city.city.name === userQuery.location);
    if (!currentCity) {
      this.infoMessage.next('No data avaliable');
      return;
    }
    const result = currentCity.data.filter(info => info.dt >= startMilliseconds && info.dt <= endMilliseconds);
    this.infoMessage.next('Data was fetched successefully');
    this.weatherInfo.next([...result]);
    return result;
  }

  addToForbidden(location){
    if (this.forbiddenCities.includes(location)) {
      return 'city was not added because it is already in the black list';
    }
    this.forbiddenCities.push(location);
    this.listOfForbiddenCities.next([...this.forbiddenCities]);
    return 'city was added to forbidden list';
  }

  removeFromForbidden(location) {
    if (!this.forbiddenCities.includes(location)) {
      return 'city was not remove because it is not blacklisted';
    }
    const updatedList = this.forbiddenCities.filter(city => city !== location);
    this.listOfForbiddenCities.next([...updatedList]);
    return 'city was removed from forbidden list';
  }

}
