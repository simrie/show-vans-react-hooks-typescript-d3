import { SvgState } from "../types/SvgState";
import { VanRun } from "../types/transit-vans";


export type Action = 
 | { type: "reset" }
 | { type: "update"; vanRuns: VanRun[] }
;

export function SvgStateReducer(state: SvgState, action: Action): SvgState {

    switch (action.type) {
    case 'reset': {
        return {
             ...state,
            optimizedSet: []
        }
    }
    case 'update': {
        console.log('update was called in the reducer')
        const { vanRuns } = action;
        return {
            ...state,
            optimizedSet: vanRuns,
        }
    }
    default:
        return {...state};
    }
}