# React COP

React上でCOPを実現する実験用プログラム。

## 開発環境

|ツール|バージョン|
|-|-|
|Node|`19.3.0` 以降|

## 動作確認方法

下記のコマンドを実行する。

```
$ npm install
$ npm start
```

## COPライブラリの解説

### LayerProvider

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

### useLayerParams

レイヤのアクティブ状況に応じて内容が切り替わる特殊な変数を定義する。第一引数が初期値で、第二引数がこの変数を使う可能性があるレイヤ名の配列である。第二引数で指定した配列の先頭のレイヤからアクティブかどうか調べ、アクティブなレイヤが見つかれば、そのレイヤに応じた内容に変数が切り替わる。アクティブなレイヤが無い場合はundefinedが返る。

変数には戻り値の`getter`、`setter`を用いてアクセスする。`getter`、`setter`にレイヤ名を入れた場合は、レイヤのアクティブ状況に関わらず、指定したレイヤに対応した内容を参照する。

```
const [text, setText] = useState("");
const [getButtonLabel, setButtonLabel] = useLayerParams("", ["LayerA", "LayerB"]);
const [getCount, setCount] = useLayerParams(0, ["LayerA", "LayerB"]);

useEffect(() => {
    setButtonLabel("A", "LayerA");
    setButtonLabel("B", "LayerB");
}, []);

const onClick = () => {
    setCount((ct) => ct + 1);
    setText((pre) => pre + getButtonLabel());
};

return (
    <div>
        <p>CountA: {getCount("LayerA")}</p>
        <p>CountB: {getCount("LayerB")}</p>
        <button onClick={onClick}>{getButtonLabel()}</button>
        <b> {text}</b>
    </div>
);

```

### useEffectWithLayer

`useEffect`のレイヤ対応版。第二引数で与えたレイヤの論理式が真の場合のみ、コールバックの内容が実行される。第三引数の役割は`useEffect`の第二引数と同じ。

```
const [buttonLabel, setButtonLabel] = useState("");
const layerManager = useLayerManager();
const layerState = layerManager.getLayerState();

// レイヤAがアクティブになったら実行される
useEffectWithLayer(() => {
    // 状態の書き換え
    setButtonLabel("A");
}, layerState.LayerA, []);

```

### Layerコンポーネント

JSXの記述において、`Layer`コンポーネントで囲ったところは、`condition`属性の論理式が真の場合のみ有効である。

```
const layerManager = useLayerManager();
const layerState = layerManager.getLayerState();

return (
    <div>
        <Layer condition={layerState.LayerA}>
            <button disabled>LayerA</button>
            <button onClick={onClickB}>LayerB</button>
        </Layer>
        <Layer condition={layerState.LayerB}>
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
