import React from 'react'
import { select, scaleOrdinal, schemeCategory10 } from "d3";


export const D3GeneralUpdatePattern = (svgRef:React.MutableRefObject<any> | undefined, paths:string[]) => {
    if (svgRef === null || svgRef === undefined) {
        return;
    }
    if (svgRef.current === null || svgRef.current === undefined) {
        return;
    }
    if (paths === null || paths === undefined) {
        return;
    }

    // TODO:  Accommodate colors for more than 10 paths
    const pathColor = scaleOrdinal(schemeCategory10);

    const svg = select(svgRef.current);
    const svg_g = svg
      .selectAll("g")
      .data(paths);

    console.log('Paths count ', paths.length)  

    const svg_g_paths = svg_g.selectAll("path");

    // Use transitions is the paths already exist, otherwise cretae the paths
    if (svg_g_paths.size() > 0) {
        svg_g
        .join('g')
        .select("path")
        .transition()
        .attr('d', value => value);

    } else {
        svg_g
        .join("g")
        .attr("stroke", value => pathColor(value))
        .attr("strokeWidgth", "3px")
        .append("path")
        .attr('d', value => value);
    }
}

export const D3RemovePaths = (svgRef:React.MutableRefObject<any> | undefined) => {
    console.log("D3RemovePaths");
    if (svgRef === null || svgRef === undefined) {
        return;
    }
    if (svgRef.current === null || svgRef.current === undefined) {
        return;
    }
    const svg = select(svgRef.current);
    const svg_g = svg
      .selectAll("g")
      .data([])
      .join('g');
    
    console.log(svg_g)
}
