import React, { HTMLAttributes, memo, useRef } from "react";
import { useAlphaSlider, ColorState } from "@atomik-color/core";
import styles from "./styles.module.css";
import commonStyles from "../common.module.css";

const ALPHA_MAX = 100;

interface Props extends HTMLAttributes<HTMLDivElement> {
  state: ColorState;
}

const AlphaSlider: React.FC<Props> = memo(
  ({ state, ...props }) => {
    const ref = useRef<HTMLDivElement>(null);
    const { sliderProps } = useAlphaSlider({ ref, state });
    return (
      <div
        {...props}
        {...sliderProps}
        className={[
          styles.container,
          commonStyles.transBackground,
          props.className || "",
        ].join(" ")}
        ref={ref}
      >
        <div
          className={[commonStyles.overlay, styles.sliderOverlay].join(" ")}
          style={{
            backgroundImage: `linear-gradient(to right, transparent, #${state.color.hex})`,
          }}
        />
        <div
          className={[commonStyles.thumb, styles.thumb].join(" ")}
          style={{
            left: (100 * state.color.a) / ALPHA_MAX + "%",
            background: state.color.str,
          }}
        />
      </div>
    );
  }
  // (prev, next) => prev.state.color.a === next.state.color.a
);

export default AlphaSlider;
