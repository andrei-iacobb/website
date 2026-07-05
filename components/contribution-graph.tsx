"use client"

import { useEffect, useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { CountUp } from "@/components/reveal"

interface ContributionDay {
  contributionCount: number
  date: string
}

interface Week {
  contributionDays: ContributionDay[]
}

const MONTH_LABELS_EN = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const MONTH_LABELS_RO = ["Ian", "Feb", "Mar", "Apr", "Mai", "Iun", "Iul", "Aug", "Sep", "Oct", "Noi", "Dec"]

function getLevel(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count === 0) return 0
  if (count <= 2) return 1
  if (count <= 5) return 2
  if (count <= 9) return 3
  return 4
}

const levelClass: Record<0 | 1 | 2 | 3 | 4, string> = {
  0: "bg-ink/[0.06]",
  1: "bg-ink/20",
  2: "bg-ink/40",
  3: "bg-ink/60",
  4: "bg-ink/85",
}

const FORGEJO = "https://git.iacob.co.uk/andrei"

export function ContributionGraph() {
  const { t, language } = useLanguage()
  const [weeks, setWeeks] = useState<Week[]>([])
  const [total, setTotal] = useState<number | null>(null)

  useEffect(() => {
    fetch("/api/github/contributions")
      .then((r) => r.json())
      .then((data) => {
        if (data.weeks?.length) {
          setWeeks(data.weeks)
          setTotal(data.total)
        }
      })
      .catch(() => {})
  }, [])

  if (!weeks.length) return null

  const monthLabels = language === "ro" ? MONTH_LABELS_RO : MONTH_LABELS_EN

  const monthPositions: { label: string; col: number }[] = []
  let lastMonth = -1
  weeks.forEach((week, i) => {
    const firstDay = week.contributionDays[0]
    if (!firstDay) return
    const month = new Date(firstDay.date).getMonth()
    if (month !== lastMonth) {
      monthPositions.push({ label: monthLabels[month], col: i })
      lastMonth = month
    }
  })

  const cols = weeks.length

  return (
    <section className="mx-auto w-full max-w-[82rem] px-6 md:px-10 lg:px-16 py-20 md:py-28">
      <div className="flex flex-wrap items-end justify-between gap-3 mb-3">
        <h2 className="font-display text-[clamp(24px,3vw,36px)] font-bold tracking-[-0.02em] leading-[0.95]">
          {t("contributions.heading")}
        </h2>
        <a
          href={FORGEJO}
          target="_blank"
          rel="noopener noreferrer"
          className="editorial-link font-mono text-[12px] text-ink/50 hover:text-ink transition-colors"
        >
          git.iacob.co.uk/andrei →
        </a>
      </div>
      {total !== null && (
        <p className="text-[17px] text-ink/55 mb-12">
          <CountUp
            value={total}
            className="tabular-nums text-ink/85 font-medium"
          />{" "}
          {t("contributions.subtitle")}
        </p>
      )}

      <a
        href={FORGEJO}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="View Andrei's git activity on Forgejo"
        className="block rounded-lg -m-3 p-3 transition-colors hover:bg-ink/[0.03]"
      >
        <div className="overflow-x-auto -mx-6 px-6 sm:mx-0 sm:px-0 pb-2">
          <div className="min-w-[680px]">
            <div className="flex gap-2.5">
              <div className="flex flex-col justify-between pt-6 pb-1 shrink-0 w-8 text-[11px] text-ink/40 leading-none">
                <span className="h-[12px]" aria-hidden />
                <span>{language === "ro" ? "Lun" : "Mon"}</span>
                <span className="h-[12px]" aria-hidden />
                <span>{language === "ro" ? "Mie" : "Wed"}</span>
                <span className="h-[12px]" aria-hidden />
                <span>{language === "ro" ? "Vin" : "Fri"}</span>
                <span className="h-[12px]" aria-hidden />
              </div>

              <div className="flex-1 min-w-0">
                <div
                  className="grid mb-2.5"
                  style={{
                    gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
                    gap: "5px",
                  }}
                >
                  {weeks.map((_, i) => {
                    const pos = monthPositions.find((m) => m.col === i)
                    return (
                      <div
                        key={i}
                        className="text-[11px] text-ink/40 leading-none"
                      >
                        {pos ? pos.label : ""}
                      </div>
                    )
                  })}
                </div>

                <div
                  className="grid"
                  style={{
                    gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
                    gap: "5px",
                  }}
                >
                  {weeks.map((week, wi) => (
                    <div key={wi} className="grid grid-rows-7" style={{ gap: "5px" }}>
                      {Array.from({ length: 7 }).map((_, di) => {
                        const day = week.contributionDays[di]
                        if (!day) {
                          return <div key={di} className="aspect-square" />
                        }
                        const level = getLevel(day.contributionCount)
                        return (
                          <div
                            key={di}
                            title={`${day.date}: ${day.contributionCount} contribution${day.contributionCount !== 1 ? "s" : ""}`}
                            className={`aspect-square rounded-[3px] ${levelClass[level]}`}
                          />
                        )
                      })}
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-end gap-2 mt-5 text-[12px] text-ink/45">
                  <span>{t("contributions.less")}</span>
                  <div className="flex gap-1">
                    {[0, 1, 2, 3, 4].map((l) => (
                      <div
                        key={l}
                        className={`w-3.5 h-3.5 rounded-[3px] ${levelClass[l as 0 | 1 | 2 | 3 | 4]}`}
                      />
                    ))}
                  </div>
                  <span>{t("contributions.more")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </a>
    </section>
  )
}
