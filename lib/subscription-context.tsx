'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface SubscriptionContextType {
  isPro: boolean
  showUpgradeModal: boolean
  setShowUpgradeModal: (show: boolean) => void
  upgradeToPro: () => void
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined)

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const [isPro, setIsPro] = useState(false)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)

  const upgradeToPro = () => {
    setIsPro(true)
    setShowUpgradeModal(false)
  }

  return (
    <SubscriptionContext.Provider 
      value={{ 
        isPro, 
        showUpgradeModal, 
        setShowUpgradeModal, 
        upgradeToPro 
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  )
}

export function useSubscription() {
  const context = useContext(SubscriptionContext)
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider')
  }
  return context
}