import { AdminLoginForm } from '@/components/ui/login-form'
import { getSession } from '@/lib/session'
import { redirect } from 'next/navigation'

export default async function LoginPage() {
  const session = await getSession()
  if (session) {
    redirect('/admin/dashboard')
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <AdminLoginForm />
      </div>
    </div>
  )
}
