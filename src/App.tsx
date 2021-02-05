import React, { useState, useMemo  } from "react";
import { SvgContext } from "./contexts/SvgContext";
import { SvgState } from "./types/SvgState";
import { SvgGrid } from './components/SvgGrid'
import './App.css';

function App() {
  const initialState: SvgState = {
    svgCalculations: [{"a": 1}]
  }

  const [ state, setState ] = useState(initialState)

  const contextValue = useMemo(() => ({ state }), [state]);

  return (
    <div className="App">
      <header className="App-header">
      
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
          Learn React
          { contextValue &&
             <SvgContext.Provider value={contextValue}>
              <SvgGrid />
            </SvgContext.Provider>
          }
      </header>
    </div>
  );
}

export default App;
