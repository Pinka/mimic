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
                placement: 'left-start',
                strategy: 'fixed',
                modifiers: [
                    {
                        name: 'offset',
                        options: {
                            // offset: [0, 0],
                            offset: ({ placement, reference, popper }) => {
                                return [0, -reference.width];
                            },
                        },
                    }
                ],
            }
        );

        return () => {
            popperRef.current.destroy();
        }

    }, []);

    const togglePopup = () => {
        setIsOpen(prevValue => !prevValue, popperRef.current.forceUpdate());
    };

    return (
        <>
            <button
                ref={triggerRef}
                onClick={togglePopup}
            >
                Load Mimic
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
                                    <div key={key} tabIndex={0} onClick={() => props.onSelect(item)}>{item.name}</div>    
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