import { useEffect } from "react";
import { withRouter } from "react-router-dom";

function ScrollToTop({ history }) {
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);

      const root = document.getElementById("root");
      root.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    });

    return () => {
      unlisten();
    };
  }, []);

  return null;
}

export default withRouter(ScrollToTop);
