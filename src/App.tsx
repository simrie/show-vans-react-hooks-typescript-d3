import React, { useMemo, useReducer } from "react";
import { DispatchContext } from "./contexts/DispatchContext";
import { SvgContext } from "./contexts/SvgContext";
import { SvgState } from "./types/SvgState";
import { SvgStateReducer } from "./functions/svgStateReducer";
import { SvgGrid } from './components/SvgGrid';
import { Generator } from './components/Generator';

import './App.css';
import './styles/svg.css';

function App() {

  const initialState: SvgState = {
   optimizedSet: []
  }

  const [ state, dispatch ] = useReducer(SvgStateReducer, initialState);

  const dispatchValue = useMemo(() => ({ dispatch }), [dispatch]);
  const svgContextValue = useMemo(() => ({ state }), [state]);


  return (
    <div className="App">
      <header className="App-header" >
      
        <p>        
          Transit Vans Route Optimization
        </p>
          <DispatchContext.Provider value={dispatchValue}>
          { svgContextValue &&
             <SvgContext.Provider value={svgContextValue}>
              <Generator />
              <SvgGrid />
            </SvgContext.Provider>
          }
          </DispatchContext.Provider>
      </header>
    </div>
  );
}

export default App;
