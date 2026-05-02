export interface LinkedinModalProps {
  open: boolean;
  onClose: () => void;
}

declare global {
  interface Window {
    LIRenderAll?: () => void;
  }
}
