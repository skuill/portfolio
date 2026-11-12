import { useCallback, useEffect, useState } from "react";

const read = () => {
  const match = window.location.hash.match(/^#day-(\d+)$/);
  return match ? Number(match[1]) : null;
};

// The chosen day lives in the address (#day-5): a link opens that day and the Back button returns to the previous one.
const useDayInAddress = () => {
  const [day, setDay] = useState(read);

  useEffect(() => {
    const update = () => setDay(read());
    window.addEventListener("popstate", update);
    window.addEventListener("hashchange", update);
    return () => {
      window.removeEventListener("popstate", update);
      window.removeEventListener("hashchange", update);
    };
  }, []);

  const choose = useCallback((next) => {
    if (next === read()) return;
    window.history.pushState(null, "", next ? `#day-${next}` : window.location.pathname + window.location.search);
    setDay(next);
  }, []);

  return [day, choose];
};

export default useDayInAddress;
