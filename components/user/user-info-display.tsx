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
        {info.nombre} {info.apellido}
      </span>
      <span className="text-muted-foreground">•</span>
      <Badge variant="secondary" className="text-xs">
        {info.universidad}
      </Badge>
      <span className="text-muted-foreground hidden lg:inline">•</span>
      <Badge variant="outline" className="text-xs hidden lg:inline-flex">
        {info.facultad}
      </Badge>
      <span className="text-muted-foreground hidden xl:inline">•</span>
      <span className="text-muted-foreground hidden xl:inline">
        {info.pais}, {info.provincia}
      </span>
      <span className="text-muted-foreground hidden lg:inline">•</span>
      <Badge variant="secondary" className="text-xs hidden lg:inline-flex">
        Año {info.año}
      </Badge>
    </div>
  )
}