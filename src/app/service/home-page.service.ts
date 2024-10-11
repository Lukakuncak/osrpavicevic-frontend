import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class HomePageService {
  private BASE_URL = "http://localhost:8080/public/home";
  constructor() { }

  async numberOfWorkers():Promise<number>{
    const response = await axios.get(`${this.BASE_URL}/number-of-workers`);
    return response.data
  }

  async numberOfYearsWorking():Promise<number>{
    const response = await axios.get(`${this.BASE_URL}/year-of-working`);
    return response.data
  }
}
