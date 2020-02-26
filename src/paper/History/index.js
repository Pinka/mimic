import React, { memo, useState } from "react";
import { getHistory, onHistoryChange } from "../tools/history";

import styles from './History.module.css';

const History = memo(() => {

    const [history = [], setHistory] = useState(getHistory());
    onHistoryChange(history => {
        setHistory(history);
    });

    return (
        <ul className={styles.history}>
            {history.map((item, index) =>
                <li key={index}>
                    {/* {`${item.key}: x/y=${item.payload?.from.x}=>${item.payload?.to.x} y=${item.payload?.from.y}=>${item.payload?.to.y}`} */}
                    {`${item.key}: x/y = ${item.payload?.from.x}/${item.payload?.from.y} -> ${item.payload?.to.x}/${item.payload?.to.y}`}
                </li>
            )}
        </ul>
    );
});

export default History;
