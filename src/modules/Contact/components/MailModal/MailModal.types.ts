export interface MailModalProps {
  open: boolean;
  onClose: () => void;
}

export type MailFormStatus = "idle" | "submitting" | "success" | "error";

export interface MailFormFields {
  name: string;
  email: string;
  subject: string;
  message: string;
  honeypot: string;
}

export type MailFormErrors = Partial<
  Record<keyof MailFormFields | "turnstile", string>
>;

interface TurnstileRenderOptions {
  sitekey: string;
  theme?: "dark" | "light" | "auto";
  callback?: (token: string) => void;
  "error-callback"?: () => void;
  "expired-callback"?: () => void;
}

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: TurnstileRenderOptions) => string;
      remove: (id: string) => void;
      reset: (id?: string) => void;
    };
  }
}
