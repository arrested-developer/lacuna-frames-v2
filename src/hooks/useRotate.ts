import { useState } from "react";
import useScrollPosition from "@react-hook/window-scroll";
import Tweezer from "tweezer.js";
/**
 * get scroll position and translate into degrees for rotation (0 <=rotation <= 360)
 * also returns a zoomFactor that oscillates between 0 and 1, reaching full zoom
 * at each 90 degree angle of rotation
 *
 * Note: this requires the page in question to have an outer container element with height set to 520vh
 * - it would be nice to somehow integrate this with the hook...
 */

const setRotation = (deg: number): void => {
  const current = window.scrollY;
  const max = window.innerHeight * 4.2;
  const scrollTo = (deg / 360) * max;
  new Tweezer({
    start: current,
    end: scrollTo,
  })
    .on("tick", (v) => window.scrollTo(0, v))
    .begin();
};

const useRotateWithScroll = (): {
  rotation: number;
  zoomFactor: number;
  setRotation: (deg: number) => void;
} => {
  const scrollY = useScrollPosition(50 /*fps*/);
  const windowHeight = window.innerHeight;
  const maxScroll = Math.floor(windowHeight * 4.19);
  if (scrollY >= maxScroll) {
    window.scrollTo(0, 1);
  }
  const rotation = Math.floor((scrollY / maxScroll) * 360);
  const zoomFactor = Math.abs(Math.cos((rotation / 180) * ((4 * Math.PI) / 2)));

  return { rotation, zoomFactor, setRotation };
};

const useRotateWithoutScroll = (): {
  rotation: number;
  zoomFactor: number;
  setRotation: (deg: number) => void;
} => {
  const [rotation, setRotationState] = useState(0);
  const zoomFactor = Math.abs(Math.cos((rotation / 180) * ((4 * Math.PI) / 2)));
  const setRotation = (deg: number) => {
    new Tweezer({
      start: rotation,
      end: deg,
    })
      .on("tick", (v) => setRotationState(v))
      .begin();
  };
  return { rotation, zoomFactor, setRotation };
};

const useRotate = (
  isScrollDisabled: boolean
): {
  rotation: number;
  zoomFactor: number;
  setRotation: (deg: number) => void;
} => {
  const withScroll = useRotateWithScroll();
  const withoutScroll = useRotateWithoutScroll();
  if (isScrollDisabled) {
    return {
      rotation: withoutScroll.rotation,
      zoomFactor: withoutScroll.zoomFactor,
      setRotation: withoutScroll.setRotation,
    };
  }
  return {
    rotation: withScroll.rotation,
    zoomFactor: withScroll.zoomFactor,
    setRotation: withScroll.setRotation,
  };
};

export default useRotate;
