import React, { useState, useEffect, useLayoutEffect, useContext, createContext, Fragment } from "react";

class LayerManager {
    //Constructor
    constructor() {
        // Hash map for storing the state of layers
        this.layerMap = new Map();
        // To check update on de/activation
        this.layerStateCount = 0;
        this.setLayerStateCount = null; 
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


// This fuction finds all active layers in the hash map and return an array of layernames
const getActiveLayers = (layerManager) => {
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
// Managing LayerManager
// This function returns layerManager whihch contains layerStateCount and setLayerStateCount at runtime
export const useLayerManager = () => {
    const {layerStateCount, setLayerStateCount} = useContext(layerStateCountContext);
    const layerManager = useContext(LayerContext);
    layerManager.layerStateCount = layerStateCount;
    layerManager.setLayerStateCount = setLayerStateCount;
    return layerManager;
};


// useEffect for when the layer is active
export const useEffectWithLayer = (callback, layerNames, dependencys = undefined) => {
    const layerManager = useLayerManager();
    const activeLayers = getActiveLayers(layerManager);
    const areLayersActive = equals(layerNames, activeLayers);
    const newCallback = () => {
        if(areLayersActive) {
            callback();
        }
    };

    useEffect(newCallback, dependencys);
    useEffect(newCallback, [layerManager.layerStateCount]);
    // useLayoutEffect(newCallback, dependencys);
    // useLayoutEffect(newCallback, [layerManager.layerStateCount]);
};

// useEffect for when the layer is deactive
export const useEffectWithoutLayer = (callback, layerNames, dependencys = undefined) => {
    const layerManager = useLayerManager();
    const activeLayers = getActiveLayers(layerManager);
    const areLayersActive = equals(layerNames, activeLayers);
    const newCallback = () => {
        if(!areLayersActive) {
            callback();
        }
    };
        useEffect(newCallback, dependencys);
        useEffect(newCallback, [layerManager.layerStateCount]);
};



export const Layer = ({names, children}) => {
    const layerManager = useLayerManager();
    const activeLayers = getActiveLayers(layerManager);
    const areLayersActive = equals(names, activeLayers);

    if(areLayersActive) {
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

