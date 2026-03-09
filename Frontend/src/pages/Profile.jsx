import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { User, Mail, Shield } from "lucide-react";

const Profile = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container max-w-lg">
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mb-4 ring-2 ring-primary/40">
            <User className="w-10 h-10 text-primary" />
          </div>
          <h1 className="font-display text-2xl text-foreground">{user.username}</h1>
          {user.role && (
            <span className="mt-1 text-xs font-medium uppercase tracking-wider text-primary flex items-center gap-1">
              <Shield className="w-3 h-3" />
              {user.role}
            </span>
          )}
        </div>

        <div className="rounded-xl border border-border bg-secondary/30 divide-y divide-border">
          <div className="flex items-center gap-3 px-5 py-4">
            <User className="w-5 h-5 text-muted-foreground shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground">Name</p>
              <p className="text-sm text-foreground font-medium">{user.username}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 px-5 py-4">
            <Mail className="w-5 h-5 text-muted-foreground shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground">Email</p>
              <p className="text-sm text-foreground font-medium">{user.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
