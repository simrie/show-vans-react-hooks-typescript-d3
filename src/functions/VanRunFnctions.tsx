import { VanRun,  VanRideItem, Point } from "../types/transit-vans/index";
import { D3PathMaker } from "../functions/D3Functions";

const transitVans = require('transit-vans');
const{ get, map, concat } = require("lodash");

export const ConvertRidesToPoints = (vanRuns:VanRun[], height: number, width: number, margin: number):string[] => {
    const paths:string[]  = map(vanRuns, (vanRun:VanRun) => convertRidesToPoints(vanRun, height, width, margin));
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

const convertRidesToPoints = (vanRun:VanRun, height: number, width: number, margin: number):( string | null ) => {
    let points:Point[] = [];
    let rideOrder = get(vanRun, "rideOrder", []);
    let pointMap = map(rideOrder, extractPoint);
    points = concat(points, pointMap)
    console.log("Van run : points ", vanRun.vanRunId, points);
    return D3PathMaker(points, height, width, margin);
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