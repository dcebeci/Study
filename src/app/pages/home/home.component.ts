import { Component, inject, OnInit } from '@angular/core';
import { CardListComponent } from '../../components/card-list/card-list.component';
import { CommonModule } from '@angular/common';
import { Router} from '@angular/router';
import { UserService } from '../../services/user.service';
import { BehaviorSubject, catchError, combineLatest, finalize, map, Observable, of, tap } from 'rxjs';
import { User } from '../../models/user.model';
import { CardItem } from '../../models/card-item.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [ 
    CommonModule, 
    CardListComponent,
    FormsModule
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
  private searchTerm$ = new BehaviorSubject<string>('');
  private usersSource$ = new BehaviorSubject<User[]>([]); 
  searchTerm: string = ''; 

  ngOnInit(): void {
    this.setupFilteredUsers();
    this.loadUsers();
  }
  onSearchTermChange(newTerm: string): void {
    this.searchTerm$.next(newTerm);
  }
   private setupFilteredUsers(): void {
    this.users$ = combineLatest([
      this.usersSource$,
      this.searchTerm$
    ]).pipe(
      map(([users, term]) => {
        const lowerTerm = term.toLowerCase().trim();
        const filteredUsers = lowerTerm
          ? users.filter(user => user.name.toLowerCase().includes(lowerTerm))
          : users;
        return filteredUsers.map(u => this.toCardItem(u));
      }),
      catchError((err) => {
        console.error('Veri akışında hata:', err);
        this.errorMessage = 'Veriler işlenirken bir hata oluştu.';
        return of([] as CardItem[]);
      })
    );
  }
  private loadUsers(): void {
    this.loading = true;
    this.errorMessage = null;
    this.userService.getUsers().pipe(
      finalize(() => (this.loading = false)),
      catchError((err) => {
        console.error('Kullanıcı verisi yüklenirken hata:', err);
        this.errorMessage = 'Kullanıcı verileri yüklenirken bir hata oluştu.';
        this.loading = false; 
        return of([] as User[]);
      })
    ).subscribe(users => {
      this.usersSource$.next(users);
    });
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