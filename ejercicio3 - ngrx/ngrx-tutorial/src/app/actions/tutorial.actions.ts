import { Injectable } from '@angular/core'
import { Action } from '@ngrx/store' 
import { Tutorial } from '../models/tutorial.model'

// creación de dos constantes = types
export const ADD_TUTORIAL = '[TUTORIAL] Add'
export const REMOVE_TUTORIAL = '[TUTORIAL] Remove'

// crearemos una clase por cada una de nuestras acciones
export class AddTutorial implements Action {
    readonly  type = ADD_TUTORIAL

    // constructor nos ayuda a pasar el payload de data
    // si no pasas ningún tipo de info, puedes omitir el constructor
    constructor (public payload: Tutorial) {

    }
}

export class RemoveTutorial implements Action {
    readonly  type = REMOVE_TUTORIAL

    // constructor nos ayuda a pasar el payload de data
    // en delete solo necesitamos el index
    constructor (public payload: number) {

    }
}


// esto nos ayudará a accesar a esas acciones
export type Actions = AddTutorial | RemoveTutorial