import { VanRun } from "../types/transit-vans/index";
const transitVans = require('transit-vans');

export const GetSvgFromCalculations = (calculations:object[]):string => {
    let svg:string = "";

    return svg;
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