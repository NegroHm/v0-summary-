'use client'

import { useUser } from '@/lib/user-context'
import { Badge } from '@/components/ui/badge'

export function UserInfoDisplay() {
  const { user } = useUser()

  if (!user) return null

  const { info } = user

  return (
    <div className="flex items-center space-x-2 text-sm">
      <span className="font-medium text-foreground">
        {info.nombre} {info.apellido}
      </span>
      <span className="text-muted-foreground">•</span>
      <Badge variant="secondary" className="text-xs">
        {info.universidad}
      </Badge>
      <span className="text-muted-foreground">•</span>
      <Badge variant="outline" className="text-xs">
        {info.facultad}
      </Badge>
      <span className="text-muted-foreground">•</span>
      <span className="text-muted-foreground">
        {info.pais}, {info.provincia}
      </span>
      <span className="text-muted-foreground">•</span>
      <Badge variant="secondary" className="text-xs">
        Año {info.año}
      </Badge>
    </div>
  )
}