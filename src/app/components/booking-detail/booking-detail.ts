import { Component, inject, signal } from '@angular/core';
import { BookingService } from '../../services/booking';

@Component({
  selector: 'app-booking-detail',
  imports: [],
  templateUrl: './booking-detail.html',
  styleUrl: './booking-detail.scss',
})
export class BookingDetail {
  private bookingService = inject(BookingService);

  readonly booking = this.bookingService.selectedBooking;
  reserved = signal(false);

  onReserve(): void {
    const current = this.booking();
    if (!current || current.availableSpots === 0) return;
    this.bookingService.reserveBooking(current);
    this.reserved.set(true);
  }

  onClose(): void {
    this.bookingService.clearSelection();
    this.reserved.set(false);
  }
}
