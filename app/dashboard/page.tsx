import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { LeftSidebar } from "@/components/dashboard/left-sidebar"
import { ChatInterface } from "@/components/dashboard/chat-interface"
import { RightSidebar } from "@/components/dashboard/right-sidebar"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Left Sidebar */}
        <div className="w-80 border-r border-border bg-card">
          <LeftSidebar />
        </div>

        {/* Center Column - Chat Interface */}
        <div className="flex-1 flex flex-col">
          <ChatInterface />
        </div>

        {/* Right Sidebar */}
        <div className="w-80 border-l border-border bg-card">
          <RightSidebar />
        </div>
      </div>
    </div>
  )
}
