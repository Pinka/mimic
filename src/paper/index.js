import React, { useEffect, memo, useRef, useContext } from 'react';
import paper from 'paper';
import { addGrid, load, bind, onAction, getMimicName } from './utils';
import { addToolSelect } from './tools/select';
import { ActiveMimicContext } from '../App';

const Paper = memo(() => {

    const ref = useRef();
    const actionQueue = useRef([]);
    const { dispatch } = useContext(ActiveMimicContext);

    useEffect(() => {

        const queue = actionQueue.current;

        paper.setup(ref.current);

        addToolSelect();
        addGrid();
        load();

        dispatch({
            type: 'SetMimicName',
            payload: getMimicName()
        });

        bind();

        paper.view.onFrame = (event) => {
            if (queue.length > 0) {

                const action = queue[queue.length - 1];
                onAction(action);

                const index = queue.indexOf(action);
                if (index > -1) {
                    queue.splice(index, 1);
                }
            }
        }

        setInterval(() => {
            bind();
        }, 5000);

        // TODO REMOVE
        setInterval(() => {

            new Array(10)
                .fill(null)
                .map((action, index) => ({
                    type: "update",
                    payload: {
                        itemName: "rect" + index,
                        values: {
                            fillColor: paper.Color.random()
                        }
                    }
                }))
                .forEach(action => {
                    queue.push(action);
                });

        }, 1000);

        // return () => {
        //     clearInterval();
        //     clearInterval();
        // }
    }, [dispatch]);

    return (
        <canvas ref={ref} resize="resize"></canvas>
    );
});

export default Paper;
