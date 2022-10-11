import {useRef, useEffect} from 'react';

type ListenerFn = (event?: Event) => void;

/**
 * Attach event listener to custom DOM event
 * 
 * @param name 
 * @param listener 
 * @returns Ref
 */
export const useEventRef = <T extends HTMLElement=HTMLElement>(name: string, listener: ListenerFn) => {
    const targetRef=useRef<T>();
    const handlerRef=useRef<ListenerFn>();

    handlerRef.current = listener;

    useEffect( () => {
        const handler = (e: Event) => handlerRef.current(e);
        targetRef.current.addEventListener(name, handler);

        return () => targetRef?.current?.removeEventListener(name, handler);
    }, [name]);

    return targetRef;
}
