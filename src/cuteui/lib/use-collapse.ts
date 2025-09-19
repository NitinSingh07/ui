/* eslint-disable no-unused-expressions */
import { useState, useRef } from 'react';

export function useCollapse(duration: number = 200, defaultOpen: boolean = false) {
  const targetEl = useRef<HTMLElement | null>(null);
  const [open, setOpen] = useState(defaultOpen);
  const [openTargetEl, setOpenTargetEl] = useState(defaultOpen);

  function slideUp(target: HTMLElement) {
    target.style.setProperty('transition-property', 'height, margin, padding');
    target.style.setProperty('transition-duration', `${duration}ms`);
    target.style.setProperty('box-sizing', 'border-box');
    target.style.setProperty('height', `${target.offsetHeight}px`);
    target.offsetHeight; // Force reflow
    target.style.setProperty('overflow', 'hidden');
    target.style.setProperty('height', '0');
    target.style.setProperty('padding-top', '0');
    target.style.setProperty('padding-bottom', '0');
    target.style.setProperty('margin-top', '0');
    target.style.setProperty('margin-bottom', '0');
    // set custom delay to animated
    setOpen(() => false);
    window.setTimeout(() => {
      target.style.display = 'none';
      target.style.removeProperty('height');
      target.style.removeProperty('padding-top');
      target.style.removeProperty('padding-bottom');
      target.style.removeProperty('margin-top');
      target.style.removeProperty('margin-bottom');
      target.style.removeProperty('overflow');
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
      setOpenTargetEl(() => false);
    }, duration);
  }

  function slideDown(target: HTMLElement) {
    target.style.removeProperty('display');
    let { display } = window.getComputedStyle(target);
    if (display === 'none') display = 'block';
    target.style.display = display;
    const height = target.offsetHeight;
    target.style.setProperty('overflow', 'hidden');
    target.style.setProperty('height', '0');
    target.style.setProperty('padding-top', '0');
    target.style.setProperty('padding-bottom', '0');
    target.style.setProperty('margin-top', '0');
    target.style.setProperty('margin-bottom', '0');
    target.offsetHeight;
    target.style.boxSizing = 'border-box';
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = `${duration}ms`;
    target.style.height = `${height}px`;
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');
    // set custom delay to animated
    setOpen(() => true);
    window.setTimeout(() => {
      target.style.removeProperty('height');
      target.style.removeProperty('overflow');
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
      setOpenTargetEl(() => true);
    }, duration);
  }

  function toggle() {
    const target = targetEl.current;
    if (!target) return;

    if (open) {
      slideUp(target);
    } else {
      slideDown(target);
    }
    setOpen(!open);
  }

  return {
    open,
    targetEl,
    openTargetEl,
    slideUp,
    slideDown,
    toggle,
  };
}
