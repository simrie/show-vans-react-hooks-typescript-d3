
import React, { useContext} from "react";
import { DispatchContext } from "../contexts/DispatchContext";
import { SvgContext } from "../contexts/SvgContext";
import { SvgState } from "../types/SvgState";
import { VanRun } from "../types/transit-vans";
import { Generate, Optimize } from "../functions/functions";


export const Generator = ()  => {
    console.log("Generator")
    const { dispatch } = useContext(DispatchContext);
    const ctx = useContext(SvgContext);
    if (ctx === null || ctx.state === null) {
        console.log("state null")
        return (<>state is null</>);
    }
    if ( dispatch === null ) {
        console.log("dispathc null")
        return (<>dispathc is null</>);
    }
    let state:SvgState;
    state = ctx.state;
    console.log(state)

    const updateSvgState = (optimizedSet:VanRun[]) => {
        dispatch({
            type: 'update',
            vanRuns: optimizedSet,
        })
    };

    const startOptimization = () => {
        const groupedRuns:VanRun[] = Generate();
        console.log('GroupedRuns Generated IS:  ', groupedRuns);
        let counter = 0;
        do {
            let optimizedSet:VanRun[] = Optimize(groupedRuns);
            console.log('optimizedSet: ', optimizedSet)
            //this.setState({ optimizedSet });
            updateSvgState(optimizedSet);
            counter++;
        } while (counter < 6);
    }



    return (
        <button type="submit" onClick={() => startOptimization()}  >
            Generate
        </button>
    );
    
}

