import { Component, inject, OnInit, signal } from '@angular/core';
import { BookingService } from '../../services/booking';
import { Booking } from '../../models/booking.model';

@Component({
  selector: 'app-booking-list',
  imports: [],
  templateUrl: './booking-list.html',
  styleUrl: './booking-list.scss',
})
export class BookingList implements OnInit {
  private bookingService = inject(BookingService);

  bookings = signal<Booking[]>([]);
  isLoading = signal(true);
  hasError = signal(false);

  readonly selectedBooking = this.bookingService.selectedBooking;

  ngOnInit(): void {
    this.bookingService.getBookings().subscribe({
      next: (data) => {
        this.bookings.set(data);
        this.isLoading.set(false);
      },
      error: () => {
        this.hasError.set(true);
        this.isLoading.set(false);
      },
    });
  }

  onSelect(booking: Booking): void {
    this.bookingService.selectBooking(booking);
  }
}
