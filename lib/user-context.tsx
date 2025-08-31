'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { User } from './types'

interface UserContextType {
  user: User | null
  setUser: (user: User | null) => void
  updateUserInfo: (info: Partial<User['info']>) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

// Sample data
const defaultUser: User = {
  id: '1',
  email: 'student@university.edu',
  avatar: '/diverse-student-profiles.png',
  info: {
    firstName: 'Juan',
    lastName: 'Pérez',
    country: 'Argentina',
    state: 'Buenos Aires',
    university: 'University of Buenos Aires',
    faculty: 'Faculty of Engineering',
    year: 3
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
