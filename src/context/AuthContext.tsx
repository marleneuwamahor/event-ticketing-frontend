/* eslint-disable react/only-export-components */
import {
  createContext,
  useContext,
  useCallback,
  useState,
  type ReactNode,
} from 'react'

export type UserRole = 'Attendee' | 'Organizer'

export interface AuthUser {
  id: string
  firstName: string
  lastName: string
  email: string
  role: UserRole
  isVerified?: boolean
}

interface AuthContextType {
  user: AuthUser | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (
    firstName: string,
    lastName: string | undefined,
    email: string,
    password: string
  ) => Promise<void>
  logout: () => void
  setRole: (role: UserRole) => void
  verifyOtp: (email: string, otp: string) => Promise<void>
  resendOtp: (email: string) => Promise<void>
  forgotPassword: (email: string) => Promise<void>
  resetPassword: (token: string, newPassword: string) => Promise<void>
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
  setRole: () => {},
  verifyOtp: async () => {},
  resendOtp: async () => {},
  forgotPassword: async () => {},
  resetPassword: async () => {},
})

const API_BASE_URL = '/api'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(loadStoredUser())
  const [isLoading, setIsLoading] = useState(false)

  const api = useCallback(async (endpoint: string, options: RequestInit = {}) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem(TOKEN_STORAGE_KEY) : null
    const res = await fetch(API_BASE_URL + endpoint, {
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options.headers || {}),
      },
      body: options.body,
    })
    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      throw new Error(err.message || err.error || 'API Error: ' + res.status)
    }
    return res.json()
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const data = await api('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      })
      const { user, token } = data
      if (user?.isVerified === false) {
        throw new Error('Account not verified. Please check your email and verify your account.')
      }
      if (token) {
        localStorage.setItem(TOKEN_STORAGE_KEY, token)
      }
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user))
      setUser(user)
    } catch (e) {
      throw e
    } finally {
      setIsLoading(false)
    }
  }, [api])

  const signup = useCallback(
    async (firstName: string, lastName: string | undefined, email: string, password: string) => {
      setIsLoading(true)
      try {
        await api('/auth/register', {
          method: 'POST',
          body: JSON.stringify({ name: `${firstName} ${lastName ?? ''}`.trim(), email, password }),
        })
      } catch (e) {
        throw e
      } finally {
        setIsLoading(false)
      }
    },
    [api]
  )

  const verifyOtp = useCallback(
    async (email: string, otp: string) => {
      setIsLoading(true)
      try {
        const data = await api('/auth/verify-otp', {
          method: 'POST',
          body: JSON.stringify({ email, otp }),
        })
        const { user, token } = data
        if (token) {
          localStorage.setItem(TOKEN_STORAGE_KEY, token)
        }
        if (user) {
          localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user))
          setUser(user)
        }
      } catch (e) {
        throw e
      } finally {
        setIsLoading(false)
      }
    },
    [api]
  )

  const resendOtp = useCallback(
    async (email: string) => {
      setIsLoading(true)
      try {
        await api('/auth/resend-otp', {
          method: 'POST',
          body: JSON.stringify({ email }),
        })
      } catch (e) {
        throw e
      } finally {
        setIsLoading(false)
      }
    },
    [api]
  )

  const forgotPassword = useCallback(
    async (email: string) => {
      setIsLoading(true)
      try {
        await api('/auth/forgot-password', {
          method: 'POST',
          body: JSON.stringify({ email }),
        })
      } catch (e) {
        throw e
      } finally {
        setIsLoading(false)
      }
    },
    [api]
  )

  const resetPassword = useCallback(
    async (token: string, newPassword: string) => {
      setIsLoading(true)
      try {
        await api('/auth/reset-password', {
          method: 'POST',
          body: JSON.stringify({ token, newPassword }),
        })
      } catch (e) {
        throw e
      } finally {
        setIsLoading(false)
      }
    },
    [api]
  )

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_STORAGE_KEY)
    localStorage.removeItem(TOKEN_STORAGE_KEY)
    setUser(null)
  }, [])

  const setRole = useCallback((role: UserRole) => {
    setUser((prev) => {
      if (!prev) return null
      const updated = { ...prev, role }
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updated))
      return updated
    })
  }, [])

  return (
    <AuthContext.Provider
      value={{ user, isLoading, login, signup, logout, setRole, verifyOtp, resendOtp, forgotPassword, resetPassword }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return ctx
}

const AUTH_STORAGE_KEY = 'kevents_auth_user'
const TOKEN_STORAGE_KEY = 'kevents_auth_token'

function loadStoredUser(): AuthUser | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as AuthUser
  } catch {
    return null
  }
}