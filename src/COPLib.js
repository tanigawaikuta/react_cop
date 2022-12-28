import React, { useState, useEffect, useContext, createContext, Fragment } from "react";

class LayerManager {
    // Object for storing the state of layers
    #layerState = {};
    // To check update on de/activation
    #layerStateCount = 0;
    #setLayerStateCount = null;

    // Layer activation
    activateLayer(layerName) {
        if(!(layerName in this.#layerState)) {
            this.#layerState[layerName] = false;
        }
        // Activation
        this.#layerState[layerName] = true;
        // For checking update on activation
        this.notifyUpdatedLayerState();
    }

    // Layer deactivation
    deactivateLayer(layerName) {
        if(!(layerName in this.#layerState)) {
            this.#layerState[layerName] = false;
        }
        // Deactivation
        this.#layerState[layerName] = false;
        // For checking update on deactivation
        this.notifyUpdatedLayerState();
    }

    // Get the layer state
    getLayerState() {
        return this.#layerState;
    }

    // Get if the layer is activated
    isActiveLayer(layerName) {
        if(!(layerName in this.#layerState)) {
            this.#layerState[layerName] = false;
        }
        return this.#layerState[layerName];
    }

    // To check update on de/activation
    setLayerStateCounter(layerStateCount, setLayerStateCount) {
        this.#layerStateCount = layerStateCount;
        this.#setLayerStateCount = setLayerStateCount;
    }

    // To check update on de/activation
    getLayerStateCount() {
        return this.#layerStateCount;
    }

    notifyUpdatedLayerState() {
        this.#setLayerStateCount(count => count + 1); 
    }

};

// Context for managing layers
const LayerManagerContext = createContext();
// Context for checking update on de/activation
const layerStateCountContext = createContext();

// Component for preparing the use of Context to realize COP
export const LayerProvider = ({children}) => {
    //! useReducer may be efficient on this two useState
    const [layerManager] = useState (new LayerManager());
    const [layerStateCount, setLayerStateCount] = useState(0);
    const value = {layerStateCount, setLayerStateCount};

    return (
        <LayerManagerContext.Provider value={layerManager}>
            <layerStateCountContext.Provider value={value}>
                {children}
            </layerStateCountContext.Provider>
        </LayerManagerContext.Provider>
    );
};

// Managing LayerManager
// This function returns layerManager whihch contains layerStateCount and setLayerStateCount at runtime
export const useLayerManager = () => {
    const {layerStateCount, setLayerStateCount} = useContext(layerStateCountContext);
    const layerManager = useContext(LayerManagerContext);
    layerManager.setLayerStateCounter(layerStateCount, setLayerStateCount);
    return layerManager;
};

export const useLayerPrams = (initialValue, layers) => {
    const [layerPrams] = useState({});
    const [, setCount] = useState(0);
    const layerManager = useLayerManager();

    for (const layer of layers) {
        if (!(layer in layerPrams)) {
            layerPrams[layer] = initialValue;
        }
    }

    const getLayerPrams = (layerName = undefined) => {
        if (layerName !== undefined) {
            return layerPrams[layerName];
        } else {
            let activeLayer = "";
            for (const layer of layers) {
                if (layerManager.isActiveLayer(layer)) {
                    activeLayer = layer;
                    break;
                }
            }
            return layerPrams[activeLayer];
        }
    };

    const setLayerPrams = (newValueOrFunc, layerName = undefined) => {
        const currentValue = getLayerPrams(layerName);
        let newValue = newValueOrFunc;
        while ((typeof newValue) == "function") {
            newValue = newValueOrFunc(currentValue);
        }

        if (layerName !== undefined) {
            layerPrams[layerName] = newValue;
        } else {
            for (const layer of layers) {
                if (layerManager.isActiveLayer(layer)) {
                    layerPrams[layer] = newValue;
                }
            }
        }

        // re-render
        setCount((ct) => ct + 1);
    };

    return [getLayerPrams, setLayerPrams];
}

// useEffect for when the layer is active
export const useEffectWithLayer = (callback, condition, dependencys = []) => {
    const layerManager = useLayerManager();
    const count = layerManager.getLayerStateCount();
    const newDependencys = [count].concat(dependencys);
    const newCallback = () => {
        if(condition) {
            callback();
        }
    };

    useEffect(newCallback, newDependencys);
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
