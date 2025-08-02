import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  maxHeight?: string;
  minHeight?: string;
  maxWidth?: string;
  minWidth?: string;
  hasOverflow?: boolean;
  shouldItemsBeCentered?: boolean;
  extraStyle?: string;
  showCancelButton?: boolean; // New prop
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  maxHeight = "90vh",
  minHeight = "auto",
  hasOverflow = false,
  shouldItemsBeCentered = true,
  extraStyle,
  showCancelButton = false // Default to false
}) => {
  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    // Only allow outside click to close if showCancelButton is false
    if (!showCancelButton) {
      onClose();
    }
  };

  const handleContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleCancelClick = () => {
    onClose();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only allow Escape key to close if showCancelButton is false
      if (e.key === "Escape" && !showCancelButton) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, showCancelButton]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed top-0 w-full backdrop-blur-sm inset-0 z-[9999999999999999999] flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleOutsideClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className={`overflow-hidden w-full rounded-lg shadow-lg ${extraStyle}`}>
            <motion.div
              className={clsx(
                extraStyle,
                "bg-white flex-col w-full",
                shouldItemsBeCentered ? "flex " : "",
              )}
              style={{
                maxHeight,
                minHeight,
                overflow: hasOverflow ? "auto" : "hidden",
              }}
              onClick={handleContentClick}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              {/* Header */}
              {title && (
                <div className="flex justify-between items-center mb-4 px-6 pt-6">
                  <h2 className="text-xl font-semibold">{title}</h2>
                  {showCancelButton && (
                    <button
                      onClick={handleCancelClick}
                      className="text-gray-500 hover:text-gray-700 text-2xl font-bold leading-none"
                      aria-label="Close modal"
                    >
                      ×
                    </button>
                  )}
                </div>
              )}

              {/* Body */}
              <div className={title ? "px-6 pb-6" : "p-6"}>{children}</div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;