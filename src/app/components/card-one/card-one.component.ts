import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, input, Output } from '@angular/core';


@Component({
  selector: 'app-card-one',
  imports: [CommonModule],
  templateUrl: './card-one.component.html',
  styleUrl: './card-one.component.scss'
})
export class CardOneComponent {
  @Input() title?: string;
  @Input() subtitle?: string;
  @Input() text?: string;
  @Input() buttonText?: string;
  @Input() buttonIcon?: string;
  
  @Output() action = new EventEmitter<void>();

  onActionClick(): void {
    this.action.emit();
  }
}