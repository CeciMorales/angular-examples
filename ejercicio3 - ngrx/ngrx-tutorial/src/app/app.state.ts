import { Tutorial } from './models/tutorial.model';

// si tuvieramos multiples models, aqui hariamos varios readonly
export interface AppState {
    readonly tutorial: Tutorial[];

}