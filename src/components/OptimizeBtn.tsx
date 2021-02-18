
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

    const max_optimization_passes = 0;

    const startOptimization = async() => {
        resetState();
        // Sleeping between optimizations so humans can see the changes
        await sleep(1000);
        let groupedRuns:VanRun[] = GetVanRuns();
        console.log("startOptimization groupedRuns: ", groupedRuns);
        let counter = 0;
        do {
            let optimizedSet:VanRun[] = Optimize(groupedRuns);
            console.log("OPTIMIZED SET[0]: ", optimizedSet[0]);

            updateState(optimizedSet);

            // Sleep is here to give the svg a chance to visibly update after state is updated
            await sleep(1000);     
            counter++;
        } while (counter < max_optimization_passes);
    }

    return (
        <button type="submit" onClick={() => startOptimization()}  >
            Optimize Routes
        </button>
    );
    
}
