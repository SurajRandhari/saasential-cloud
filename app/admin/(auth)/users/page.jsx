import { getSession } from '@/lib/session'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default async function UsersPage() {
  const session = await getSession()
  if (!session) redirect('/admin/login')

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Users</h1>
        <Button>Add New User</Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p>User management interface will go here.</p>
        </CardContent>
      </Card>
    </>
  )
}
