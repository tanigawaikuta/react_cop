import React, { useState, useEffect, useLayoutEffect, useContext, createContext, Component, Fragment } from "react";

class LayerManager {
    //Constructor
    constructor() {
        // Hash map for storing the state of layers
        this.layerMap = new Map();
        // To check update on de/activation
        this.layerStateCount = 0;
        this.setLayerStateCount = null;
        this.layerPrams = {}; 
    }

    // Layer activation
    activateLayer(layerName) {
        if(!this.layerMap.has(layerName)) {
            this.layerMap.set(layerName, false);
        }
        // Activation
        this.layerMap.set(layerName, true);
        // For checking update on activation
        this.setLayerStateCount(count => count + 1);
    }

    // Layer deactivation
    deactivateLayer(layerName) {
        if(!this.layerMap.has(layerName)) {
            this.layerMap.set(layerName, false);
        }
        // Deactivation
        this.layerMap.set(layerName, false);
        // For checking update on deactivation
        this.setLayerStateCount(count => count + 1); 
    }

    // Get if the layer is activated
    getLayerState(layerName) {
        if(!this.layerMap.has(layerName)) {
            this.layerMap.set(layerName, false);
        }
        return this.layerMap.get(layerName);
    }

};

// Context for managing layers
const LayerContext = createContext();
// Context for checking update on de/activation
const layerStateCountContext = createContext();

let calledCount = -1;

export const useLayerPrams = (initialValue, layers) => {
    const layerManager = useLayerManager();
    const activeLayer = getActiveLayers(layerManager);
    const [count, setCount] = useState(0);
    const [value, setValue] = useState(0);
    let currentCount, temporaryLayerPrams = {}; 
    
    const init = () => {
        console.log(`init ____ ${calledCount}`)
        if(temporaryLayerPrams[calledCount] === undefined) temporaryLayerPrams[calledCount] = {};
        if(layerManager.layerPrams[calledCount] === undefined) layerManager.layerPrams[calledCount] = {};
        for(let layer of layers) {
            if(temporaryLayerPrams[calledCount][layer] === undefined) {
                Object.assign(temporaryLayerPrams, {[calledCount]: {[layer]: initialValue}});
            };
            Object.assign(layerManager.layerPrams[calledCount], temporaryLayerPrams[calledCount]);
        }
    };


    const updateLayerPrams = (value, count, currentActiveLayer) => {
        layerManager.layerPrams[count][currentActiveLayer] = value;
    };

    const getLayerPrams = (count, currentActiveLayer) => {
        setValue(layerManager.layerPrams[count][currentActiveLayer]);
        resetCount();
    };
    
    const resetCount = () => {
        calledCount = -1;
    }

    const setLayerPramsWithSpecificCount = (value) => {
        console.log(`THIS IS CURRENT VALUE _______ ${currentCount}`)
        const currentActiveLayers = getActiveLayers(layerManager)
        console.log(currentActiveLayers)
        updateLayerPrams(value, currentCount, currentActiveLayers);
        getLayerPrams(currentCount, currentActiveLayers);
        // setCount(currentCount);
    };

    const getLayerPramsWithSprecificCount = () => {
        const currentActiveLayer = getActiveLayers(layerManager);
        return layerManager.layerPrams[count][currentActiveLayer]
    }


    useEffect(() => {
        getLayerPrams(currentCount);
        resetCount();
    });


    // useEffect(() => {
    //     setValue(layerManager.layerPrams[count][activeLayer])
    // }, [count]);


    calledCount++;
    currentCount = calledCount;
    if(layerManager.layerPrams[calledCount] === undefined) init();
    console.log(layerManager.layerPrams)
    console.log(`_______THIS IS CALLED COUNT __________${calledCount}`)
    return [getLayerPramsWithSprecificCount, setLayerPramsWithSpecificCount];
    
}







// Component for preparing the use of Context to realize COP
export const LayerProvider = ({children}) => {
    //! useReducer may be efficient on this two useState
    const [layerManager] = useState (new LayerManager());
    const [layerStateCount, setLayerStateCount] = useState(0);
    const value = {layerStateCount, setLayerStateCount};

    return (
        <LayerContext.Provider value={layerManager}>
            <layerStateCountContext.Provider value={value}>
                {children}
            </layerStateCountContext.Provider>
        </LayerContext.Provider>
    );
};

// Managing LayerManager
// This function returns layerManager whihch contains layerStateCount and setLayerStateCount at runtime
export const useLayerManager = () => {

    const {layerStateCount, setLayerStateCount} = useContext(layerStateCountContext);
    const layerManager = useContext(LayerContext);
    layerManager.layerStateCount = layerStateCount;
    layerManager.setLayerStateCount = setLayerStateCount;
    return layerManager;
};


// This fuction finds all active layers in the hash map and return an array of layernames
export const getActiveLayers = (layerManager) => {
    const activeLayers = [];

    //* find active layers
    layerManager.layerMap.forEach((state, name) => {
        if(state) activeLayers.push(name);
    });
    
    return activeLayers;
}

// This function compares all elements which are not in order in two arrays and return true if the arrays are same 
const equals = (a, b) => {
    if (a.length !== b.length) {
        return false;
    }

    var seen = {};
    a.forEach(function(v) {
        var key = (typeof v) + v;
        if (!seen[key]) {
            seen[key] = 0;
        }
        seen[key] += 1;
    });

    return b.every(function(v) {
        var key = (typeof v) + v;
        if (seen[key]) {
            seen[key] -= 1;
            return true;
        }
    });
}

// useEffect for when the layer is active
export const useEffectWithLayer = (callback, condition, dependencys = undefined) => {
    const layerManager = useLayerManager();
    const newCallback = () => {
        if(condition) {
            callback();
        }
    };

    useEffect(newCallback, dependencys);
    useEffect(newCallback, [layerManager.layerStateCount]);
};




export const Layer = ({condition, children}) => { 
    if(condition) {
        return(
            <Fragment>
                {children}
            </Fragment>
        );
    }
    else {
        return(
            <Fragment></Fragment>
        );
    }
};

export const Layer2 = ({parentName, layerDetail}) => {    
    //* find active layers
    const [layerManager, activeLayers] = getActiveLayers(layerManager);

    //* return react component with details depends on active layer and parent name
    const baseLayer = Object.keys(layerDetail)[0]
    const [currentActiveLayer, setCurrentActiveLayer] = useState(baseLayer);
    const activeComponents = [[baseLayer, layerDetail[currentActiveLayer][parentName].child]];

    useLayoutEffect(()=>{
        activeLayers.forEach((activeLayer) => {
            setCurrentActiveLayer(activeLayer);
            activeComponents.push([activeLayer, layerDetail[activeLayer][parentName].child]);
        })
    }, [layerManager.layerStateCount]);


    console.log(activeComponents);
    for(let index in activeComponents) {
        const [activeLayerName, ActiveComponent] = activeComponents[index];
        console.log(activeComponents[index]);
        console.log(ActiveComponent)
        return (
            <ActiveComponent />
            // <Layer name={activeLayerName}>
            //     <ActiveComponent />
            // </Layer>
        )
    }
    
};



