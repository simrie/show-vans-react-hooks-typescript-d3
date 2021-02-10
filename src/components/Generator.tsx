
import React, { useContext} from "react";
import { DispatchContext } from "../contexts/DispatchContext";
import { VanRun } from "../types/transit-vans";
import { Generate, Optimize } from "../functions/VanRunFnctions";


export const Generator = ()  => {
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
        let groupedRuns:VanRun[] = Generate();
        let counter = 0;
        do {
            let optimizedSet:VanRun[] = Optimize(groupedRuns);
            updateState(optimizedSet);
            // Sleep is here to give the svg a chance to visibly update after state is updated
            await sleep(1000);     
            counter++;
        } while (counter < 15);
    }

    return (
        <button type="submit" onClick={() => startOptimization()}  >
            Generate
        </button>
    );
    
}
