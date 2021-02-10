import React, { useContext, useRef, useEffect } from "react";
import { SvgContext } from "../contexts/SvgContext";
import { SvgState } from "../types/SvgState";
import { VanRun } from "../types/transit-vans";
import { ConvertRidesToPaths } from "../functions/functions";
import { D3GeneralUpdatePattern } from "../functions/d3Functions";
import { BaseType } from "d3";


export const SvgGrid = ()  => {
    const svgRef = useRef<BaseType | unknown | HTMLElement | any>();
    const pathsContext = useContext(SvgContext);
    
    useEffect(() => {
        if (pathsContext === null || pathsContext.state === null || pathsContext.state.optimizedSet == null) {
             return
         }
         let state:SvgState = pathsContext.state;
         let optimizedSet:VanRun[]=state.optimizedSet;
         let paths = ConvertRidesToPaths(optimizedSet);;
         D3GeneralUpdatePattern(svgRef, paths);
    }, [pathsContext]);

    if (pathsContext === null || pathsContext.state === null || pathsContext.state.optimizedSet == null) {
        return (<>haha</>);
    }

    return (
        <svg 
            ref={svgRef}
            id="svgGrid"
            width={'300'} height={'400'} 
            >
        </svg>
    );
}

