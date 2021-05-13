import React from "react";
import { createPopper } from "@popperjs/core";
import "./Popup.css";
import Portal from "../Portal";
// import FocusTrap from "focus-trap-react";

class Popup extends React.Component {
  constructor(props) {
    super(props);

    this.triggerRef = React.createRef();
    this.popupRef = React.createRef();

    this.state = {
      isOpen: false,
    };

    this.togglePopup = this.togglePopup.bind(this);
  }

  componentDidMount() {
    console.log(this.triggerRef.current);
    console.log(this.popupRef.current);

    this.popper = createPopper(this.triggerRef.current, this.popupRef.current, {
      placement: this.props.placement || "bottom-start",
      strategy: this.props.strategy || "fixed",
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [0, 8],
          },
        },
        ...(this.props.modifiers || []),
      ],
    });
  }

  componentWillUnmount() {
    this.popper.destroy();
  }

  togglePopup() {
    this.setState(
      (state) => {
        return {
          isOpen: !state.isOpen,
        };
      },
      () => {
        this.popper.forceUpdate();
      }
    );
  }

  render() {
    return (
      <React.Fragment>
        <div
          className="trigger"
          ref={this.triggerRef}
          onClick={this.togglePopup}
        >
          Open Popup
        </div>

        <Portal>
          <div className="popup__container" ref={this.popupRef}>
            {this.state.isOpen && (
              <React.Fragment>
                <div className="popup">
                  <div tabIndex={0}>I am the popup</div>
                </div>
              </React.Fragment>
            )}
          </div>
        </Portal>
      </React.Fragment>
    );
  }
}

export default Popup;
