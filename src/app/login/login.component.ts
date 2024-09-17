import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // Corrected from styleUrl to styleUrls
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  async onSubmit(event: Event) {
    event.preventDefault(); // Prevent default form submission behavior

    try {
      const response = await this.login(this.username, this.password);
      if (response) {
        console.log('Login successful!', response);
        // Optionally, navigate to the protected area of your app here
      } else {
        this.errorMessage = 'Login failed. Please check your credentials.';
      }
    } catch (error) {
      this.errorMessage = 'An error occurred during login. Please try again.';
    }
  }

  // Method to authenticate user with Keycloak using username and password
  async login(username: string, password: string) {
    const url = 'https://keycloak.hasas3.hu/realms/teszt/protocol/openid-connect/token'; // Replace with your Keycloak token endpoint

    const params = new URLSearchParams();
    params.append('grant_type', 'password');
    params.append('client_id', 'angular-app'); // Replace with your Client ID
    params.append('username', username);
    params.append('password', password);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params,
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      console.log('Access Token:', data.access_token);

      // Optionally, store the access token for later use
      localStorage.setItem('access_token', data.access_token);

      return data;
    } catch (error) {
      console.error('Error during login:', error);
      return null;
    }
  }
}
