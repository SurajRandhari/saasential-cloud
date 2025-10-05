"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

function getStatusBadge(status) {
  const statusConfig = {
    active: { variant: "default" },
    inactive: { variant: "secondary" },
  };
  const config = statusConfig[status] || statusConfig.inactive;
  return (
    <Badge variant={config.variant} className="capitalize">
      {status}
    </Badge>
  );
}

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    serviceSlug: null,
    serviceName: "",
  });
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await fetch("/api/services");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setServices(data);
        if (data.length > 0) {
          toast.success(`Loaded ${data.length} services`);
        }
      } catch {
        toast.error("Failed to load services");
      } finally {
        setIsLoading(false);
      }
    }
    fetchServices();
  }, []);

  // Sorting handler
  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      } else {
        return { key, direction: "asc" };
      }
    });
  };

  // Apply search filter
  const filteredServices = useMemo(() => {
    return services.filter(
      (service) =>
        service.name.toLowerCase().includes(searchText.toLowerCase()) ||
        (service.slug &&
          service.slug.toLowerCase().includes(searchText.toLowerCase()))
    );
  }, [services, searchText]);

  // Apply sorting
  const sortedServices = useMemo(() => {
    const sorted = [...filteredServices];
    sorted.sort((a, b) => {
      const aKey = (a[sortConfig.key] || "").toLowerCase();
      const bKey = (b[sortConfig.key] || "").toLowerCase();

      if (aKey < bKey) return sortConfig.direction === "asc" ? -1 : 1;
      if (aKey > bKey) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [filteredServices, sortConfig]);

  // Pagination slice
  const paginatedServices = useMemo(() => {
    const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedServices.slice(startIdx, startIdx + ITEMS_PER_PAGE);
  }, [sortedServices, currentPage]);

  const totalPages = Math.ceil(sortedServices.length / ITEMS_PER_PAGE);

  // FIXED: Use slug and name, never id, for delete
  const handleDeleteClick = (slug, name) => {
    setDeleteDialog({ open: true, serviceSlug: slug, serviceName: name });
  };

  const handleDeleteConfirm = async () => {
    const loadingToast = toast.loading("Deleting service...");
    try {
      const res = await fetch(`/api/services/${deleteDialog.serviceSlug}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete");
      setServices(services.filter((s) => s.slug !== deleteDialog.serviceSlug));
      toast.dismiss(loadingToast);
      toast.success(`Service "${deleteDialog.serviceName}" deleted`);
    } catch {
      toast.dismiss(loadingToast);
      toast.error("Delete failed");
    } finally {
      setDeleteDialog({ open: false, serviceSlug: null, serviceName: "" });
    }
  };

  if (isLoading)
    return <p className="text-center py-10">Loading services...</p>;

  // Helper to show sort icon
  const SortIcon = ({ columnKey }) => {
    if (sortConfig.key !== columnKey) return null;
    return sortConfig.direction === "asc" ? (
      <ChevronUp className="inline-block w-4 h-4 ml-1" />
    ) : (
      <ChevronDown className="inline-block w-4 h-4 ml-1" />
    );
  };

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold">Services</h1>
        <Link href="/admin/services/new" className="shrink-0">
          <Button
            size="md"
            variant="default"
            className="flex items-center gap-2 p-2"
          >
            <Plus className="w-5 h-5" /> Add New Service
          </Button>
        </Link>
      </div>

      <Input
        placeholder="Search by name or slug"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="mb-6 max-w-md"
        size="md"
      />

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                className="cursor-pointer select-none"
                onClick={() => handleSort("name")}
              >
                Name <SortIcon columnKey="name" />
              </TableHead>
              <TableHead
                className="cursor-pointer select-none"
                onClick={() => handleSort("slug")}
              >
                Slug <SortIcon columnKey="slug" />
              </TableHead>
              <TableHead
                className="cursor-pointer select-none"
                onClick={() => handleSort("status")}
              >
                Status <SortIcon columnKey="status" />
              </TableHead>
              <TableHead className="w-[80px] text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedServices.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center py-10 text-muted-foreground"
                >
                  No services found.
                </TableCell>
              </TableRow>
            ) : (
              paginatedServices.map((service) => (
                <TableRow key={service._id}>
                  <TableCell>{service.name}</TableCell>
                  <TableCell>{service.slug}</TableCell>
                  <TableCell>
                    {getStatusBadge(service.status || "inactive")}
                  </TableCell>
                  <TableCell className="text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="p-0">
                          <MoreHorizontal className="w-5 h-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem asChild>
                          <Link
                            href={`/admin/services/${service.slug}/edit`}
                            className="flex items-center gap-2"
                          >
                            <Edit className="w-4 h-4" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-red-600 hover:bg-red-50 flex items-center gap-2"
                          onClick={() =>
                            handleDeleteClick(service.slug, service.name)
                          }
                        >
                          <Trash2 className="w-4 h-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-4">
          <Button
            variant="outline"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          >
            Previous
          </Button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          >
            Next
          </Button>
        </div>
      )}

      <AlertDialog
        open={deleteDialog.open}
        onOpenChange={(open) => setDeleteDialog((prev) => ({ ...prev, open }))}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete{" "}
              <strong>{deleteDialog.serviceName}</strong>? This action is
              irreversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={handleDeleteConfirm}
            >
              Delete Service
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
