import React, { useContext } from "react";
import { SvgContext } from "../contexts/SvgContext";
import { SvgState } from "../types/SvgState";
import { GetSvgFromCalculations } from "../functions/functions"


export const SvgGrid = ()  => {
    console.log("SvgGrid")
    const ctx = useContext(SvgContext);
    if (ctx === null || ctx.state === null || ctx.state.svgCalculations == null) {
        console.log("state null")
        return (<>haha</>);
    }
    let state:SvgState;
    state = ctx.state;
    console.log(state)
    let calculations:object[]=state.svgCalculations;
    let svg:string = GetSvgFromCalculations(calculations)
    /*
    if (svg === null) {
        return (<></>);
    }
    */
    return (
        <svg width="120" height="120" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="MyGradient">
                    <stop offset="5%" stop-color="green" />
                    <stop offset="95%" stop-color="gold" />
                </linearGradient>
            </defs>
            <rect fill="url(#MyGradient)" x="10" y="10" width="100" height="100" />
        </svg>
    );
    /*
    return (
                <svg width ={'200'} height ={'200'}  id= "Ebene_1" version="1.1" style={{display: 'inline-block'}} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" xmlSpace="preserve">
                        <path d="M17.1,27h-10v-0.5c2.3,0,2.3-1,2.3-3.5h5.5c0,2.5,0,3.5,2.3,3.5V27z M30,6v20c0,0.6-0.4,1-1,1H18c-0.6,0-1-0.4-1-1v-4H3&#xD;&#xA;&#x9;c-0.6,0-1-0.4-1-1V9c0-0.6,0.4-1,1-1l14,0V6c0-0.6,0.4-1,1-1l11,0C29.6,5,30,5.4,30,6z M17,20h3v-9v-1h-1h-2H4v10H17z M24.8,22.5&#xD;&#xA;&#x9;c0-0.7-0.6-1.2-1.2-1.2s-1.2,0.6-1.2,1.2s0.6,1.2,1.2,1.2S24.8,23.2,24.8,22.5z M28,10h-6v1h6V10z M28,8h-7c0.6,0,1,0.4,1,1h6V8z"/>
                </svg>
    );
    */
}

