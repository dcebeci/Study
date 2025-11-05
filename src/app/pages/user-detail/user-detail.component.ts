import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of, switchMap, tap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-detail',
  imports: [CommonModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private userService = inject(UserService);

  loading = true;
  errorMessage: string | null = null;

  user$ = this.route.paramMap.pipe(
    switchMap(params => {
      const id = Number(params.get('id'));
      if (!id) {
        this.errorMessage = 'Geçersiz kullanıcı ID’si.';
        this.loading = false;
        return of(null);
      }

      return this.userService.getUserById(id).pipe(
        tap(() => (this.loading = false)),
        catchError(err => {
          console.error('API Hatası:', err);
          this.errorMessage = 'Kullanıcı bilgileri alınamadı.';
          this.loading = false;
          return of(null);
        })
      );
    })
  );

  goBack(): void {
    this.router.navigate(['/']);
  }
}