import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Header from "@/components/Header";
import DashboardCard from "@/components/DashboardCard";
import { Button } from "@/components/ui/button";
import {
  Building2,
  AlertTriangle,
  FileText,
  MessageCircle,
  Users,
  Activity,
} from "lucide-react";

function HospitalDashboard() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            {user?.name}
          </h1>
          <p className="text-muted-foreground">
            Hospital Management Dashboard
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <DashboardCard
            icon={FileText}
            title="Pending Requests"
            value="12"
            variant="warning"
          />
          <DashboardCard
            icon={AlertTriangle}
            title="Emergencies"
            value="2"
            variant="critical"
          />
          <DashboardCard
            icon={Users}
            title="Active Donors"
            value="45"
            variant="success"
          />
          <DashboardCard
            icon={Activity}
            title="Capacity"
            value="70%"
            variant="primary"
          />
        </div>

        <h2 className="text-xl font-semibold mb-4">
          Quick Actions
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Link to="/hospital/emergency">
            <Button
              variant="emergency"
              className="w-full h-24 flex-col gap-2"
            >
              <AlertTriangle className="h-6 w-6" />
              Red Alert
            </Button>
          </Link>

          <Link to="/hospital/request">
            <Button
              variant="default"
              className="w-full h-24 flex-col gap-2"
            >
              <FileText className="h-6 w-6" />
              Manage Requests
            </Button>
          </Link>

          <Link to="/hospital/chat">
            <Button
              variant="outline"
              className="w-full h-24 flex-col gap-2"
            >
              <MessageCircle className="h-6 w-6" />
              Messages
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default HospitalDashboard;

