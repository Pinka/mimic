import React, { memo } from 'react';
// import paper from 'paper';
import { addLine, addCircle, addRect, addText, save, load } from '../utils';
// import { revertHistory } from '../tools/history';

import styles from './PaperTools.module.css';

const PaperTools = memo(() => {

    const tools = [
        { title: "Add Line", onClick: addLine },
        { title: "Add Circle", onClick: addCircle },
        { title: "Add Rect", onClick: addRect },
        { title: "Add Text", onClick: addText },
        { title: "Save", onClick: save },
        { title: "Load", onClick: load },
        // { title: "Undo", onClick: revertHistory },
        // { title: "Refresh Bindings", onClick: bind}
     ];

    return (
        <div className={styles.tools}>
            {tools.map((tool, index) =>
                <button
                    key={index}
                    className={styles.toolButton}
                    onClick={tool.onClick}>
                    {tool.title}
                </button>
            )}
        </div>
    );
});

export default PaperTools;
