const EMAIL = "andrei@iacob.co.uk"

export function CopyEmail() {
  return (
    <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
      <button
        type="button"
        data-copy-email={EMAIL}
        className="contact-email inline-block font-display font-semibold text-[28px] md:text-[44px] tracking-[-0.01em]"
        aria-label={`Copy email address ${EMAIL}`}
      >
        {EMAIL}
      </button>
      <span
        data-copy-status
        aria-live="polite"
        className="font-mono text-[12px] uppercase tracking-[0.16em] text-ink/65"
      >
        Click to copy
      </span>
    </div>
  )
}
