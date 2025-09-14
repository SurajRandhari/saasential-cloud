import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
})

// Test admin user - replace with database query later
export const testAdmin = {
  id: '1',
  email: 'admin@example.com',
  password: 'admin123',
  name: 'Admin User'
}

//need chnages
