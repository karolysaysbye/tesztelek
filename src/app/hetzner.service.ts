import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HetznerService {
  private apiKey = 'r7b1GR8T7qu6h2PMK8zp2KWgbP1hhxqINeLkKV9oXXUFRukMiNtfRnaR7SDypfkn'; // Replace with your API key
  private apiUrl = 'https://api.hetzner.cloud/v1/servers'; // Hetzner API URL

  constructor(private http: HttpClient) {}

  // Fetch data from Hetzner API
  getServerData(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.apiKey}`,
    });

    return this.http.get(this.apiUrl, { headers });
  }
}
