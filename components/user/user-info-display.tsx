'use client'

import { useUser } from '@/lib/user-context'
import { Badge } from '@/components/ui/badge'

export function UserInfoDisplay() {
  const { user } = useUser()

  if (!user) return null

  const { info } = user

  return (
    <div className="hidden md:flex items-center space-x-2 text-sm">
      <span className="font-medium text-foreground">
        {info.firstName} {info.lastName}
      </span>
      <span className="text-muted-foreground">•</span>
      <Badge variant="secondary" className="text-xs">
        {info.university}
      </Badge>
      <span className="text-muted-foreground hidden lg:inline">•</span>
      <Badge variant="outline" className="text-xs hidden lg:inline-flex">
        {info.faculty}
      </Badge>
      <span className="text-muted-foreground hidden xl:inline">•</span>
      <span className="text-muted-foreground hidden xl:inline">
        {info.country}, {info.state}
      </span>
      <span className="text-muted-foreground hidden lg:inline">•</span>
      <Badge variant="secondary" className="text-xs hidden lg:inline-flex">
        Year {info.year}
      </Badge>
    </div>
  )
}