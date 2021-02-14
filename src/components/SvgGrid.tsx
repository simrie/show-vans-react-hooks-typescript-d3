import React, { useContext, useRef, useEffect } from "react";
import { SvgContext } from "../contexts/SvgContext";
import { SvgState } from "../types/SvgState";
import { VanRun } from "../types/transit-vans";
import { ConvertRidesToPaths } from "../functions/VanRunFnctions";
import { D3UpdatePaths, D3RemovePaths, D3AppendAxes } from "../functions/D3Functions";
import { BaseType } from "d3";


export const SvgGrid = ()  => {
    const svgRef = useRef<BaseType | unknown | HTMLElement | any>();
    const pathsContext = useContext(SvgContext);
    const margin = 25;
    let width = 200;
    let height = 200;

    useEffect(() => {
        // Append axes just once
         D3AppendAxes(svgRef, height, width, margin);
    }, [height, width, margin]);
    
    useEffect(() => {
        // update paths whenever they change
        if (pathsContext === null || pathsContext.state === null || pathsContext.state.optimizedSet == null) {
             return
        }
        if (pathsContext.state.optimizedSet == null || pathsContext.state.optimizedSet.length === 0) {
            D3RemovePaths(svgRef);
            return;
        }
        // Append axes
        // D3AppendAxes(svgRef, height, width);
        let state:SvgState = pathsContext.state;
        let optimizedSet:VanRun[]=state.optimizedSet;
        let paths = ConvertRidesToPaths(optimizedSet);;
        D3UpdatePaths(svgRef, paths);
    }, [pathsContext]);

    if (pathsContext === null || pathsContext.state === null || pathsContext.state.optimizedSet == null) {
        return (<>haha</>);
    }

    return (
        <svg 
            ref={svgRef}
            id="svgGrid"
            width={width + margin} 
            height={height + margin} 
            >
            <g id="van_routes"
                transform="translate({margin},{margin})">
            </g>
            <g id="x_axis"
            >
            </g>
            <g id="y_axis"
            ></g>   
        </svg>
    );
}

