# React COP

React用COPの実験プログラム。

## 動作確認方法

下記のコマンドを実行する。

```
$ npm install
$ npm start
```

## COPライブラリの解説

### `LayerProvider`

レイヤ定義やレイヤアクティベート・ディアクティベートが行われる可能性のあるコンポーネントは、下記のように`LayerProvider`で囲うこと。

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

`LayerManager`を使う際に使用する。`LayerManager`では、レイヤのアクティベート・ディアクティベート、レイヤアクティブ確認を行える。

```
const layerManager = useLayerManager();
// マウント時にレイヤAをアクティブにする
useEffect(() => {
    layerManager.activateLayer("LayerA");
}, []);
```

### useEffectWithLayer

`useEffect`のレイヤ対応版。第二引数で与えたレイヤがアクティブの場合のみ、コールバックの内容が実行される。第三引数の役割は`useEffect`の第二引数と同じ。ディアクティブ版の`useEffectWithoutLayer`もある。

```
const [buttonLabel, setButtonLabel] = useState("");
const onClickBase = () => { setCount(ct => ct + 1); };
const onClick = useRef(() => { onClickBase(); });

// レイヤAがアクティブになったら実行される
useEffectWithLayer(() => {
    // 状態の書き換え
    setButtonLabel("A");
    // onClickの書き換え
    onClick.current = () => {
        setText(preText => preText + "A");
        // ベース処理の呼び出し
        onClickBase();
    };
}, "LayerA", []);

```

### `Layer`コンポーネント

JSXの記述において、`Layer`コンポーネントで囲ったところは、`name`属性で指定したレイヤがアクティブな場合のみ有効である。

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

## ファイル構成

- src/
    - COPLib.js: COP機能を実現するためのライブラリ。
    - index.js: トップレベルのコンポーネントであり、`LayerProvider`を利用している。子コンポーネントとして、`App`を持つ。
    - App.js: マウント時に`LayerA`のアクティベートを行うコンポーネント。子コンポーネントとして、`Compornent1`、`Compornent2`を持つ。
    - Compornent1.js: ページ上部のカウンタ部分のコンポーネント。レイヤの切り替えによってカウント対象を変える。
    - Compornent2.js: ページ下部のレイヤ切替ボタンのコンポーネント。レイヤの切り替えによって押せるボタンを変える。

## 残課題

- `useEffectWithLayer`や`Layer`コンポーネントの再レンダリングが別のレイヤをアクティベート・ディアクティベートした際にも行われる
