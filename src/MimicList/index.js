import React, { useEffect, useRef, useState } from 'react';
import { createPopper } from "@popperjs/core";
import './Popup.css';
import Portal from "../Portal";
import FocusTrap from "focus-trap-react";
import { getMimicsList } from '../paper/utils';

const MimicList = (props) => {

    const triggerRef = useRef();
    const popupRef = useRef();
    const popperRef = useRef();
    const [isOpen, setIsOpen] = useState(false);
    const [mimicList, setMimicList] = useState([]);

    useEffect(() => {
        getMimicsList().then(setMimicList);
    }, []);

    useEffect(() => {

        popperRef.current = createPopper(
            triggerRef.current,
            popupRef.current,
            {
                placement: 'bottom-start',
                strategy: 'fixed'
            }
        );

        return () => {
            popperRef.current.destroy();
        }

    }, []);

    const togglePopup = () => {
        setIsOpen(prevValue => {

            setTimeout(() => {
                popperRef.current.forceUpdate();
            }, 10);

            return !prevValue;
        });
    };

    return (
        <>
            <button
                ref={triggerRef}
                className={props.className}
                onClick={togglePopup}
            >
                Load
                </button>

            <Portal>
                <div className="popup__container" ref={popupRef}>
                    {isOpen &&
                        <FocusTrap focusTrapOptions={{
                            onDeactivate: togglePopup,
                            clickOutsideDeactivates: true,
                        }}>
                            <div className="popup">
                                {(mimicList || []).map((item, key) =>
                                    <div className="popup-item" key={key} tabIndex={0} onClick={() => props.onSelect(item)}>{item.name}</div>
                                )}
                            </div>
                        </FocusTrap>
                    }
                </div>
            </Portal>
        </>
    );
};

export default MimicList;