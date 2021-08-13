import { Action } from '@ngrx/store'
import { Tutorial } from '../models/tutorial.model'
import * as TutorialActions from '../actions/tutorial.actions'

// podemos crear initial state
const initalState: Tutorial = {
    name: 'initial tutorial',
    url: 'http://google.com'
}

// crear reducer for tutorial
export function reducer(state: Tutorial[] = [initalState], action: TutorialActions.Actions) {

    // switch para determinar type of 
    // lo que definimos al final de tutorial action ts
    switch(action.type) {
        case TutorialActions.ADD_TUTORIAL:
            return [...state, action.payload];

        case TutorialActions.REMOVE_TUTORIAL:
            // el payload es el indice y dice que solo
            // queremos eliminar 1 con splice
            state.splice(action.payload, 1)
            return state;
        
        default:
            return state;
    }

}