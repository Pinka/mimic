import React, { memo, useCallback, useContext } from "react";
import {
    addLine,
    addCircle,
    addRect,
    addText,
    save,
    createNew,
    getMimicLayer,
} from "../utils";
// import { revertHistory } from '../tools/history';

import styles from "./PaperTools.module.css";
import MimicList from "../../MimicList";
import { ActiveMimicContext } from "../../App";

const PaperTools = memo(() => {
    const { dispatch } = useContext(ActiveMimicContext);

    const onSelect = useCallback(
        (mimic) => {
            const mimicLayer = getMimicLayer();
            mimicLayer.importJSON(mimic.config);
            mimicLayer.data = {
                mimicName: mimic.name,
            };

            dispatch({
                type: "SetMimicName",
                payload: mimic.name,
            });

            console.log("mimic.name", mimic.name);
        },
        [dispatch]
    );

    const tools = [
        { title: "Name", component: (props) => <MimicName {...props} /> },
        { title: "New", onClick: createNew },
        { title: "Load", onSelect: onSelect, component: MimicList },
        { title: "Save", onClick: save },
        { title: "Add Text", onClick: addText },
        { title: "Add Line", onClick: addLine },
        { title: "Add Circle", onClick: addCircle },
        { title: "Add Rect", onClick: addRect },
        // { title: "Undo", onClick: revertHistory },
        // { title: "Refresh Bindings", onClick: bind}
    ];

    return (
        <div className={styles.tools}>
            {tools.map((tool, index) => {
                const Component = tool.component;

                if (tool.component) {
                    return (
                        <Component
                            key={index}
                            className={styles.toolButton}
                            onClick={tool.onClick}
                            onSelect={tool.onSelect}
                        />
                    );
                }

                return (
                    <button
                        key={index}
                        className={styles.toolButton}
                        onClick={tool.onClick}
                    >
                        {tool.title}
                    </button>
                );
            })}
        </div>
    );
});

const MimicName = () => {
    const { state } = useContext(ActiveMimicContext);

    return <div className="mimic-name">{state.name}</div>;
};

export default PaperTools;
