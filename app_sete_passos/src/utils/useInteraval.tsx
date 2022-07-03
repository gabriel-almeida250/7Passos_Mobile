import {useEffect, useRef} from 'react';

// See: https://usehooks-ts.com/react-hook/use-isomorphic-layout-effect
//import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect'

function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef<() => void | null>();

  // Remember the latest.
  useEffect(() => {
    savedCallback.current = callback;
  });

  // Set up the interval.
  useEffect(() => {
    function tick() {
      if (typeof savedCallback?.current !== 'undefined') {
        savedCallback?.current();
      }
    }

    if (delay !== 0 || delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default useInterval;
