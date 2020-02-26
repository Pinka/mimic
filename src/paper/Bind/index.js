import React, { memo, useState } from "react";

import styles from './Bind.module.css';
import { addBinding, getItems } from "../utils";

const Bind = memo(() => {

    const [showBind, setShowBind] = useState(false);
    const [form, setForm] = useState({});
    const [availableItems, setAvailableItems] = useState([]);

    const onShowBind = () => {
        setAvailableItems(getItems().sort((a, b) => (a.name > b.name) ? 1 : -1));
        setShowBind(true);
    };

    const onCloseBind = () => {
        setShowBind(false);
    };

    const onChange = (event) => {

        const updatedForm = {
            ...form,
            [event.target.name]: event.target.value
        }

        setForm(updatedForm);
    };

    const onBind = () => {

        addBinding({
            item: availableItems.filter(item => item.name === form.item)[0],
            itemName: form.itemName,
            binding: {
                type: 'rest',
                ...form
            }
        });

        setShowBind(false);
    }

    if (!showBind) {
        return (
            <div className={styles.bind}>
                <button type="button" onClick={onShowBind}>Bind</button>
            </div>
        );
    }

    return (
        <div className={styles.bind}>
            <label htmlFor="item">Item Name</label>
            <select name="item" onChange={onChange}>
                {availableItems.map((item, key) =>
                    <option key={key} value={item.name}>{item.name}</option>
                )}
            </select>
            <label htmlFor="url">Url with JSON response</label>
            <input type="text" name="url" onChange={onChange}></input>
            <label htmlFor="sourceKey">Source Key</label>
            <input type="text" name="sourceKey" onChange={onChange}></input>
            <label htmlFor="destKey">Destination Key</label>
            <input type="text" name="destKey" onChange={onChange}></input>
            <div className={styles.actions}>
                <button type="button" onClick={onBind}>Bind</button>
                <button type="button" onClick={onCloseBind}>Cancel</button>
            </div>
        </div>
    );
});

export default Bind;
