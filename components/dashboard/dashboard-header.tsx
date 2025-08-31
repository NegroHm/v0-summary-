'use client'

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Settings, LogOut, User, Home, GraduationCap, MapPin } from "lucide-react"
import Link from "next/link"
import { UserInfoDisplay } from "@/components/user/user-info-display"
import { useUser } from "@/lib/user-context"

export function DashboardHeader() {
  const { user } = useUser()

  return (
    <header className="h-14 sm:h-16 border-b border-border bg-card">
      <div className="flex items-center justify-between h-full px-3 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
          <div className="w-7 h-7 sm:w-8 sm:h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-base sm:text-lg">S+</span>
          </div>
          <span className="text-lg sm:text-xl font-semibold text-foreground">Summary+</span>
        </Link>

        {/* User Info - Always visible on larger screens */}
        <div className="flex-1 flex justify-center">
          <UserInfoDisplay />
        </div>

        {/* Right side - Theme toggle and user profile */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          <Button variant="ghost" size="sm" className="hidden sm:flex" asChild>
            <Link href="/" className="flex items-center space-x-2">
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>
          </Button>

          <div className="hidden sm:block">
            <ThemeToggle />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.avatar || "/diverse-student-profiles.png"} alt="Profile" />
                  <AvatarFallback>
                    {user?.info.firstName?.[0]}{user?.info.lastName?.[0]}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium leading-none">
                      {user?.info.firstName} {user?.info.lastName}
                    </p>
                  </div>
                  <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <GraduationCap className="w-3 h-3" />
                    <span>{user?.info.university}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <span>📚 {user?.info.faculty}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <MapPin className="w-3 h-3" />
                    <span>{user?.info.country}, {user?.info.state}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <span>📅 Year {user?.info.year}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
