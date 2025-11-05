import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of, switchMap, tap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-detail',
  imports: [CommonModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
})
export class UserDetailComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private userService = inject(UserService);

  errorMessage: string | null = null;

  user$ = this.route.paramMap.pipe(
    switchMap((params) => {
      const id = Number(params.get('id'));
      if (!id) {
        this.errorMessage = 'Geçersiz kullanıcı ID’si.';
        return of(null);
      }

      return this.userService.getUserById(id).pipe(
        catchError((err) => {
          console.error('API Hatası:', err);
          this.errorMessage = 'Kullanıcı bilgileri alınamadı.';
          return of(null);
        })
      );
    })
  );

  goBack(): void {
    this.router.navigate(['/']);
  }
}