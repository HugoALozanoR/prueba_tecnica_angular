import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { of, delay } from 'rxjs';
import { Booking } from '../models/booking.model';

const MOCK_BOOKINGS: Booking[] = [
  {
    id: 1,
    className: 'Yoga',
    instructor: 'Cecy Montenero',
    schedule: 'Lunes 18:00',
    availableSpots: 10,
  },
  {
    id: 2,
    className: 'Crossfit',
    instructor: 'Rodrigo Kalionchiz',
    schedule: 'Martes 07:00',
    availableSpots: 5,
  },
  {
    id: 3,
    className: 'Spinning',
    instructor: 'Daniela Ibarra',
    schedule: 'Miércoles 19:00',
    availableSpots: 0,
  },
  {
    id: 4,
    className: 'Pilates',
    instructor: 'Marilu Gonzalez',
    schedule: 'Jueves 10:00',
    availableSpots: 8,
  },
  {
    id: 5,
    className: 'Zumba',
    instructor: 'Rodrigo Chapa',
    schedule: 'Viernes 20:00',
    availableSpots: 3,
  },
];

export const bookingsMockInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url === '/api/bookings' && req.method === 'GET') {
    return of(new HttpResponse({ body: MOCK_BOOKINGS, status: 200 })).pipe(
      delay(800)
    );
  }
  return next(req);
};
