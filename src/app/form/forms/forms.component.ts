import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.css'
})
export class FormsComponent {
  formData: any = {}; // Object to store form data

  onSubmit(form: NgForm) {
    console.log('Form submitted with data:', form.value);
    // You can perform further actions here, like sending the data to a server
  }
}
