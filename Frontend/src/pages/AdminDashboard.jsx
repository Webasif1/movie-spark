import { useState } from "react";
import { Film, Users } from "lucide-react";
import AdminMovieManagement from "@/components/AdminMovieManagement";
import AdminUserManagement from "@/components/AdminUserManagement";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("movies");

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container max-w-6xl">
        <div className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl text-foreground">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">Manage movies and users</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-8 border-b border-border">
          <button
            onClick={() => setActiveTab("movies")}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-medium transition-colors border-b-2 -mb-px ${
              activeTab === "movies"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <Film className="w-4 h-4" />
            Movies
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-medium transition-colors border-b-2 -mb-px ${
              activeTab === "users"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <Users className="w-4 h-4" />
            Users
          </button>
        </div>

        {activeTab === "movies" ? <AdminMovieManagement /> : <AdminUserManagement />}
      </div>
    </div>
  );
};

export default AdminDashboard;
