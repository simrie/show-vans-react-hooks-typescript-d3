import { SvgState } from "../types/SvgState";
import { VanRun } from "../types/transit-vans";


export type Action = 
 | { type: "reset" }
 | { type: "update"; vanRuns: VanRun[] }
;

export function StateReducer(state: SvgState, action: Action): SvgState {

    switch (action.type) {
    case 'reset': {
        return {
             ...state,
            optimizedSet: []
        }
    }
    case 'update': {
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