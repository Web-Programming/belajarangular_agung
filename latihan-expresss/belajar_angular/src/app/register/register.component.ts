import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://your-backend-api.com/register';  // Ganti dengan URL API yang sesuai

  constructor(private http: HttpClient) { }

  // Fungsi untuk registrasi
  register(formData: any): Observable<any> {
    return this.http.post(this.apiUrl, formData).pipe(
      catchError(error => {
        console.error('Registrasi gagal', error);
        return throwError(error);
      })
    );
  }
}
