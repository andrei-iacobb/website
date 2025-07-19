import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, Settings, User, LogOut } from "lucide-react"

export default function HomeView() {
  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="flex justify-between items-center py-8">
          <div className="flex items-center gap-2">
            <Home className="w-8 h-8 text-purple-600" />
            <h1 className="text-3xl font-bold text-slate-900">Welcome Home</h1>
          </div>
          <form action="/api/auth/logout" method="POST">
            <Button variant="outline" size="sm" type="submit">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </form>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Dashboard
              </CardTitle>
              <CardDescription>Access your personal dashboard and analytics</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Open Dashboard</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Admin Panel
              </CardTitle>
              <CardDescription>Manage site settings and configurations</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full bg-transparent">
                Manage Settings
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow md:col-span-2 lg:col-span-1">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Frequently used tools and shortcuts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="ghost" className="w-full justify-start">
                View Logs
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                System Status
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                Backup Data
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center pt-8">
          <Button variant="outline" asChild>
            <a href="https://andrei.iacob.uk/" target="_blank" rel="noopener noreferrer">
              Visit Public Site
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}
