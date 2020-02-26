
import { onAction } from "../utils";

const history = [];
const MAX_HISTORY_LENGTH = 1000;
const onChangeListeners = [];

export const addToHistory = (item) => {
    history.push(item);
    if(history.length > MAX_HISTORY_LENGTH) {
        history.pop();
    }

    onChangeListeners.forEach(callback => callback(getHistory()));
}

export const getHistory = () => {
    return history.slice();
}

export const removeFromHistory = (item) => {

    const index = history.indexOf(item);

    if (index > -1) {
        history.splice(index, 1);
        onChangeListeners.forEach(callback => callback(history));
    }
}

export const revertHistory = () => {

    if(history?.length === 0) {
        return;
    }

    const record = history.pop();
    onChangeListeners.forEach(callback => callback(getHistory()));
    
    if (record?.key === "segment.point") {

        const { segment, from } = record.payload;

        if (segment) {
            onAction({
                type: "update",
                payload: {
                    item: segment,
                    values: {
                        point: from
                    }
                }
            });
        }
    }
}

export const onHistoryChange = (callback) => {
    onChangeListeners.push(callback);
}