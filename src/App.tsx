import React, { useState, useMemo  } from "react";
import { SvgContext } from "./contexts/SvgContext";
import { SvgState } from "./types/SvgState";
import { SvgGrid } from './components/SvgGrid';
import { Generator } from './components/Generator';
import './App.css';
import './styles/svg.css';

function App() {
  const initialState: SvgState = {
    svgCalculations: [{"a": 1}]
  }

  const [ state, setState ] = useState(initialState)

  const svgContextValue = useMemo(() => ({ state }), [state]);

  return (
    <div className="App">
      <header className="App-header">
      
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
          Transit Vans Route Optimization
          { svgContextValue &&
             <SvgContext.Provider value={svgContextValue}>
              <Generator />
              <SvgGrid />
            </SvgContext.Provider>
          }
      </header>
    </div>
  );
}

export default App;
