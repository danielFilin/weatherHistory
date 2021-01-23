import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchWeatherComponent } from './search-weather/search-weather.component';
import { AdminZoneComponent } from './admin-zone/admin-zone.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { WeatherInfoComponent } from './search-weather/weather-info/weather-info.component';
import { CitiesListComponent } from './admin-zone/cities-list/cities-list.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchWeatherComponent,
    AdminZoneComponent,
    HeaderComponent,
    WeatherInfoComponent,
    CitiesListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
