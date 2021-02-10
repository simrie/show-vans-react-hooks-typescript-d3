import React from 'react'
import { select } from "d3";

export const CheckRef = (svgRef:React.MutableRefObject<any>) => {
    const svg = select(svgRef.current);
    console.log("checkRef svg.select ", svg);
    const g = svg.selectAll("g");
    console.log("checkRef g.selectAll ", g);
}

export const D3GeneralUpdatePattern = (svgRef:React.MutableRefObject<any> | undefined, paths:string[]) => {
    console.log("D3GeneralUpdatePattern svgRef, paths: ", svgRef, paths);
    if (svgRef === null || svgRef === undefined) {
        return;
    }
    if (svgRef.current === null || svgRef.current === undefined) {
        return;
    }
    if (paths === null || paths === undefined) {
        return;
    }

    const svg = select(svgRef.current);
    console.log("D3GeneralUpdatePattern svg.select ", svg);
    //const g = svg.selectAll("g");
   // console.log("D3Selector g.selectAll ", g);
    /*
            <g strokeWidth="3px" stroke="yellow" color="yellow">
                <path d={paths[0]} />
            </g>
            <g strokeWidth="3px" stroke="green" color="yellow">
                <path d={paths[1]} />
            </g>
    */
    svg
      .selectAll("g")
      .data(paths)
      .join("g")
      .attr("stroke", "red")
      .attr("strokeWidgth", "3px")
      .append("path")
      .attr('d', value => value);
      
}
