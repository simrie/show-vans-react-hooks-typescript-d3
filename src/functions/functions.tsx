import { VanRun } from "../types/transit-vans/index";
const transitVans = require('transit-vans');

export const ConvertRidesToPath = (vanRun:VanRun):string => {
    let svgPath:string = "";
    svgPath="M150 0 L75 200 L225 200 Z";
    return svgPath;
}

export const Generate = ():VanRun[] => {
    console.log("generate function")
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