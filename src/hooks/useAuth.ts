import { User } from '@/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'


interface AuthState {
  user: User | null
  isAuthenticated: boolean
  setUser: (user: User | null) => void // Set the user data in state
  fetchUser: () => Promise<void> // Function to fetch user data from /me endpoint
}

// Utility function to fetch the user data based on the token (from the httpOnly cookie)
const fetchUserFromToken = async () => {
  try {
    const response = await fetch(`http://localhost:5000/api/user/me`, {
      method: 'GET',
      credentials: 'include', // Important for sending the httpOnly cookie
    });

    if (!response.ok) {
      throw new Error('User not authenticated');
    }

    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
}

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      
      // Function to set the user in the state
      setUser: (user: User | null) => {
        set({ user, isAuthenticated: !!user });
      },

      // Function to fetch the user from the server
      fetchUser: async () => {
        if(get().isAuthenticated) return;
        const userData = await fetchUserFromToken();
        set({ user: userData, isAuthenticated: !!userData });
      },
    }),
    {
      name: 'auth-storage', // Persist the store data to localStorage or IndexedDB
    }
  )
)
