import { Component } from '@angular/core';
import { Observable, interval, timer, fromEvent } from 'rxjs';
import { pipe, of } from 'rxjs';
import { map, filter, tap, mapTo, share, take, bufferTime } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators';
import { concat, range } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'rxjs-practice';
  observable: any;

  ngOnInit() {
    
    // * introduccion
    //this.video0();

    // * interval y timer
    //this.video1();

    // * from event
    //this.video2();

    // * map y filter
    //this.video3();

    // * tap
    //this.video4();
    
    // * share
    //this.video5();

    // * concat
    //this.video6();

    // * ciclo de vida de un observable
    // this.video7();

    // * bufferTime
    // this.video8();

    // * switchMap
    this.video9();

  }

  // * video 0: intro 
  rxjsFun() {
    // se va a suscibir a obersvable
    console.log('just before subscribe');
    // se suscribe a observable y llama toda esa cadena de flujo
    this.observable.subscribe({
      next(x: any) { console.log('got value ' + x); },
      error(err: any) { console.error('something wrong occurred: ' + err); },
      complete() { console.log('done'); }
    });
    console.log('just after subscribe');
  }

  video0() {
    // pasa valor subscriber
    // pero por si solo no va a funcionar
    // * video 0: intro
    this.observable = new Observable(subscriber => {
      subscriber.next(1);
      subscriber.next(2);
      subscriber.next(3);
      setTimeout(() => {
        subscriber.next(4);
        // acompletar ciclo de observación, 
        // espera 1 sec para mandar un 4
        subscriber.complete();
      }, 1000);
    });
  }

  video1() {
     // * video 1: intervalos y timer
    // esto ya es un observable
    const contador = interval(1000);
    const timerRxjs = timer(5000);

    // para poder observarla me tengo que suscribit
    contador.subscribe((n) => {
      // armar funcion interna
      console.log('cada tantos sec.', n);
    });

    timerRxjs.subscribe((n) => {
      // armar funcion interna
      console.log('triggered timer, espera n sec.', n);
    });
  }

  video2() {
     // * video 2: from event
    // evento interactivo como click, tocar una tecla se hace un observable
    // ! en lugar getElementById, usar un view child
    // ! value never null con signo -> ! <-
    const el = document.getElementById('elemento')!;

    // debemos de mandar dos elementos al fromEvent()
    // 1. elemento
    // 2. evento entre comillas
    const mouseMove = fromEvent(el, 'mousemove');

    mouseMove.subscribe((e: any) => {
      console.log(`coordenadas x: ${e.clientX}, y:${e.clientY}`)
    });
  }

  video3 () {
    // * video 3: map y filter
    // funcion of crea funcion de elementos
    const nums = of(1, 2, 3, 4, 5);

    // fusiona x cantidad de funciones rxjs el pipe
    const alCuadrado = pipe(
      filter((n: number) => n %2 === 0),
      map(n => n * n)
    );

    const cuadrado = alCuadrado(nums);

    cuadrado.subscribe(x => console.log('ejercicio 3',x));
  }

  video4() {
    // * video 4: tap
    // tap no es observable por si mismo, es commo un espia
    const clicks = fromEvent(document, 'click');
    // click no tiene next
    const positions = clicks.pipe(
      // tap tiene de bueno que: 
      // se pueden llamar funciones de error, complete y next
      // ! tap ayuda mucho a debbugear
      tap(ev => console.log('Procesado: ', ev),
      err => console.log(err),
      () => console.log('completed'))
    );

    positions.subscribe(pos => console.log('positions', pos))
  }

  video5 () {
    // * video 5: share
    // compartir observable entre dos o mas suscripciones

    const time = timer(1000);

    const obs = time.pipe(
      tap(() => console.log('tap on'),
      mapTo('END OBS'))
    );

    // que pasa si me suscribo a esto
    const subs01 = obs.subscribe(val => console.log('sub 1: ', val));
    const subs02 = obs.subscribe(val => console.log('sub 2: ', val));

    // que pasa si usamos share
    // pipe fusiona n numero de funciones
    // observable compartida entre todas las suscripciones
    const shareObs = obs.pipe(share());
    console.log('shared on');
    const subs03 = shareObs.subscribe(val => console.log('sub 3: ', val));
    const subs04 = shareObs.subscribe(val => console.log('sub 4: ', val));

  }

  video6 () {
    // * video 6: concat
    // concatenar dos observables o mas

    // armar dos observables y concatenar
    // esta observable timer se va a multiplicar 4 veces
    // cuatro intervalos de 1 segundo.
    const timer = interval(1000).pipe(take(4));

    // observable que cuenta del 1 al 10
    const rango = range(1, 10);

    // concatena timer y rango y cuando timer de succes, dispara rango
    const result = concat(timer, rango);
    
    result.subscribe(x => console.log('result', x));
  }

  video7() {
    // * video 7: ciclo observable(next, error y complete)
    const myObservable = new Observable(subscriber => {
      // next cambia el valor
      subscriber.next(1);
      subscriber.next(2);
      subscriber.next(3);
      // si error, salta, se romple el ciclo..
      subscriber.error('error n.1')
      subscriber.complete();
    });

    const subs = myObservable.subscribe({
      next: x => console.log('el siguiente valor es', x),
      error: err => console.error('error', err),
      complete: () => console.log('suscripción completa')

    })

    subs.unsubscribe();

  }

  video8() {
    // * video 8: buffer time 
    // observable que emite valor cada medio segundo
    const timer = interval(500);

    // buffer almacena datos hasta que se cumple condición temporal
    // y ahi los dispara todos de golpe

    // se crea una pipe, fusionar funcs
    // ! buffer tiene dos valores, tiempo de almacenatiempo y tiempo de disparar valor
    const buffer = timer.pipe(bufferTime(2000, 1000));

    const subs = buffer.subscribe(val => console.log('buffer', val));
  }

  video9() {
    // * video 9: switch map
    // cuando das click vuelve a empezaar
    // nos permite interrumpir un observable, por eso es switch
    fromEvent(document, 'click').pipe(switchMap(() => interval(1000))).subscribe(console.log);



  }

}
