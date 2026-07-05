"use client"

import {
  animate,
  motion,
  useInView,
  useReducedMotion,
  type HTMLMotionProps,
  type Variants,
} from "motion/react"
import {
  useEffect,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
} from "react"

const EASE = [0.22, 1, 0.36, 1] as const
const VIEWPORT = { once: true, margin: "0px 0px -12% 0px" } as const

// ──────────────────────────────────────────────
// Reveal - fade + rise on scroll into view.
// Reduced motion collapses to a plain opacity fade.
// ──────────────────────────────────────────────

interface RevealProps extends Omit<HTMLMotionProps<"div">, "ref"> {
  children: ReactNode
  /** vertical offset in px the element rises from */
  y?: number
  delay?: number
  duration?: number
  as?: ElementType
}

export function Reveal({
  children,
  y = 18,
  delay = 0,
  duration = 0.7,
  as = "div",
  ...rest
}: RevealProps) {
  const reduce = useReducedMotion()
  const Comp = motion[as as "div"] ?? motion.div

  return (
    <Comp
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: reduce ? 0.3 : duration, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </Comp>
  )
}

// ──────────────────────────────────────────────
// Stagger - container that releases children in sequence.
// ──────────────────────────────────────────────

const staggerParent = (stagger: number, delay: number): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
})

const staggerChild = (y: number, reduce: boolean): Variants => ({
  hidden: { opacity: 0, y: reduce ? 0 : y },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: reduce ? 0.3 : 0.6, ease: EASE },
  },
})

export function Stagger({
  children,
  stagger = 0.08,
  delay = 0,
  as = "div",
  className,
}: {
  children: ReactNode
  stagger?: number
  delay?: number
  as?: ElementType
  className?: string
}) {
  const Comp = motion[as as "div"] ?? motion.div
  return (
    <Comp
      className={className}
      variants={staggerParent(stagger, delay)}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      {children}
    </Comp>
  )
}

export function StaggerItem({
  children,
  y = 16,
  as = "div",
  className,
}: {
  children: ReactNode
  y?: number
  as?: ElementType
  className?: string
}) {
  const reduce = useReducedMotion()
  const Comp = motion[as as "div"] ?? motion.div
  return (
    <Comp className={className} variants={staggerChild(y, reduce ?? false)}>
      {children}
    </Comp>
  )
}

// ──────────────────────────────────────────────
// MaskedText - line-by-line masked reveal for display headings.
// Pass lines as an array. The full string is exposed to AT via
// aria-label on the wrapper; the animated spans are aria-hidden.
// ──────────────────────────────────────────────

export function MaskedText({
  lines,
  label: labelProp,
  className,
  lineClassName,
  delay = 0,
  stagger = 0.09,
  as = "h2",
}: {
  lines: ReactNode[]
  /** explicit screen-reader label - required when lines are styled nodes */
  label?: string
  className?: string
  lineClassName?: string
  delay?: number
  stagger?: number
  as?: ElementType
}) {
  const reduce = useReducedMotion()
  const label =
    labelProp ??
    lines
      .map((l) => (typeof l === "string" ? l : ""))
      .join(" ")
      .trim()

  // The heading wrapper is the observed element - it is never clipped, so
  // IntersectionObserver fires reliably. The inner per-line spans (which
  // start translated fully below their overflow-hidden line, i.e. 0% visible)
  // animate via variant propagation rather than their own whileInView.
  const MotionHeading = motion[as as "h2"] ?? motion.h2

  return (
    <MotionHeading
      className={className}
      aria-label={label || undefined}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      {lines.map((line, i) => (
        <span
          key={i}
          aria-hidden
          className={`block overflow-hidden ${lineClassName ?? ""}`}
        >
          <motion.span
            className="block will-change-transform"
            variants={{
              hidden: { y: reduce ? 0 : "115%", opacity: reduce ? 0 : 1 },
              show: {
                y: 0,
                opacity: 1,
                transition: {
                  duration: reduce ? 0.3 : 0.8,
                  delay: delay + i * stagger,
                  ease: EASE,
                },
              },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </MotionHeading>
  )
}

// ──────────────────────────────────────────────
// CountUp - animate an integer from 0 to value when scrolled into view.
// Reduced motion shows the final value immediately.
// ──────────────────────────────────────────────

export function CountUp({
  value,
  className,
  duration = 1.4,
}: {
  value: number
  className?: string
  duration?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" })
  const reduce = useReducedMotion()
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView || reduce) return
    const controls = animate(0, value, {
      duration,
      ease: EASE,
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, value, reduce, duration])

  return (
    <span ref={ref} className={className}>
      {(reduce ? value : display).toLocaleString()}
    </span>
  )
}
