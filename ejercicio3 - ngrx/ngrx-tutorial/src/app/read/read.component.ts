import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs'
import { Store } from '@ngrx/store';
import { Tutorial } from './../models/tutorial.model';
import { AppState } from './../app.state';
import * as TutorialActions from './../actions/tutorial.actions';


@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss']
})
export class ReadComponent implements OnInit {

  tutorials: Observable<Tutorial[]>
  constructor(private store: Store<AppState>) { 
    // esta es la forma en como podemos acceder a la store
    // ese tutorial viene de app.module.ts donde lo defininos en el root
    // donde hacemos un bind de nuestro reducer a esa variable..
    this.tutorials = store.select('tutorial');
  }

  delTutorial(index: any) {
    this.store.dispatch(new TutorialActions.RemoveTutorial(index));


  }


  ngOnInit(): void {
  }

}
