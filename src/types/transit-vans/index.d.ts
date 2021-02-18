declare module 'transit-vans';


export interface VanStop {
    id: number;
    name: string;
    x: number;
    y: number;
}

export interface VanRideItem {
    rideId: number;
    vanRunId: number;
    origin: VanStop;
    destination: VanStop;
}

export interface VanRun {
    vanRunId: number;
    endDestination: VanStop;
    rideOrder: VanRideItem[];
}

export type Point = [ x: number, y: number ];


