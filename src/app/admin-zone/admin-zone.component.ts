import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { WeatherService } from '../shared/weather.service';

@Component({
  selector: 'app-admin-zone',
  templateUrl: './admin-zone.component.html',
  styleUrls: ['./admin-zone.component.css']
})
export class AdminZoneComponent implements OnInit {
  adminForm: FormGroup;
  submitButtonClicked: boolean;
  infoMessage: string;
  listOfCities = [];

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.adminForm = new FormGroup({
      'location': new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(150)]),
    });
    this.listOfCities = this.weatherService.getAllCities();
  }

  onFormSubmit(event) {
    if (event.submitter.name === 'add') {
      this.infoMessage = this.weatherService.addToForbidden( this.adminForm.value.location);
    } else {
      this.infoMessage = this.weatherService.removeFromForbidden( this.adminForm.value.location);
    }
    this.adminForm.reset();
  }

}
