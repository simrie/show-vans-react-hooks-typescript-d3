
import React, { useContext} from "react";
import { DispatchContext } from "../contexts/DispatchContext";
import { VanRun } from "../types/transit-vans";
import { GetVanRuns, Optimize } from "../functions/VanRunFnctions";


export const OptimizeBtn = ()  => {
    const { dispatch } = useContext(DispatchContext);
    if ( dispatch === null ) {
        return (<>dispathc is null</>);
    }

    const resetState = () => {
        dispatch({
            type: 'reset',
        })
    };

    const updateState = (optimizedSet:VanRun[]) => {
        dispatch({
            type: 'update',
            vanRuns: optimizedSet,
        })
    };

    const sleep = (milliseconds:number) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    const startOptimization = async() => {
        resetState();
        await sleep(1000);
        let groupedRuns:VanRun[] = GetVanRuns();
        console.log("GROUPED RUNS[0] ", groupedRuns[0]);
        let counter = 0;
        do {
            let optimizedSet:VanRun[] = Optimize(groupedRuns);
            console.log("OPTIMIZED SET[0] ", optimizedSet[0]);

            updateState(optimizedSet);

            // Sleep is here to give the svg a chance to visibly update after state is updated
            await sleep(1000);     
            counter++;
        } while (counter < 2);
    }

    return (
        <button type="submit" onClick={() => startOptimization()}  >
            Optimize Routes
        </button>
    );
    
}
