import React, { useRef } from 'react'
const { d3 } = require('d3');

export const CheckRef = () => {
    const svgParent = useRef();
    console.log("checkRef svgParent ", svgParent);
}

export const D3Selector = (parent:React.RefObject<HTMLElement> | undefined) => {
    console.log("D3Selector parent ", parent);
    if (parent === null || parent === undefined) {
        return;
    }
    if (parent.current === null || parent.current === undefined) {
        return;
    }

    const d3sel = d3.Select(parent.current).Select("svg");
    console.log("D3Selector svg ", d3sel);
}
