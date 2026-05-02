import { useEffect, useRef, type FormEvent } from "react";
import PORTFOLIO_CONTENT from "../../../../content";
import { Modal } from "../../../../shared/components";
import { useMailForm } from "../../hooks";
import type { MailFormFields, MailModalProps } from "./MailModal.types";
import styles from "./MailModal.module.scss";

const TURNSTILE_SCRIPT_ID = "cf-turnstile-script";
const TURNSTILE_SCRIPT_SRC =
  "https://challenges.cloudflare.com/turnstile/v0/api.js";
const TURNSTILE_SITE_KEY = process.env.REACT_APP_TURNSTILE_SITE_KEY ?? "";

function ensureTurnstileScript(): Promise<void> {
  return new Promise((resolve) => {
    if (window.turnstile) {
      resolve();
      return;
    }
    const existing = document.getElementById(
      TURNSTILE_SCRIPT_ID,
    ) as HTMLScriptElement | null;
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      return;
    }
    const s = document.createElement("script");
    s.id = TURNSTILE_SCRIPT_ID;
    s.src = TURNSTILE_SCRIPT_SRC;
    s.async = true;
    s.defer = true;
    s.onload = () => resolve();
    document.body.appendChild(s);
  });
}

export default function MailModal({ open, onClose }: Readonly<MailModalProps>) {
  const { contact } = PORTFOLIO_CONTENT;
  const { mailModal } = contact;
  const form = useMailForm();
  const { reset, setTurnstileToken } = form;
  const widgetRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (!open) return;
    if (!TURNSTILE_SITE_KEY) {
      setTurnstileToken("dev-skip");
      return;
    }
    let cancelled = false;
    ensureTurnstileScript().then(() => {
      if (cancelled || !widgetRef.current || !window.turnstile) return;
      if (widgetIdRef.current !== null) return;
      widgetIdRef.current = window.turnstile.render(widgetRef.current, {
        sitekey: TURNSTILE_SITE_KEY,
        theme: "dark",
        callback: (token) => setTurnstileToken(token),
        "error-callback": () => setTurnstileToken(""),
        "expired-callback": () => setTurnstileToken(""),
      });
    });
    return () => {
      cancelled = true;
      if (widgetIdRef.current !== null && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [open, setTurnstileToken]);

  useEffect(() => {
    if (!open) reset();
  }, [open, reset]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    form.submit();
  };

  const fieldError = (key: keyof MailFormFields) =>
    form.touched[key] && form.errors[key] ? form.errors[key] : undefined;

  const submitting = form.status === "submitting";

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={mailModal.title}
      subtitle={mailModal.subtitle}
      maxWidth={640}
    >
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <div className={styles.row}>
          <label className={styles.label} htmlFor="mail-name">
            {mailModal.labels.name}
          </label>
          <input
            id="mail-name"
            type="text"
            className={styles.input}
            value={form.fields.name}
            maxLength={form.limits.name}
            onChange={(e) => form.setField("name", e.target.value)}
            onBlur={() => form.blur("name")}
            aria-invalid={!!fieldError("name")}
            disabled={submitting}
            autoComplete="name"
          />
          {fieldError("name") && (
            <span className={styles.error}>{form.errors.name}</span>
          )}
        </div>

        <div className={styles.row}>
          <label className={styles.label} htmlFor="mail-email">
            {mailModal.labels.email}
          </label>
          <input
            id="mail-email"
            type="email"
            className={styles.input}
            value={form.fields.email}
            onChange={(e) => form.setField("email", e.target.value)}
            onBlur={() => form.blur("email")}
            aria-invalid={!!fieldError("email")}
            disabled={submitting}
            autoComplete="email"
          />
          {fieldError("email") && (
            <span className={styles.error}>{form.errors.email}</span>
          )}
        </div>

        <div className={styles.row}>
          <label className={styles.label} htmlFor="mail-subject">
            {mailModal.labels.subject}
          </label>
          <input
            id="mail-subject"
            type="text"
            className={styles.input}
            value={form.fields.subject}
            maxLength={form.limits.subject}
            onChange={(e) => form.setField("subject", e.target.value)}
            onBlur={() => form.blur("subject")}
            aria-invalid={!!fieldError("subject")}
            disabled={submitting}
          />
          {fieldError("subject") && (
            <span className={styles.error}>{form.errors.subject}</span>
          )}
        </div>

        <div className={styles.row}>
          <label className={styles.label} htmlFor="mail-message">
            {mailModal.labels.message}
          </label>
          <textarea
            id="mail-message"
            className={styles.textarea}
            rows={6}
            value={form.fields.message}
            maxLength={form.limits.message}
            onChange={(e) => form.setField("message", e.target.value)}
            onBlur={() => form.blur("message")}
            aria-invalid={!!fieldError("message")}
            disabled={submitting}
          />
          <div className={styles.metaRow}>
            <span className={styles.counter}>
              {form.fields.message.length} / {form.limits.message}
            </span>
            {fieldError("message") && (
              <span className={styles.error}>{form.errors.message}</span>
            )}
          </div>
        </div>

        <div className={styles.honeypot} aria-hidden="true">
          <label htmlFor="mail-website">Website</label>
          <input
            id="mail-website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={form.fields.honeypot}
            onChange={(e) => form.setField("honeypot", e.target.value)}
          />
        </div>

        <div ref={widgetRef} className={styles.turnstile} />

        <div className={styles.actions}>
          <button
            type="submit"
            className={styles.submit}
            disabled={!form.isValid || submitting}
          >
            {submitting ? mailModal.cta.submitting : mailModal.cta.send}
          </button>
        </div>
      </form>
    </Modal>
  );
}
