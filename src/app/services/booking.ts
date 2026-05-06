import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { Booking } from '../models/booking.model';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private http = inject(HttpClient);

  private selectedBookingSubject = new BehaviorSubject<Booking | null>(null);

  readonly selectedBooking = toSignal(this.selectedBookingSubject, {
    initialValue: null,
  });

  getBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>('/api/bookings');
  }

  selectBooking(booking: Booking): void {
    this.selectedBookingSubject.next(booking);
  }

  reserveBooking(booking: Booking): void {
    const updated: Booking = {
      ...booking,
      availableSpots: Math.max(0, booking.availableSpots - 1),
    };
    this.selectedBookingSubject.next(updated);
  }

  clearSelection(): void {
    this.selectedBookingSubject.next(null);
  }
}
