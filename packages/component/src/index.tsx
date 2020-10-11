import React, { forwardRef } from "react";
import ColorBoard from "./ColorBoard";
import HueSlider from "./Sliders/HueSlider";
import AlphaSlider from "./Sliders/AlphaSlider";
import { useColorState, UseColorProps } from "@atomik-color/core";
import Preview from "./Preview";
import styles from "./index.module.css";
import Params from "./Params";

interface Props extends UseColorProps {
  showPreview?: boolean;
  showParams?: boolean;
}

const ColorPicker = forwardRef<HTMLDivElement, Props>(
  ({ showPreview = true, showParams = false, ...props }, ref) => {
    const state = useColorState(props);

    return (
      <div className={styles.container} role="group" ref={ref}>
        <ColorBoard style={{ marginBottom: "10px" }} state={state} />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ flex: 1 }}>
            <HueSlider style={{ marginBottom: "10px" }} state={state} />
            <AlphaSlider state={state} />
          </div>
          {showPreview && <div style={{ width: "10px" }} />}
          {showPreview && <Preview color={state.color.str} />}
        </div>
        {showParams && <Params state={state} />}
      </div>
    );
  }
);

export default ColorPicker;
