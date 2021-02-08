import { VanRun,  VanRideItem } from "../types/transit-vans/index";

const transitVans = require('transit-vans');
const{ get, map, forEach } = require("lodash");

export const ConvertRidesToPaths = (vanRuns:VanRun[]):string[] => {
    console.log("ConvertRidesToPaths function");
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

const convertRidesToPath = (vanRun:VanRun):string => {
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
        console.log(pathAppend);
        svgPath = `${svgPath} ${pathAppend}`;
    })
    svgPath = `${svgPath} Z`;
    //svgPath="M150 0 L75 200 L225 200 Z";

    return svgPath;
}

export const Generate = ():VanRun[] => {
    const gridSize = 40;
    const knownLocationCount = 20;
    const ridesToCreate = 30;
    const generations = 5;
    const recombinations = 1;
    const Args = {
        gridSize,
        knownLocationCount,
        ridesToCreate,
        generations,
        recombinations
     };
     const groupedRuns = transitVans.generate(Args);
     console.log('groupedRuns is ', groupedRuns);
     return groupedRuns;
}


export const Optimize = (groupedRuns:VanRun[]):VanRun[] => {
    let optimizedSet = transitVans.optimize({ groupedRuns });
    return optimizedSet;
}