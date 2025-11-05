import { Component, inject, OnInit } from '@angular/core';
import { CardListComponent } from '../../components/card-list/card-list.component';
import { CommonModule } from '@angular/common';
import { Router} from '@angular/router';
import { UserService } from '../../services/user.service';
import { catchError, finalize, map, Observable, of, tap } from 'rxjs';
import { User } from '../../models/user.model';
import { CardItem } from '../../models/card-item.model';

@Component({
  selector: 'app-home',
  imports: [ 
    CommonModule, 
    CardListComponent,
   ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  private userService = inject(UserService);
  private router = inject(Router);
  users$!: Observable<CardItem[]>;
  loading = false;
  errorMessage: string | null = null;

  ngOnInit(): void {
    this.loadUsers();
  }

  private loadUsers(): void {
    this.loading = true;
    this.errorMessage = null;
    this.users$ = this.userService.getUsers().pipe(
      tap(() => console.log('API isteği atıldı')),
      map((users: User[]) =>
        users.map((u) => this.toCardItem(u))
      ),
      finalize(() => (this.loading = false)),
      catchError((err) => {
        console.error('Kullanıcı verisi yüklenirken hata:', err);
        this.errorMessage = 'Kullanıcı verileri yüklenirken bir hata oluştu.';
        this.loading = false; 
        return of([] as CardItem[]);
      })
    );
  }

  private toCardItem(u: User): CardItem {
    return {
      id: u.id,
      title: u.name,
      subtitle: u.company?.name ?? '',
      text: `${u.email}\n${u.address?.city ?? ''}`,
      buttonText: 'Detay'
    };
  }

  navigateToDetail(userId: number): void {
    if (typeof userId === 'number') {
      this.router.navigate(['/users', userId]);
    }
  }
}