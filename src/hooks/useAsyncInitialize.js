import { useEffect, useState } from "react";

export const useAsyncInitialize = (func, deps = []) => {
  const [state, setState] = useState(null);

  useEffect(() => {
    let isMounted = true; // Track if the component is mounted

    const initialize = async () => {
      const result = await func();
      if (isMounted) {
        setState(result);
      }
    };

    initialize();

    return () => {
      isMounted = false; // Cleanup function to avoid setting state on unmounted component
    };
  }, [func, ...deps]); // Keep func and deps in the dependency array

  return state;
};
