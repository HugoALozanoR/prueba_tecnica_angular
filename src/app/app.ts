import { Component, inject } from '@angular/core';
import { BookingList } from './components/booking-list/booking-list';
import { BookingDetail } from './components/booking-detail/booking-detail';
import { BookingService } from './services/booking';

@Component({
  selector: 'app-root',
  imports: [BookingList, BookingDetail],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private bookingService = inject(BookingService);
  readonly selectedBooking = this.bookingService.selectedBooking;
}
