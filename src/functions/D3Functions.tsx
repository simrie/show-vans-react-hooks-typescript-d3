import React from 'react'
import { select, scaleOrdinal, scaleLinear, schemeCategory10, axisBottom, axisRight, line } from "d3";
import { Point } from "../types/transit-vans/index";

const{ map } = require("lodash");

// Set the scales
const x_scaler = (width:number) => scaleLinear().domain([0, 40]).rangeRound([0, width]);
const  y_scaler = (height:number) => scaleLinear().domain([40, 0]).rangeRound([height, 0]);

const  point_scaler = (point:Point, height: number, width: number, margin: number):Point => {
    const x = x_scaler(width);
    const y = y_scaler(height);
    let scaledPoint:Point = [ x(point[0]), y(point[1]) ]
    return scaledPoint;
}

export const D3PathMaker = (points:Point[], height: number, width: number, margin: number):(string | null) => {
    // line generator usage example:  https://www.d3indepth.com/shapes/#line-generator
    const lineGenerator = line();
    // scale the points
    const scaledPoints = map(points, (point:Point) => point_scaler(point, height, width, margin));
    return lineGenerator(scaledPoints);
}

export const D3UpdatePaths = (svgRef:React.MutableRefObject<any> | undefined, paths:string[]) => {
    if (svgRef === null || svgRef === undefined) {
        return;
    }
    if (svgRef.current === null || svgRef.current === undefined) {
        return;
    }

    // TODO:  Accommodate colors for more than 10 paths
    const pathColor = scaleOrdinal(schemeCategory10);

    const svg = select(svgRef.current);
    const svg_g = svg
        .select("#van_routes")
        .selectAll("g")
        .data(paths);

    console.log('paths count ', paths.length)  

    const svg_g_paths = svg_g.selectAll("path");

    // Use transitions if the paths already exist, otherwise cretae the paths
    if (svg_g_paths.size() > 0) {
        svg_g
        .join('g')
        .select("path")
        .transition()
        .attr('d', value => value);

    } else {
        svg_g
        .join("g")
        .attr("class", "path")
        .attr("stroke", value => pathColor(value))
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
      .select("#van_routes")
      .selectAll("g")
      .data([])
      .join('g');
    
    console.log(svg_g)
}

export const D3AppendAxes = (svgRef:React.MutableRefObject<any> | undefined, height: number, width: number, margin: number) => {
    console.log("D3AppendAxes");
    if (svgRef === null || svgRef === undefined) {
        return;
    }
    if (svgRef.current === null || svgRef.current === undefined) {
        return;
    }
    const svg = select(svgRef.current);

    // Set the scales
    //const x = scaleLinear().domain([0, 40]).rangeRound([0, width]);
    const x = x_scaler(width);
    //const  y = scaleLinear().domain([40, 0]).rangeRound([height, 0]);
    const y = y_scaler(height);
    
    // Define the axes
    const  xAxis = axisBottom(x).ticks(5);
    const  yAxis = axisRight(y).ticks(5);

    // Add the X Axis
    svg.select("#x_axis")
        .append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(" + 0 + "," + height + ")")
        .call(xAxis);

    // Add the Y Axis
    svg.select("#y_axis")
        .append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + width  + "," + 0 + ")")
        .call(yAxis);
    
}
