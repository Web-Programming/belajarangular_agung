import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  formError: string = '';  // Ganti String menjadi string
  formSuccess: string = '';

  constructor(private fb: FormBuilder) {
    // Membuat form dengan validasi
    this.registerForm = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  // Getter untuk akses form control
  get name() {
    return this.registerForm.get('name');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  // Fungsi untuk submit form
  submitRegister(): void {
    // Cek jika form valid
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      console.log('Form submitted', formData);

      // Di sini Anda bisa memanggil API atau service untuk submit data
      // Misalnya: this.authService.register(formData);
      this.formSuccess = 'Formulir berhasil dikirim!';
      this.formError = '';  // Kosongkan error jika form valid
    } else {
      // Jika form tidak valid, tampilkan error
      this.formError = 'Semua field wajib diisi dan sesuai dengan aturan.';
      this.formSuccess = '';  // Kosongkan pesan sukses jika form tidak valid
    }
  }

  // Menampilkan pesan error untuk masing-masing kontrol form
  getNameErrorMessage() {
    if (this.name?.hasError('required')) {
      return 'Nama wajib diisi';
    }
    if (this.name?.hasError('minlength')) {
      return 'Nama harus lebih dari 2 karakter';
    }
    return '';
  }

  getEmailErrorMessage() {
    if (this.email?.hasError('required')) {
      return 'Email wajib diisi';
    }
    if (this.email?.hasError('email')) {
      return 'Format email tidak valid';
    }
    return '';
  }

  getPasswordErrorMessage() {
    if (this.password?.hasError('required')) {
      return 'Password wajib diisi';
    }
    if (this.password?.hasError('minlength')) {
      return 'Password harus lebih dari 6 karakter';
    }
    return '';
  }
}
