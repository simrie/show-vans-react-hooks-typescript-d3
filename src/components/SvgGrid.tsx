import React, { useContext, useRef, useEffect } from "react";
//import { DispatchContext } from "../contexts/DispatchContext";
import { SvgContext } from "../contexts/SvgContext";
import { SvgState } from "../types/SvgState";
import { VanRun } from "../types/transit-vans";
import { ConvertRidesToPaths } from "../functions/functions";
import { CheckRef,D3GeneralUpdatePattern } from "../functions/d3Functions";
import { select, BaseType } from "d3";


export const SvgGrid = ()  => {
    console.log("Generator");
    //const { dispatch } = useContext(DispatchContext);
    const svgRef = useRef<BaseType | unknown | HTMLElement | any>();
    const ctx = useContext(SvgContext);
    

    useEffect(() => {
        const svg = select(svgRef.current);
        console.log("svgGrid svg.select ", svg);
        const g = svg.selectAll("g");
        console.log("svgGrid g.select ", g);
        CheckRef(svgRef);
        /*
        const circleData = [25, 30, 45, 60, 20];
        svg
          .selectAll("circle")
          .data(circleData)
          .join("circle")
          .attr("r", value => value)
          .attr("cx", value => value * 2)
          .attr("cy", value => value * 2)
          .attr("stroke", "red");
          */
         if (ctx === null || ctx.state === null || ctx.state.optimizedSet == null) {
             return
         }
         let state:SvgState;
         state = ctx.state;
         console.log(state)
         let optimizedSet:VanRun[]=state.optimizedSet;
         let paths = ConvertRidesToPaths(optimizedSet);
         console.log(paths);
         D3GeneralUpdatePattern(svgRef, paths);

      }, [ctx]);
    if (ctx === null || ctx.state === null || ctx.state.optimizedSet == null) {
        console.log("state null")
        return (<>haha</>);
    }



    /*
    if (svg === null) {
        return (<></>);
    }
    */
   /*
    return (
                <svg width={'200'} height={'200'}  id="Ebene_1" version="1.1" style={{display: 'inline-block'}} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" xmlSpace="preserve">
                    <g>
                        <defs>
                            <linearGradient id="MyGradient">
                                <stop offset="5%" stop-color="green" />
                                <stop offset="95%" stop-color="gold" />
                            </linearGradient>
                        </defs>
                        <rect fill="url(#MyGradient)" x="10" y="10" width="100" height="100" /> 
                    </g>
                    <g stroke-width="3px" stroke="red">
                        <path d="M17.1,27h-10v-0.5c2.3,0,2.3-1,2.3-3.5h5.5c0,2.5,0,3.5,2.3,3.5V27z M30,6v20c0,0.6-0.4,1-1,1H18c-0.6,0-1-0.4-1-1v-4H3&#xD;&#xA;&#x9;c-0.6,0-1-0.4-1-1V9c0-0.6,0.4-1,1-1l14,0V6c0-0.6,0.4-1,1-1l11,0C29.6,5,30,5.4,30,6z M17,20h3v-9v-1h-1h-2H4v10H17z M24.8,22.5&#xD;&#xA;&#x9;c0-0.7-0.6-1.2-1.2-1.2s-1.2,0.6-1.2,1.2s0.6,1.2,1.2,1.2S24.8,23.2,24.8,22.5z M28,10h-6v1h6V10z M28,8h-7c0.6,0,1,0.4,1,1h6V8z"/>
                    </g>
                </svg>
    );
    */
    
    /*
    return (
        <svg>
            <g stroke-width="3px" stroke="red">
                <path d="M150 0 L75 200 L225 200 Z" />
            </g>
        </svg>
    );
    */



    return (
        <svg 
            ref={svgRef}
            id="svgGrid"
            width={'300'} height={'400'} 
            >
        </svg>
    );
    
    
}

