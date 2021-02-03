import { Component, OnInit } from '@angular/core';
import { CountryTotalModel } from './models/country-total.model';
import { CountryModel } from './models/country.model';
import {CoronaServiceService} from './services/corona-service.service';
import {WorldTotalModel} from './models/world-total.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

    countryList: CountryModel[] = [];
    worldwideDetails: WorldTotalModel = null;
    selectedCountryDetails: CountryTotalModel = null;

    constructor(private coronaService: CoronaServiceService) {}

    ngOnInit(){
      this.coronaService.getCountries().subscribe(countryData => {
        this.countryList = countryData.sort(this.sortCountries);
      })
      this.coronaService.getWorldwideDetails().subscribe(resData => {
        this.worldwideDetails = {
          TotalConfirmed: resData.TotalConfirmed,
          TotalDeaths: resData.TotalDeaths,
          TotalRecovered: resData.TotalRecovered
        }
      })
    }

    sortCountries(fCountry: CountryModel, sCountry:CountryModel){
      return fCountry.Country > sCountry.Country ? 1 : (sCountry.Country > fCountry.Country) ? -1 : 0;
    }

    onSelectCountry(country){
      console.log(country);
      this.coronaService.getCountryDetails(country).subscribe(data => {
          const lastIndex = data.length - 1;
          this.selectedCountryDetails = data[lastIndex];
      })
    }
}
