
import React, { useContext} from "react";
import { DispatchContext } from "../contexts/DispatchContext";
import { VanRun } from "../types/transit-vans";
import { Generate, Optimize } from "../functions/functions";


export const Generator = ()  => {
    const { dispatch } = useContext(DispatchContext);
    if ( dispatch === null ) {
        return (<>dispathc is null</>);
    }

    const updateSvgState = (optimizedSet:VanRun[]) => {
        dispatch({
            type: 'update',
            vanRuns: optimizedSet,
        })
    };

    const sleep = (milliseconds:number) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    const startOptimization = async() => {
        let groupedRuns:VanRun[] = Generate();
        let counter = 0;
        do {
            let optimizedSet:VanRun[] = Optimize(groupedRuns);
            updateSvgState(optimizedSet);
            // Sleep is here to give the svg a chance to visibly update after state is updated
            await sleep(2000);     
            counter++;
        } while (counter < 15);
    }

    return (
        <button type="submit" onClick={() => startOptimization()}  >
            Generate
        </button>
    );
    
}
