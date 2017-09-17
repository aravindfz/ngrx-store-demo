import { ActionReducer, Action } from '@ngrx/store';
import { AppStore } from "./app.store";
import { Demo } from "app/demo.component/demo.model";

export class ACTIONS {
    static LOAD_DATA: string = 'LOAD_DATA';
    static MODIFY_DATA: string = 'MODIFY_DATA';
}
export enum ACTION {
    LOAD_STUDENT,
    DELETE_STUDENT
}

let initialState = [];

export function demoSlice(state: Demo[], action: Action): Demo[] {
    if (state === void 0) { return initialState; };
    switch (action.type) {
        case ACTIONS.LOAD_DATA:
            return action.payload.demoSlice;
        default:
            return state;
    }
}
