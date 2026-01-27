import { create } from 'zustand'

type AccountsStore = {
  selectedAccountId: string | null
  isCreatingAccount: boolean
  editingAccountId: string | null
  deletingAccountId: string | null
  actions: {
    setSelectedAccountId: (value: string | null) => void
    setIsCreatingAccount: (value: boolean) => void
    toggleIsCreatingAccount: () => void
    setEditingAccountId: (value: string | null) => void
    setDeletingAccountId: (value: string | null) => void
  }
}

export const useAccountsStore = create<AccountsStore>((set, get) => ({
  selectedAccountId: null,
  isCreatingAccount: false,
  editingAccountId: null,
  deletingAccountId: null,
  actions: {
    setSelectedAccountId: (value: string | null) => {
      set({ selectedAccountId: value })
    },
    setIsCreatingAccount: (value: boolean) => {
      set({ isCreatingAccount: value })
    },
    toggleIsCreatingAccount: () => {
      set({ isCreatingAccount: !get().isCreatingAccount })
    },
    setEditingAccountId: (value: string | null) => {
      set({ editingAccountId: value })
    },
    setDeletingAccountId: (value: string | null) => {
      set({ deletingAccountId: value })
    },
  },
}))
