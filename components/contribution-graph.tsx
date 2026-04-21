"use client"

import { useEffect, useState } from "react"
import { useLanguage } from "@/lib/language-context"

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
  0: "bg-muted",
  1: "bg-primary/20",
  2: "bg-primary/40",
  3: "bg-primary/70",
  4: "bg-primary",
}

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

  // Month labels: position at the first week where a new month starts
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

  return (
    <section className="py-16 md:py-20 border-t border-border">
      <div className="container">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
          {t("contributions.heading")}
        </h2>
        {total !== null && (
          <p className="text-lg text-muted-foreground mb-10">
            {total.toLocaleString()} {t("contributions.subtitle")}
          </p>
        )}

        <div className="overflow-x-auto pb-1">
          <div className="inline-block min-w-max">
            {/* Month labels */}
            <div className="flex mb-2" style={{ gap: "3px" }}>
              {weeks.map((_, i) => {
                const pos = monthPositions.find((m) => m.col === i)
                return (
                  <div key={i} className="w-[11px] text-[10px] text-muted-foreground leading-none">
                    {pos ? pos.label : ""}
                  </div>
                )
              })}
            </div>

            {/* Grid: 7 rows × N cols */}
            <div className="flex" style={{ gap: "3px" }}>
              {weeks.map((week, wi) => (
                <div key={wi} className="flex flex-col" style={{ gap: "3px" }}>
                  {Array.from({ length: 7 }).map((_, di) => {
                    const day = week.contributionDays[di]
                    if (!day) {
                      return <div key={di} className="w-[11px] h-[11px]" />
                    }
                    const level = getLevel(day.contributionCount)
                    return (
                      <div
                        key={di}
                        title={`${day.date}: ${day.contributionCount} contribution${day.contributionCount !== 1 ? "s" : ""}`}
                        className={`w-[11px] h-[11px] rounded-[2px] ${levelClass[level]}`}
                      />
                    )
                  })}
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex items-center justify-end gap-2 mt-3 text-[10px] text-muted-foreground">
              <span>{t("contributions.less")}</span>
              {[0, 1, 2, 3, 4].map((l) => (
                <div key={l} className={`w-[11px] h-[11px] rounded-[2px] ${levelClass[l as 0 | 1 | 2 | 3 | 4]}`} />
              ))}
              <span>{t("contributions.more")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
