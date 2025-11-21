import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface User {
  id: string
  email: string
  name: string
  first_name?: string
  studentId: string
  avatar_url?: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  loading: boolean
  setUser: (user: User | null) => void
  login: (email: string, password: string) => Promise<void>
  loginWithGoogle: () => Promise<void>
  logout: () => void
  checkAuth: () => void
}

// Demo users for testing
const DEMO_USERS = [
  {
    id: '1',
    email: 'demo@student.edu',
    password: 'password123',
    name: 'Christopher Demo',
    studentId: 'STU001'
  },
  {
    id: '2',
    email: 'student@mmu.edu',
    password: 'student123',
    name: 'John Student',
    studentId: 'STU002'
  }
]

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      loading: false,
      
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      
      login: async (email: string, password: string) => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800))
        
        // Find user
        const demoUser = DEMO_USERS.find(
          u => u.email === email && u.password === password
        )
        
        if (!demoUser) {
          throw new Error('Invalid email or password')
        }
        
        const { password: _, ...userWithoutPassword } = demoUser
        // Extract first name from full name
        const firstName = userWithoutPassword.name.split(' ')[0]
        const user = { ...userWithoutPassword, first_name: firstName }
        set({ user, isAuthenticated: true })
      },
      
      loginWithGoogle: async () => {
        // For demo purposes, simulate Google login
        // In production, this would use Supabase OAuth
        const googleUser = {
          id: 'google-' + Date.now(),
          email: 'user@gmail.com',
          name: 'Google User',
          first_name: 'Google',
          studentId: 'STU' + Math.floor(Math.random() * 1000),
          avatar_url: 'https://ui-avatars.com/api/?name=Google+User'
        }
        set({ user: googleUser, isAuthenticated: true })
      },
      
      logout: () => {
        set({ user: null, isAuthenticated: false })
      },
      
      checkAuth: () => {
        // Auth state is persisted, so just check if user exists
        set((state) => ({ isAuthenticated: !!state.user }))
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated })
    }
  )
)
