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
  fileToUpload: File | null = null;
  errorMessage = '';
  successMessage = '';

  constructor(private emailService: EmailService) {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.fileToUpload = file;
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.formData.name && this.formData.email && this.formData.message && this.fileToUpload) {
      const formData = new FormData();
      formData.append('name', this.formData.name);
      formData.append('email', this.formData.email);
      formData.append('message', this.formData.message);
      formData.append('file', this.fileToUpload);

      this.emailService.sendEmailWithAttachment(formData).subscribe(
        response => {
          this.successMessage = 'Email sent successfully!';
          this.errorMessage = '';
        },
        error => {
          this.errorMessage = 'Error sending email';
          this.successMessage = '';
        }
      );
    } else {
      this.errorMessage = 'Please fill in all fields and attach a file!';
    }
  }
}
