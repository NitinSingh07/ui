import { MouseEvent, FocusEvent, MutableRefObject, useState } from 'react';

export const getElementOffset = (el?: HTMLElement | null | undefined) => {
  if (!el)
    return {
      top: 0,
      left: 0,
    };
  const { top, left } = el.getBoundingClientRect();
  return { top, left };
};

export interface ReactiveDomReact {
  top: number;
  left: number;
  right: number;
  width: number;
  height: number;
  elementTop: number;
}
const defaultRect: ReactiveDomReact = {
  top: -1000,
  left: -1000,
  right: -1000,
  width: 0,
  height: 0,
  elementTop: -1000,
};

const getRectFromDOMWithContainer = (
  domRect?: DOMRect,
  getContainer?: () => HTMLElement | null
): ReactiveDomReact => {
  if (!domRect) return defaultRect;
  const container = getContainer ? getContainer() : null;
  const scrollElement = container || document.documentElement;
  const { top: offsetTop, left: offsetLeft } = getElementOffset(container);

  return {
    ...domRect,
    width: domRect.width || domRect.right - domRect.left,
    height: domRect.height || domRect.top - domRect.bottom,
    top: domRect.bottom + scrollElement.scrollTop - offsetTop,
    left: domRect.left + scrollElement.scrollLeft - offsetLeft,
    elementTop: domRect.top + scrollElement.scrollTop - offsetTop,
  };
};

export const isUnplacedRect = (rect?: ReactiveDomReact): boolean => {
  if (!rect) return true;
  return rect.top === defaultRect.top && rect.left === defaultRect.left;
};

export const getRefRect = (
  ref?: MutableRefObject<HTMLElement | null>,
  getContainer?: () => HTMLElement | null
): ReactiveDomReact => {
  if (!ref || !ref.current) return defaultRect;
  const rect = ref.current.getBoundingClientRect();
  return getRectFromDOMWithContainer(rect, getContainer);
};

export const getEventRect = (
  event?: MouseEvent<HTMLElement> | FocusEvent<HTMLElement>,
  getContainer?: () => HTMLElement | null
) => {
  const rect = (event?.target as HTMLElement)?.getBoundingClientRect();
  if (!rect) return defaultRect;
  return getRectFromDOMWithContainer(rect, getContainer);
};

function isRefTarget(value: unknown): value is MutableRefObject<HTMLElement | null> {
  return (
    value !== null &&
    typeof value === 'object' &&
    'current' in value &&
    (value as MutableRefObject<HTMLElement | null>).current instanceof HTMLElement
  );
}

function isMouseOrFocusEvent(
  value: unknown
): value is MouseEvent<HTMLElement> | FocusEvent<HTMLElement> {
  return (
    value !== null &&
    typeof value === 'object' &&
    'target' in value &&
    (value as MouseEvent<HTMLElement>).target instanceof HTMLElement
  );
}
export const useRect = (initialState?: ReactiveDomReact | (() => ReactiveDomReact)) => {
  const [rect, setRect] = useState<ReactiveDomReact>(
    typeof initialState === 'function' ? initialState() : initialState || defaultRect
  );

  const updateRect = (
    eventOrRef:
      | MouseEvent<HTMLElement>
      | FocusEvent<HTMLElement>
      | MutableRefObject<HTMLElement | null>,
    getContainer?: () => HTMLElement | null
  ) => {
    try {
      if (isRefTarget(eventOrRef)) {
        setRect(getRefRect(eventOrRef, getContainer));
      } else if (isMouseOrFocusEvent(eventOrRef)) {
        setRect(getEventRect(eventOrRef, getContainer));
      }
    } catch (error) {
      console.error('Error updating rect:', error);
    }
  };

  return {
    rect,
    setRect: updateRect,
  };
};
