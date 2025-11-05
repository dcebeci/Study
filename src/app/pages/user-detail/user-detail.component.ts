import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user.model';
import { catchError, Observable, of, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-detail',
  imports: [CommonModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent implements OnInit {
  
  user$!: Observable<User | null>;
  errorMessage = '';
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

 ngOnInit(): void {
  this.route.paramMap.subscribe(params => {
    const idParam = params.get('id');
    const id = idParam ? parseInt(idParam, 10) : null;

    if (!id) {
      this.errorMessage = 'Geçersiz kullanıcı ID’si.';
      this.loading = false;
      return;
    }

    this.user$ = this.userService.getUserById(id).pipe(
      catchError((error) => {
        this.errorMessage = error.message || 'Kullanıcı bulunamadı.';
        this.loading = false;
        return of(null);
      })
    );

    this.user$.subscribe(() => (this.loading = false));
  });
}
  goBack(): void {
    this.router.navigate(['/']);
  }
}