import { useRef, useEffect } from 'react';

/**
 * Attach event listener to custom DOM event
 *
 * @param name
 * @param listener
 * @returns Ref
 */
export const useEventRef = <T extends HTMLElement = HTMLElement>(
  name: string,
  listener: EventListener,
) => {
  const targetRef = useRef<T>();
  const handlerRef = useRef(listener);

  useEffect(() => {
    handlerRef.current = listener;
  }, [listener]);

  useEffect(() => {
    const handler: EventListener = (e) => handlerRef.current(e);

    const target = targetRef.current;
    if (!target) {
      return;
    }

    target.addEventListener(name, handler);
    return () => target.removeEventListener(name, handler);
  }, [name]);

  return targetRef;
};
