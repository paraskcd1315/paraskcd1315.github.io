import { useCallback, useEffect, useRef, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import type { ModalProps } from "./Modal.types";
import styles from "./Modal.module.scss";

export default function Modal({
  open,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = 1100,
}: ModalProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", handleKey);
    };
  }, [open, handleKey]);

  useEffect(() => {
    if (open) panelRef.current?.focus();
  }, [open]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div className={styles.backdrop} onClick={onClose} role="presentation">
      <div
        ref={panelRef}
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-label={title ?? "Modal"}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        style={{ "--modal-max-width": `${maxWidth}px` } as CSSProperties}
      >
        <header className={styles.head}>
          <div className={styles.headText}>
            {title && <h2 className={styles.title}>{title}</h2>}
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </div>
          <button
            type="button"
            className={styles.close}
            onClick={onClose}
            aria-label="Close"
          >
            <span aria-hidden="true">×</span>
          </button>
        </header>
        <div className={styles.body}>{children}</div>
      </div>
    </div>,
    document.body,
  );
}
