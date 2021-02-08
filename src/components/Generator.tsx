
import React, { useContext} from "react";
import { SvgContext } from "../contexts/SvgContext";
import { SvgState } from "../types/SvgState";
import { Generate, Optimize } from "../functions/functions"


export const Generator = ()  => {
    console.log("Generator")
    const ctx = useContext(SvgContext);
    if (ctx === null || ctx.state === null) {
        console.log("state null")
        return (<>haha</>);
    }
    let state:SvgState;
    state = ctx.state;
    console.log(state)

    const startOptimization = () => {
        const groupedRuns = Generate();
        console.log('GroupedRuns Generated IS:  ', groupedRuns);
        let counter = 0;
        do {
            let optimizedSet = Optimize(groupedRuns);
            console.log('optimizedSet: ', optimizedSet)
            //this.setState({ optimizedSet });
            counter++;
        } while (counter < 6);
    }



    return (
        <button type="submit" onClick={() => startOptimization()}  >
            Generate
        </button>
    );
    
}

