import { useState, useEffect, useContext, createContext } from "react";

// ���C���Ǘ��N���X
class LayerManager {
    // �R���X�g���N�^
    constructor() {
        // ���C����Ԃ�ۑ����邽�߂̃n�b�V���}�b�v
        this.layerMap = new Map();
        // �X�V�m�F�p
        this.layerStateCount = 0;
        this.setLayerStateCount = null;
    }
    // ���C��������
    activateLayer(layerName) {
        if (!this.layerMap.has(layerName)) {
            this.layerMap.set(layerName, false);
        }
        // �A�N�e�B�x�[�g
        this.layerMap.set(layerName, true);
        // �X�V�m�F�p
        this.setLayerStateCount(count => count + 1);
    };
    // ���C���񊈐���
    deactivateLayer(layerName) {
        if (!this.layerMap.has(layerName)) {
            this.layerMap.set(layerName, false);
        }
        // �f�B�A�N�e�B�x�[�g
        this.layerMap.set(layerName, false);
        // �X�V�m�F�p
        this.setLayerStateCount(count => count + 1);
    };
    // ���C���������ł��邩�ǂ������擾
    getLayerState(layerName) {
        if (!this.layerMap.has(layerName)) {
            this.layerMap.set(layerName, false);
        }
        return this.layerMap.get(layerName);
    }
};
// ���C���Ǘ��N���X�̃C���X�^���X�i�O���[�o���ɍ��Ȃ��Ɠ��삵�Ȃ��j
const layerManager = new LayerManager();

// ���C���Ǘ��̃R���e�L�X�g
const LayerContext = createContext();
// �X�V�m�F�p�̃R���e�L�X�g
const LayerStateCountContext = createContext();

// COP�����̂��߂�React Context�̗��p�����̂��߂̃R���|�[�l���g
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

// ���C���Ǘ��̎擾
export const useLayerManager = () => {
    const {layerStateCount, setLayerStateCount} = useContext(LayerStateCountContext);
    const layerManager = useContext(LayerContext);
    layerManager.setLayerStateCount = setLayerStateCount;
    layerManager.layerStateCount = layerStateCount;
    return layerManager;
};

// ���C��������Ԃ̎��ɓ��삷��useEffect
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

// ���C���񊈐���Ԃ̎��ɓ��삷��useEffect
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

// JSX�ł̃��C���L�q�̂��߂̃R���|�[�l���g
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
