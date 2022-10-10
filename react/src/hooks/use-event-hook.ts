import {useRef, useEffect} from 'react';

type ListenerFn = (event?: Event) => void;

export const useEventRef = <T extends HTMLElement>(name: string, listener: ListenerFn) => {
    const ref=useRef<T>();

    useEffect( () => {
        ref.current.addEventListener(name, listener);

        return () => ref.current.removeEventListener(name, listener);
    });

    return ref;
}
