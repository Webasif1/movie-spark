import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Users, Ban, Trash2, ShieldCheck, ShieldOff } from "lucide-react";
import { adminUsersApi } from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const AdminUserManagement = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-users"],
    queryFn: adminUsersApi.getAll,
  });

  const banMutation = useMutation({
    mutationFn: (id) => adminUsersApi.ban(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      toast({ title: "User banned" });
    },
    onError: (err) => toast({ title: "Error", description: err.message, variant: "destructive" }),
  });

  const unbanMutation = useMutation({
    mutationFn: (id) => adminUsersApi.unban(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      toast({ title: "User unbanned" });
    },
    onError: (err) => toast({ title: "Error", description: err.message, variant: "destructive" }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => adminUsersApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      toast({ title: "User deleted" });
    },
    onError: (err) => toast({ title: "Error", description: err.message, variant: "destructive" }),
  });

  const users = data?.users || [];

  if (isLoading) return <p className="text-muted-foreground">Loading users...</p>;

  if (error) {
    return (
      <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-6 text-center">
        <p className="text-destructive font-medium mb-1">Failed to load users</p>
        <p className="text-sm text-muted-foreground">
          Make sure your backend <code className="text-foreground">/api/admin/users</code> endpoint exists.
        </p>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="text-center py-16 text-muted-foreground">
        <Users className="w-12 h-12 mx-auto mb-3 opacity-40" />
        <p>No users found.</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-secondary/50">
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="hidden sm:table-cell">Role</TableHead>
            <TableHead className="hidden md:table-cell">Status</TableHead>
            <TableHead className="w-32 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((u) => (
            <TableRow key={u._id} className="hover:bg-secondary/30">
              <TableCell className="font-medium text-foreground">{u.name}</TableCell>
              <TableCell className="text-muted-foreground">{u.email}</TableCell>
              <TableCell className="hidden sm:table-cell">
                <Badge variant={u.role === "admin" ? "default" : "secondary"}>
                  {u.role || "user"}
                </Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {u.isBanned ? (
                  <Badge variant="destructive">Banned</Badge>
                ) : (
                  <Badge variant="outline" className="text-green-600 border-green-600/30">Active</Badge>
                )}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-1">
                  {u.isBanned ? (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => unbanMutation.mutate(u._id)}
                      title="Unban user"
                      className="text-green-600 hover:text-green-600"
                    >
                      <ShieldCheck className="w-4 h-4" />
                    </Button>
                  ) : (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => banMutation.mutate(u._id)}
                      title="Ban user"
                      className="text-orange-500 hover:text-orange-500"
                    >
                      <ShieldOff className="w-4 h-4" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      if (window.confirm(`Delete user "${u.name}"? This cannot be undone.`)) {
                        deleteMutation.mutate(u._id);
                      }
                    }}
                    className="text-destructive hover:text-destructive"
                    title="Delete user"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminUserManagement;
