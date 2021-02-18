import { VanRun,  VanRideItem, Point } from "../types/transit-vans/index";
import { D3PathMaker } from "../functions/D3Functions";

const transitVans = require('transit-vans');
const{ get, map, forEach, concat } = require("lodash");

export const ConvertRidesToPoints = (vanRuns:VanRun[]):string[] => {
    let paths:string[]  = map(vanRuns, convertRidesToPoints);
    return paths;
}

export const ConvertRidesToPaths = (vanRuns:VanRun[]):string[] => {
    let paths:string[] = map(vanRuns, convertRidesToPath);
    return paths;
}

const extractX = (vanRideItem:VanRideItem):number => {
    let value = get(vanRideItem, "origin.x");
    return value;
}

const extractY = (vanRideItem:VanRideItem):number => {
    let value = get(vanRideItem, "origin.y");
    return value;
}

const extractPoint = (vanRideItem:VanRideItem):Point => {
    let point:Point = [ extractX(vanRideItem), extractY(vanRideItem) ];
    return point;
}

const convertRidesToPoints = (vanRun:VanRun):( string | null ) => {
    let points:Point[] = [];
    let rideOrder = get(vanRun, "rideOrder", []);
    let pointMap = map(rideOrder, extractPoint);
    points = concat(points, pointMap)
    console.log("Van run : points ", vanRun.vanRunId, points);
    return D3PathMaker(points);
}

const convertRidesToPath = (vanRun:VanRun):string => {
    // We should be using D3 line function instead of building the path.
    let svgPath:string = "";
    let rideOrder = get(vanRun, "rideOrder", []);
    let xMap = map(rideOrder, extractX);
    let yMap = map(rideOrder, extractY);
    if (xMap.length === 0 || xMap.length !== yMap.length) {
        return "";
    }
    let pixelMultiplier=5;

    forEach(xMap, (val:number, key:number) => {
        let x = val * pixelMultiplier;
        let y = yMap[key] * pixelMultiplier;
        let mover = "L";
        if (key === 0) {
           mover = "M";
        }
        let pathAppend = `${mover}${x} ${y} `;
        svgPath = `${svgPath}${pathAppend}`;
    })
    svgPath = `${svgPath}Z`;
    return svgPath;
}

export const GetVanRuns = ():VanRun[] => {
    const gridSize = 40;
    const knownLocationCount = 10;
    const ridesToCreate = 20;
    const generations = 5;
    const recombinations = 2;
    const Args = {
        gridSize,
        knownLocationCount,
        ridesToCreate,
        generations,
        recombinations
     };
     const groupedRuns = transitVans.generate(Args);
     console.log("groupedRuns ", groupedRuns)
     return groupedRuns;
}


export const Optimize = (groupedRuns:VanRun[]):VanRun[] => {
    let optimizedSet = transitVans.optimize({ groupedRuns });
    return optimizedSet;
}