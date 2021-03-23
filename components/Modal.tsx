import React, { useEffect } from "react";

import ReactDOM from "react-dom";

let rootEl;
let modalEl;

if (process.browser) {
  rootEl = document.getElementById("__next");
  modalEl = document.createElement("div");
}

function Modal({
  children,
  isOpen,
  setIsOpen,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  useEffect(() => {
    if (typeof document !== "undefined") {
      if (isOpen) {
        document.body.style.height = "100%";
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.height = "auto";
        document.body.style.overflow = "auto";
        document.body.style.overflowX = "hidden";
      }
    }
    return () => {
      document.body.style.height = "auto";
      document.body.style.overflow = "auto";
      document.body.style.overflowX = "hidden";
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      rootEl.appendChild(modalEl);
      return () => {
        rootEl.removeChild(modalEl);
      };
    } else {
      rootEl.removeChild(modalEl);
    }
  }, []);

  if (!rootEl || !modalEl) return null;

  return ReactDOM.createPortal(
    <div
      className="absolute w-full h-screen top-0 right-0 bg-black bg-opacity-75 z-50 flex justify-center items-center p-8"
      onClick={() => {
        setIsOpen(false);
      }}
      style={{ top: document.documentElement.scrollTop }}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="flex justify-center items-center"
      >
        {children}
      </div>
    </div>,
    modalEl
  );
}

export default Modal;
