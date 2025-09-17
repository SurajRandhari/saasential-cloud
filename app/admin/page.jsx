import { getSession } from '@/lib/session'
import { redirect } from 'next/navigation'

export default async function AdminPage() {
  const session = await getSession()
  
  if (session) {
    redirect('/admin/dashboard')
  } else {
    redirect('/admin/login')
  }
}
