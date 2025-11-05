import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,catchError, throwError } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) { }

 getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl).pipe(
      catchError((error) => {
        console.error('API isteğinde bir hata oluştu:', error);
        return throwError(() => new Error('Kullanıcı verileri yüklenemedi. Sunucu hatası.'));
      })
    );
  }

 getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`).pipe(
      catchError((error) => {
        console.error(`ID ${id} için kullanıcı verisi çekilirken hata oluştu:`, error);
        return throwError(() => new Error('Belirtilen kullanıcı bulunamadı veya sunucu hatası.'));
      })
    );
  }
}
