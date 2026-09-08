import { useEffect } from "react";
import { trackVisitorApi } from "../api/VisitorApi/visitorApi.ts";

const VisitorTracker = () => {
  useEffect(() => {
    const isVisitorTracked = document.cookie
      .split("; ")
      .some((cookie) => cookie.startsWith("visitor_tracked="));

    if (isVisitorTracked) {
      return;
    }

    trackVisitorApi();
  }, []);

  return null;
};

export default VisitorTracker;