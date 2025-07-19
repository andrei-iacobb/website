import IPDebug from "@/components/ip-debug"

export default function DebugPage() {
  return (
    <div className="min-h-screen bg-slate-50 p-4 flex items-center justify-center">
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">IP Detection Debug</h1>
          <p className="text-slate-600">Use this page to test IP detection</p>
        </div>
        <IPDebug />
      </div>
    </div>
  )
}
