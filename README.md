# GymReservas

Sistema de reservas de turnos para un gimnasio, desarrollado con Angular 21.

**Demo en vivo:** https://gym-reservas-p2piieq84-hugoalozanors-projects.vercel.app/

## Instalación y ejecución

```bash
npm install
ng serve
```

Abrir en el navegador: `http://localhost:4200`

## Versiones utilizadas

- Node.js: 22.22.2
- Angular CLI: 21.2.10
- Angular: 21.2.0

## Arquitectura de componentes

```
AppComponent
├── BookingListComponent   → listado de tarjetas de clases
└── BookingDetailComponent → detalle de la clase seleccionada
```

| Componente | Responsabilidad |
|---|---|
| `AppComponent` | Shell principal: header, layout y footer |
| `BookingListComponent` | Listado de reservas con estados loading, error y empty |
| `BookingDetailComponent` | Detalle de la clase seleccionada y acción de reserva |

## Estrategia de comunicación

Se eligió un **servicio compartido con `BehaviorSubject`** en lugar de `@Input()` / `@Output()`.

**Motivo:** `BookingListComponent` y `BookingDetailComponent` son hermanos en el árbol de componentes (ambos hijos de `AppComponent`), por lo que la comunicación directa padre-hijo no aplica de forma natural. El servicio centraliza el estado de la selección y ambos componentes lo consumen de forma independiente, sin acoplamiento entre ellos.

Adicionalmente, se utiliza `toSignal()` de `@angular/core/rxjs-interop` para exponer el `BehaviorSubject` como un **Signal**, aprovechando la reactividad moderna de Angular.

## Simulación de la API

Se implementó un **HTTP Interceptor funcional** (`bookingsMockInterceptor`) que intercepta la llamada `GET /api/bookings` y retorna datos mockeados con un delay de 800ms para simular latencia de red.

Esto permite que el `BookingService` consuma `HttpClient` de forma real, sin modificar su implementación para tests o mocks.

## Puntos extra implementados

- **Standalone components** — todos los componentes son standalone.
- **Control flow syntax** — uso de `@if`, `@else if` y `@for` en los templates.
- **Signals** — estado reactivo con `signal()` en los componentes y `toSignal()` en el servicio.
- **Animaciones suaves** — transición `slideIn` al abrir el panel de detalle.
