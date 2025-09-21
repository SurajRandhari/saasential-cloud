// app/admin/whitepapers/page.jsx
"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Plus, Search, MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react"

export default function WhitepapersAdminPage() {
  const [items, setItems] = useState([])
  const [searchText, setSearchText] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [deleteDialog, setDeleteDialog] = useState({ open: false, id: null, title: "" })

  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetch("/api/whitepaper", { cache: "no-store" })
        if (!res.ok) throw new Error("Failed to fetch")
        setItems(await res.json())
      } catch {
        toast.error("Failed to load whitepapers")
      } finally {
        setIsLoading(false)
      }
    })()
  }, [])

  const filtered = items.filter(w =>
    (w.title || "").toLowerCase().includes(searchText.toLowerCase()) ||
    (w.slug || "").toLowerCase().includes(searchText.toLowerCase())
  )

  const confirmDelete = async () => {
    const loading = toast.loading("Deleting...")
    try {
      const res = await fetch(`/api/whitepaper/${deleteDialog.id}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Delete failed")
      setItems(items.filter(w => String(w._id) !== String(deleteDialog.id)))
      toast.success(`Deleted "${deleteDialog.title}"`)
    } catch {
      toast.error("Failed to delete")
    } finally {
      toast.dismiss(loading)
      setDeleteDialog({ open: false, id: null, title: "" })
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Whitepapers</h1>
            <p className="text-muted-foreground">Loading whitepapers...</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[1,2,3,4].map(i => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="h-3 bg-gray-200 rounded animate-pulse w-16"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Whitepapers</h1>
            <p className="text-muted-foreground">Manage whitepapers and files</p>
          </div>
          <Link href="/admin/whitepapers/new">
            <Button><Plus className="mr-2 h-4 w-4" />New Whitepaper</Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <CardTitle>All Whitepapers ({filtered.length})</CardTitle>
              <div className="relative w-full sm:w-[320px]">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search by title or slug..." className="pl-8" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {filtered.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                {items.length === 0 ? (
                  <div className="space-y-4">
                    <div className="text-6xl">📄</div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">No whitepapers yet</h3>
                      <p>Create the first whitepaper to get started.</p>
                    </div>
                    <Link href="/admin/whitepapers/new">
                      <Button><Plus className="mr-2 h-4 w-4" />Create Whitepaper</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="text-4xl">🔍</div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">No results</h3>
                      <p>Try clearing the search term.</p>
                    </div>
                    <Button variant="outline" onClick={() => setSearchText("")}>Clear Search</Button>
                  </div>
                )}
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Slug</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>PDF Size</TableHead>
                    <TableHead className="w-[60px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map(w => (
                    <TableRow key={w._id}>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium">{w.title}</div>
                          {/* <p className="text-sm text-muted-foreground line-clamp-1">{w.description}</p> */}
                        </div>
                      </TableCell>
                      <TableCell><Badge variant="outline">{w.slug}</Badge></TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {w.createdAt ? new Date(w.createdAt).toLocaleDateString() : "-"}
                          <div className="text-xs text-muted-foreground">
                            {w.createdAt ? new Date(w.createdAt).toLocaleTimeString() : ""}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{w.pdf?.bytes ? `${Math.round(w.pdf.bytes/1024)} KB` : "-"}</div>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem asChild>
                              <Link href={`/whitepaper/${w.slug}`} target="_blank">
                                <Eye className="mr-2 h-4 w-4" /> View
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/admin/whitepapers/${w._id}/edit`}>
                                <Edit className="mr-2 h-4 w-4" /> Edit
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-red-600 focus:text-red-600 focus:bg-red-50"
                              onClick={() => setDeleteDialog({ open: true, id: w._id, title: w.title })}
                            >
                              <Trash2 className="mr-2 h-4 w-4" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>

      <AlertDialog open={deleteDialog.open} onOpenChange={open => setDeleteDialog(prev => ({ ...prev, open }))}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete whitepaper?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={confirmDelete}>
              <Trash2 className="mr-2 h-4 w-4" /> Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
