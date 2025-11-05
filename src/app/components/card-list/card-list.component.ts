import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardItem } from '../../models/card-item.model';
import { CommonModule } from '@angular/common';
import { CardOneComponent } from '../card-one/card-one.component';

@Component({
  selector: 'app-card-list',
  imports: [CommonModule, CardOneComponent],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.scss'
})

export class CardListComponent {
  @Input({ required: true }) items: CardItem[] = [];
  @Output() itemSelected = new EventEmitter<number>();

  onCardAction(id?: number) {
      if (id !== undefined) {
        this.itemSelected.emit(id);
    }
  }
}
