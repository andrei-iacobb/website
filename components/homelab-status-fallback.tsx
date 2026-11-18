import { EXTERNAL_SERVICE_NAMES } from "@/lib/homelab-external"

function DotSkeleton() {
  return <span className="h-[7px] w-[7px] shrink-0 rounded-full bg-ink/10 animate-pulse" aria-hidden />
}

function MsSkeleton() {
  return <span className="h-3 w-10 shrink-0 rounded bg-ink/10 animate-pulse" aria-hidden />
}

export function HomelabStatusFallback() {
  return (
    <div className="rounded-2xl border border-ink/12 bg-ink/1.5 p-6 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-2.5">
          <span className="status-dot" aria-hidden />
          <span className="font-sans text-[13px] font-semibold uppercase tracking-[0.16em] text-ink/70">
            Checking services
          </span>
        </div>
        <span className="font-mono text-[11px] text-ink/65">live</span>
      </div>

      <ul className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-1">
        {EXTERNAL_SERVICE_NAMES.map((name) => (
          <li
            key={name}
            className="flex items-center justify-between gap-3 border-b border-ink/8 py-2.5"
          >
            <span className="flex items-center gap-2.5 min-w-0">
              <DotSkeleton />
              <span className="truncate text-[14px] text-ink/80">{name}</span>
            </span>
            <MsSkeleton />
          </li>
        ))}

        <li className="col-span-2 md:col-span-3 flex items-center justify-between gap-3 border-b border-ink/8 py-2.5">
          <span className="flex items-center gap-2.5 min-w-0">
            <DotSkeleton />
            <span className="whitespace-nowrap text-[14px] text-ink/80">Internal services</span>
          </span>
          <MsSkeleton />
        </li>
      </ul>

      <p className="mt-6 font-sans text-[12px] text-ink/65 italic">
        It&apos;s Kubernetes - if something&apos;s down, it&apos;ll probably heal itself before you finish refreshing.
      </p>
    </div>
  )
}
