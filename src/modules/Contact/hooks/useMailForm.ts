import { useCallback, useMemo, useState } from "react";
import type {
  MailFormErrors,
  MailFormFields,
  MailFormStatus,
} from "../components/MailModal/MailModal.types";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME = 80;
const MAX_SUBJECT = 120;
const MAX_MESSAGE = 4000;

const INITIAL_FIELDS: MailFormFields = {
  name: "",
  email: "",
  subject: "",
  message: "",
  honeypot: "",
};

const INITIAL_TOUCHED: Record<keyof MailFormFields, boolean> = {
  name: false,
  email: false,
  subject: false,
  message: false,
  honeypot: false,
};

export default function useMailForm() {
  const [fields, setFields] = useState<MailFormFields>(INITIAL_FIELDS);
  const [touched, setTouched] =
    useState<Record<keyof MailFormFields, boolean>>(INITIAL_TOUCHED);
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const [status, setStatus] = useState<MailFormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const errors = useMemo<MailFormErrors>(() => {
    const e: MailFormErrors = {};
    const name = fields.name.trim();
    const email = fields.email.trim();
    const subject = fields.subject.trim();
    const message = fields.message.trim();

    if (!name) e.name = "Name required.";
    else if (name.length > MAX_NAME) e.name = `Max ${MAX_NAME} chars.`;

    if (!email) e.email = "Email required.";
    else if (!EMAIL_RE.test(email)) e.email = "Invalid email.";

    if (!subject) e.subject = "Subject required.";
    else if (subject.length > MAX_SUBJECT)
      e.subject = `Max ${MAX_SUBJECT} chars.`;

    if (!message) e.message = "Message required.";
    else if (message.length > MAX_MESSAGE)
      e.message = `Max ${MAX_MESSAGE} chars.`;

    if (!turnstileToken) e.turnstile = "Verify you're human.";

    return e;
  }, [fields, turnstileToken]);

  const isValid = Object.keys(errors).length === 0;

  const setField = useCallback(
    <K extends keyof MailFormFields>(key: K, value: MailFormFields[K]) => {
      setFields((f) => ({ ...f, [key]: value }));
    },
    [],
  );

  const blur = useCallback((key: keyof MailFormFields) => {
    setTouched((t) => ({ ...t, [key]: true }));
  }, []);

  const reset = useCallback(() => {
    setFields(INITIAL_FIELDS);
    setTouched(INITIAL_TOUCHED);
    setTurnstileToken("");
    setStatus("idle");
    setErrorMessage("");
  }, []);

  const submit = useCallback(async () => {
    if (!isValid || status === "submitting") return;
    setStatus("submitting");
    setErrorMessage("");
    try {
      await new Promise((r) => setTimeout(r, 600));
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Send failed.");
    }
  }, [isValid, status]);

  return {
    fields,
    touched,
    errors,
    isValid,
    status,
    errorMessage,
    turnstileToken,
    setField,
    setTurnstileToken,
    blur,
    submit,
    reset,
    limits: {
      name: MAX_NAME,
      subject: MAX_SUBJECT,
      message: MAX_MESSAGE,
    },
  };
}
