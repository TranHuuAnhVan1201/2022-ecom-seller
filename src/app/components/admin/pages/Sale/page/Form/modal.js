import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import posed from "react-pose";

function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = event => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount
}

const modalBackgroundPoses = {
  open: {
    background: "rgba(0, 0, 0, 0.2)",
    applyAtStart: {
      display: "block"
    }
  },
  closed: {
    background: "rgba(0, 0, 0, 0)",
    applyAtEnd: {
      display: "none"
    }
  }
};

const ModalBackground = styled(posed.div(modalBackgroundPoses))`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  
  z-index: 100000000;
`;

const modalPoses = {
  open: {
    opacity: 1,
    transition: {
      opacity: {
        type: "tween",
        duration: 200
      }
    }
  },
  closed: {
    opacity: 0,
    transition: {
      opacity: {
        type: "tween",
        duration: 200
      }
    }
  }
};

const Modal = styled(posed.div(modalPoses))`
  position: relative;
  background: white;

  min-height: 80vh;
  max-height: 80vh;
  height: auto;
  width: auto;

  max-width: 1100px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  padding: 20px 10px;
  box-shadow: 0 2px 4px 0 rgba(50, 50, 93, 0.1);
  
  overflow-x: auto;
  overflow-y: auto;
  z-index: 10000000000000000;
`;

export default function({ isOpen, toggle, children }) {
  const ref = useRef();
  return (
    <ModalBackground initialPose="closed" pose={isOpen ? "open" : "closed"} className="overlay-scrollbar">
      <Modal ref={ref}>{children}</Modal>
    </ModalBackground>
  );
}
