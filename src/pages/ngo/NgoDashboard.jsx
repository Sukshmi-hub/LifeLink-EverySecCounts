import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Header from "@/components/Header";
import DashboardCard from "@/components/DashboardCard";
import { Button } from "@/components/ui/button";
import {
  HandHeart,
  Users,
  DollarSign,
  MessageCircle,
  Heart,
} from "lucide-react";

function NgoDashboard() {
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
            NGO Support Dashboard
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <DashboardCard
            icon={Users}
            title="Beneficiaries"
            value="156"
            variant="primary"
          />
          <DashboardCard
            icon={DollarSign}
            title="Funds Raised"
            value="$45K"
            variant="success"
          />
          <DashboardCard
            icon={HandHeart}
            title="Active Campaigns"
            value="8"
            variant="warning"
          />
          <DashboardCard
            icon={Heart}
            title="Lives Supported"
            value="342"
            variant="success"
          />
        </div>

        <h2 className="text-xl font-semibold mb-4">
          Quick Actions
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <Link to="/ngo/support">
            <Button
              variant="default"
              className="w-full h-24 flex-col gap-2"
            >
              <HandHeart className="h-6 w-6" />
              Financial Support
            </Button>
          </Link>

          <Link to="/ngo/chat">
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

export default NgoDashboard;
