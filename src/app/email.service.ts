import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private emailUrl = 'https://hasas3.hu:3000/send-email'; // Replace with your actual domain and port

  constructor(private http: HttpClient) {}

  sendEmail(name: string, email: string, message: string): Observable<any> {
    const data = { name, email, message };
    return this.http.post(this.emailUrl, data);
  }
}
