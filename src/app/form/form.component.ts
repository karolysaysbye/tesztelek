import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmailService } from '../email.service'; // Adjust the path based on your project structure

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  formData = {
    name: '',
    email: '',
    message: ''
  };
  errorMessage = '';
  successMessage = '';

  constructor(private emailService: EmailService) {}

  onSubmit() {
    if (this.formData.name && this.formData.email && this.formData.message) {
      this.emailService.sendEmail(this.formData.name, this.formData.email, this.formData.message)
        .subscribe({
          next: (response) => {
            console.log('Email sent successfully!', response);
            this.successMessage = 'Email sent successfully!';
          },
          error: (error) => {
            console.error('Error sending email', error);
            this.errorMessage = 'Failed to send email. Please try again later.';
          }
        });
    } else {
      this.errorMessage = 'Please fill in all fields!';
    }
  }
}
