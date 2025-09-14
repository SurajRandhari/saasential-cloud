'use server'

import { redirect } from 'next/navigation'
import { createSession, deleteSession } from './session'
import { loginSchema, testAdmin } from './auth'

export async function login(prevState, formData) {
  // Get form data
  const email = formData.get('email')
  const password = formData.get('password')
  
  // Validate form data
  const result = loginSchema.safeParse({ email, password })
  
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    }
  }

  // Check credentials
  if (email !== testAdmin.email || password !== testAdmin.password) {
    return {
      errors: {
        root: 'Invalid email or password'
      }
    }
  }

  // Create session and redirect
  await createSession(testAdmin.id)
  redirect('/admin/dashboard')
}

export async function logout() {
  await deleteSession()
  redirect('/admin/login')
}
