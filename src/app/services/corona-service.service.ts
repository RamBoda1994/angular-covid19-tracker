import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CountryModel} from '../models/country.model';
import {CountryTotalModel} from '../models/country-total.model';

@Injectable({
  providedIn: 'root'
})
export class CoronaServiceService {

  countries: CountryModel[] = [];

  constructor(private http: HttpClient) { }

  getCountries(){
    return this.http.get<CountryModel[]>('https://api.covid19api.com/countries');
  }

  getWorldwideDetails(){
    return this.http.get<any>('https://api.covid19api.com/world/total');
  }

  getCountryDetails(country: string){
    return this.http.get<CountryTotalModel[]>(`https://api.covid19api.com/total/country/${country}`)
  }

}
