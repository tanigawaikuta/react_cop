import { useState, useEffect, useContext, createContext } from "react";

// レイヤ管理クラス
class LayerManager {
    // コンストラクタ
    constructor() {
        // レイヤ状態を保存するためのハッシュマップ
        this.layerMap = new Map();
        // 更新確認用
        this.layerStateCount = 0;
        this.setLayerStateCount = null;
    }
    // レイヤ活性化
    activateLayer(layerName) {
        if (!this.layerMap.has(layerName)) {
            this.layerMap.set(layerName, false);
        }
        // アクティベート
        this.layerMap.set(layerName, true);
        // 更新確認用
        this.setLayerStateCount(count => count + 1);
    };
    // レイヤ非活性化
    deactivateLayer(layerName) {
        if (!this.layerMap.has(layerName)) {
            this.layerMap.set(layerName, false);
        }
        // ディアクティベート
        this.layerMap.set(layerName, false);
        // 更新確認用
        this.setLayerStateCount(count => count + 1);
    };
    // レイヤが活性であるかどうかを取得
    getLayerState(layerName) {
        if (!this.layerMap.has(layerName)) {
            this.layerMap.set(layerName, false);
        }
        return this.layerMap.get(layerName);
    }
};
// レイヤ管理クラスのインスタンス（グローバルに作らないと動作しない）
const layerManager = new LayerManager();

// レイヤ管理のコンテキスト
const LayerContext = createContext();
// 更新確認用のコンテキスト
const LayerStateCountContext = createContext();

// COP実現のためのReact Contextの利用準備のためのコンポーネント
export const LayerProvider = ({children}) => {
    const [layerStateCount, setLayerStateCount] = useState(0);
    const value = {layerStateCount, setLayerStateCount};
    return (
        <LayerContext.Provider value={layerManager}>
            <LayerStateCountContext.Provider value={value}>
                {children}
            </LayerStateCountContext.Provider>
        </LayerContext.Provider>
    );
};

// レイヤ管理の取得
export const useLayerManager = () => {
    const {layerStateCount, setLayerStateCount} = useContext(LayerStateCountContext);
    const layerManager = useContext(LayerContext);
    layerManager.setLayerStateCount = setLayerStateCount;
    layerManager.layerStateCount = layerStateCount;
    return layerManager;
};

// レイヤ活性状態の時に動作するuseEffect
export const useEffectWithLayer = (callback, layerName, dependencys = undefined) => {
    const layerManager = useLayerManager();
    const newCallback = () => {
        if (layerManager.getLayerState(layerName)) {
            callback();
        }
    };
    useEffect(newCallback, dependencys);
    useEffect(newCallback, [layerManager.layerStateCount]);
};

// レイヤ非活性状態の時に動作するuseEffect
export const useEffectWithoutLayer = (callback, layerName, dependencys = undefined) => {
    const layerManager = useLayerManager();
    const newCallback = () => {
        if (!layerManager.getLayerState(layerName)) {
            callback();
        }
    };
    useEffect(newCallback, dependencys);
    useEffect(newCallback, [layerManager.layerStateCount]);
};

// JSXでのレイヤ記述のためのコンポーネント
export const Layer = ({name, children}) => {
    const layerManager = useLayerManager();

    if (layerManager.getLayerState(name)) {
        return (
            <div>
                {children}
            </div>
        );
    }
    else {
        return (
            <div>
            </div>
        );
    }
};
