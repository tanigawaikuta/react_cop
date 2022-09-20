# React COP

Experimental programs for realizing Context-oriented Programming(COP) on React project.

## Operation Instruction

You can run Samples following command:

```
$ npm install 
$ npm start
```

## ReactCOP Methods

### LayerManager

LayerManager provides the functionality of managing layer definitions and activation information.
Layer information is stored in the app as a hash map with layer names as keys and activation states as values.
Field variables contains layerStateCount and its setter to detect activation/deactivation calls on React.

`activateLayer`:
The method to use for layer activation. Pass string argument as layer name.
Set value of the layer held by the hash map to `true`, and add 1 to layerStateCount using setLayerStateCount.

`deactivateLayer`:
The method to use for layer deactivation. Pass string argument as layer name.
Set value of the layer name held by the hash map to `false`, and add 1 to layerStateCount using setLayerStateCount.

`getLayerState`:
A method to check layer activate information. 
Returns the activate information as a true/false based on the layer name passed as an argument .


### LayerProvider

This method is used to set a range of contextual information and layers deployment. This method uses a higher-order component(HOC) structure, one of react design patterns. HOC is a method that takes a component and returns a new component. LayerProvider takes child components and wraps them with two React context providers.
The first one, named LayerContext, provides layer information which contains layer names and layer's activation status expressed by boolean. With this context provider, child components are able to share the layer names and the status. The second one is called layerStatusCountContext, and it provides an useState's value and its setter. This context is only used in activateLayer and deactivateLayer methods. When the layer's activation status is manipulated, it adds 1 to the useState's value, and the updating on the value triggers re-rendering of components reflecting activated layers.
Define `LayerManager` and `layerStateCount` with useState to wrap children. 
This allows all child components of `LayerProvider` to use layer information and activation processes stored in `LayerManager`.
Components that may be layer defined and layer activated/deactivated should be enclosed in `LayerProvider` as shown below.
It often should set on top level of components such as <App />.

```
root.render(
  <React.StrictMode>
    <LayerProvider>
      <App />
    </LayerProvider>
  </React.StrictMode>
);
```

### useLayerManager   

Call before using `LayerManager` to activate/deactivate layers or check layer activation.
Store the values when called in layerStateCount and setLayerStateCount, and integrate layerStateCount and its setter into `LayerManager`.

```
const layerManager = useLayerManager();
// activate LayerA when this conponent mounted
useEffect(() => {
    layerManager.activateLayer("LayerA");
}, []);
```


### useEffectWithLayer

`useEffect` corresponding to the layer.  callback is executed only when the layer given in the second argument is active. The third argument is the same as the second argument of `useEffect`. There is also a deactivated version of `useEffectWithoutLayer`.

```
const [buttonLabel, setButtonLabel] = useState("");
const onClickBase = () => { setCount(ct => ct + 1); };
const onClick = useRef(() => { onClickBase(); });

// excute when LayerA is activated
useEffectWithLayer(() => {
    // rewrite state
    setButtonLabel("A");
    // define onClick behaviour
    onClick.current = () => {
        setText(preText => preText + "A");
        // calls base process
        onClickBase();
    };
}, "LayerA", []);
```


### Layer Component

A method for reflecting components and tags according to the layer activation status within JSX.
In the JSX description, the part enclosed by the `Layer` component is valid only when the layer specified by the `name` attribute is active.

```
return (
    <div>
        <Layer name="LayerA">
            <button disabled>LayerA</button>
            <button onClick={onClickB}>LayerB</button>
        </Layer>
        <Layer name="LayerB">
            <button onClick={onClickA}>LayerA</button>
            <button disabled>LayerB</button>
        </Layer>
    </div>
);
```
