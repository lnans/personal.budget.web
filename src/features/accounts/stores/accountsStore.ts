import { create } from 'zustand'

type AccountsStore = {
  isCreatingAccount: boolean
  actions: {
    setIsCreatingAccount: (value: boolean) => void
    toggleIsCreatingAccount: () => void
  }
}

export const useAccountsStore = create<AccountsStore>((set, get) => ({
  isCreatingAccount: false,
  actions: {
    setIsCreatingAccount: (value: boolean) => {
      set({ isCreatingAccount: value })
    },
    toggleIsCreatingAccount: () => {
      set({ isCreatingAccount: !get().isCreatingAccount })
    },
  },
}))
