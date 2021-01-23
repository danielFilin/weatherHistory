import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminZoneComponent } from './admin-zone/admin-zone.component';
import { SearchWeatherComponent } from './search-weather/search-weather.component';

const routes: Routes = [
  { path: '', redirectTo: '/weather-info', pathMatch: 'full'},
  { path: 'weather-info', component: SearchWeatherComponent},
  { path: 'admin-zone', component: AdminZoneComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
