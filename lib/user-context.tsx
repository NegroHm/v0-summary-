'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { User } from './types'

interface UserContextType {
  user: User | null
  setUser: (user: User | null) => void
  updateUserInfo: (info: Partial<User['info']>) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

// Datos de ejemplo
const defaultUser: User = {
  id: '1',
  email: 'estudiante@universidad.edu',
  avatar: '/diverse-student-profiles.png',
  info: {
    nombre: 'Juan',
    apellido: 'Pérez',
    pais: 'Argentina',
    provincia: 'Buenos Aires',
    universidad: 'Universidad de Buenos Aires',
    facultad: 'Facultad de Ingeniería',
    año: 3
  }
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(defaultUser)

  const updateUserInfo = (info: Partial<User['info']>) => {
    if (user) {
      setUser({
        ...user,
        info: {
          ...user.info,
          ...info
        }
      })
    }
  }

  return (
    <UserContext.Provider value={{ user, setUser, updateUserInfo }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}