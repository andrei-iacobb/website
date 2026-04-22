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

const brandLevelClass: Record<0 | 1 | 2 | 3 | 4, string> = {
  0: "bg-muted",
  1: "bg-primary/20",
  2: "bg-primary/40",
  3: "bg-primary/70",
  4: "bg-primary",
}

const neutralLevelClass: Record<0 | 1 | 2 | 3 | 4, string> = {
  0: "bg-white/[0.05]",
  1: "bg-white/15",
  2: "bg-white/30",
  3: "bg-white/55",
  4: "bg-white/85",
}

export function ContributionGraph({ tone = "brand" }: { tone?: "brand" | "neutral" } = {}) {
  const levelClass = tone === "neutral" ? neutralLevelClass : brandLevelClass
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

  const cols = weeks.length

  return (
    <section className="py-20 md:py-28 border-t border-border">
      <div className="container">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
          {t("contributions.heading")}
        </h2>
        {total !== null && (
          <p className="text-lg text-muted-foreground mb-12">
            {total.toLocaleString()} {t("contributions.subtitle")}
          </p>
        )}

        {/* Scrollable wrapper on mobile, flex-fill on desktop */}
        <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0 pb-2">
          {/* min-w ensures the graph stays readable on mobile (horizontal scroll) */}
          <div className="min-w-[640px]">
            {/* Row layout: day labels column on the left, graph + month labels on the right — mirrors GitHub */}
            <div className="flex gap-2">
              {/* Day labels column (Mon / Wed / Fri) — matches GitHub's layout */}
              <div className="flex flex-col justify-between pt-5 pb-1 shrink-0 w-7 text-[10px] md:text-[11px] text-muted-foreground leading-none">
                <span className="h-[11px]" aria-hidden />
                <span>{language === "ro" ? "Lun" : "Mon"}</span>
                <span className="h-[11px]" aria-hidden />
                <span>{language === "ro" ? "Mie" : "Wed"}</span>
                <span className="h-[11px]" aria-hidden />
                <span>{language === "ro" ? "Vin" : "Fri"}</span>
                <span className="h-[11px]" aria-hidden />
              </div>

              <div className="flex-1 min-w-0">
                {/* Month labels row — uses same grid as cells */}
                <div
                  className="grid mb-2"
                  style={{
                    gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
                    gap: "4px",
                  }}
                >
                  {weeks.map((_, i) => {
                    const pos = monthPositions.find((m) => m.col === i)
                    return (
                      <div
                        key={i}
                        className="text-[11px] md:text-xs text-muted-foreground leading-none"
                      >
                        {pos ? pos.label : ""}
                      </div>
                    )
                  })}
                </div>

                {/* Grid body: each column is a week, 7 rows for days */}
                <div
                  className="grid"
                  style={{
                    gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
                    gap: "4px",
                  }}
                >
                  {weeks.map((week, wi) => (
                    <div key={wi} className="grid grid-rows-7" style={{ gap: "4px" }}>
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

                {/* Legend */}
                <div className="flex items-center justify-end gap-2 mt-4 text-xs text-muted-foreground">
                  <span>{t("contributions.less")}</span>
                  <div className="flex gap-1">
                    {[0, 1, 2, 3, 4].map((l) => (
                      <div
                        key={l}
                        className={`w-3 h-3 rounded-[3px] ${levelClass[l as 0 | 1 | 2 | 3 | 4]}`}
                      />
                    ))}
                  </div>
                  <span>{t("contributions.more")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
