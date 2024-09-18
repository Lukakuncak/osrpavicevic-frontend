import { Injectable } from '@angular/core';
import axios from 'axios';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassScheduleService {
  private BASE_URL:string  = "http://localhost:8080";
  private rajakUrl: string = '';
  private pilicaUrl: string = '';

  constructor() {}

  async loadUrls(): Promise<void> {
    try {
      const rajakResponse = await axios.get(`${this.BASE_URL}/public/class-schedule/rajak`);
      this.rajakUrl = rajakResponse.data;

      const pilicaResponse = await axios.get(`${this.BASE_URL}/public/class-schedule/pilica`);
      this.pilicaUrl = pilicaResponse.data;
    } catch (error) {
      console.error('Error fetching class schedule URLs', error);
    }
  }

  getRajakUrl(): string {
    return this.rajakUrl;
  }

  getPilicaUrl(): string {
    return this.pilicaUrl;
  }

  setRajakUrl(url: string, token: string): Observable<void> {
    return from(
      axios.put(`${this.BASE_URL}/class-schedule/rajak`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        params: { url }
      }).then(response => {
        this.rajakUrl = url; 
        console.log(response.data.message);
      }).catch(error => {
        console.error('Error updating Rajak URL', error);
        throw error;
      })
    );
  }
  
  setPilicaUrl(url: string, token: string): Observable<void> {
    return from(
      axios.put(`${this.BASE_URL}/class-schedule/pilica`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        params: { url: url }
      }).then(response => {
        this.pilicaUrl = url;
        console.log(response.data.message);
      }).catch(error => {
        console.error('Error updating Pilica URL', error);
        throw error;
      })
    );
  }

}
