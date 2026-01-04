import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Header from "@/components/Header";
import DashboardCard from "@/components/DashboardCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import RedAlertModal from "@/components/RedAlertModal";
import {
  Droplets,
  Bell,
  MessageCircle,
  UserPlus,
  Heart,
  CheckCircle,
  AlertTriangle,
  Siren,
} from "lucide-react";

const organDonationTypes = [
  { name: "Kidney", description: "Most commonly transplanted organ", icon: "🫘" },
  { name: "Liver", description: "Can regenerate after partial donation", icon: "🫀" },
  { name: "Heart", description: "Critical for cardiac patients", icon: "❤️" },
  { name: "Lungs", description: "For respiratory failure patients", icon: "🫁" },
  { name: "Pancreas", description: "For diabetes treatment", icon: "🔬" },
  { name: "Intestines", description: "For bowel failure patients", icon: "🔄" },
  { name: "Corneas", description: "Restore vision to the blind", icon: "👁️" },
  { name: "Skin", description: "For burn victims", icon: "🩹" },
  { name: "Bone", description: "For orthopedic procedures", icon: "🦴" },
  { name: "Heart Valves", description: "For cardiac surgery", icon: "💗" },
];

function DonorDashboard() {
  const { user } = useAuth();
  const [showRedAlert, setShowRedAlert] = useState(false);

  const mockRedAlert = {
    id: "alert_critical_001",
    type: "blood",
    bloodType: "O-",
    hospitalName: "City Emergency Hospital",
    hospitalLocation: "123 Medical Center Blvd, Downtown",
    patientInfo:
      "Critical accident victim, needs immediate O- blood transfusion",
    contactNumber: "+1 (555) 911-HELP",
    createdAt: new Date().toISOString(),
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-8">
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Welcome, {user?.name}
            </h1>
            <p className="text-muted-foreground">
              Thank you for being a life-saver. Your donations matter.
            </p>
          </div>

          <Button
            variant="emergency"
            onClick={() => setShowRedAlert(true)}
            className="gap-2"
          >
            <Siren className="h-4 w-4" />
            View Red Alert
          </Button>
        </div>

        {/* Red Alert Banner */}
        <div
          className="mb-8 p-4 rounded-xl bg-destructive/10 border border-destructive/30 cursor-pointer hover:bg-destructive/20 transition-colors"
          onClick={() => setShowRedAlert(true)}
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-destructive animate-pulse">
              <AlertTriangle className="h-6 w-6 text-destructive-foreground" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-destructive">
                  Active Red Alert
                </h3>
                <Badge variant="destructive">URGENT</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                O- Blood needed urgently at City Emergency Hospital
              </p>
            </div>
            <Button variant="destructive" size="sm">
              Respond Now
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <DashboardCard
            icon={Droplets}
            title="Total Donations"
            value="8"
            variant="primary"
          />
          <DashboardCard
            icon={Bell}
            title="Active Alerts"
            value="3"
            variant="warning"
          />
          <DashboardCard
            icon={Heart}
            title="Lives Saved"
            value="12"
            variant="success"
          />
          <DashboardCard
            icon={CheckCircle}
            title="Status"
            value="Available"
            variant="success"
          />
        </div>

        {/* Quick Actions */}
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-8">
          <Link to="/donor/register">
            <Button className="w-full h-24 flex-col gap-2">
              <UserPlus className="h-6 w-6" />
              Update Profile
            </Button>
          </Link>

          <Link to="/donor/alerts">
            <Button
              variant="outline"
              className="w-full h-24 flex-col gap-2"
            >
              <Bell className="h-6 w-6" />
              View Alerts
            </Button>
          </Link>

          <Link to="/donor/chat">
            <Button
              variant="outline"
              className="w-full h-24 flex-col gap-2"
            >
              <MessageCircle className="h-6 w-6" />
              Messages
            </Button>
          </Link>
        </div>

        {/* Organ Donation Types */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              Types of Organ Donations
            </CardTitle>
            <CardDescription>
              Learn about the different organs that can be donated to save lives
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {organDonationTypes.map((organ) => (
                <div
                  key={organ.name}
                  className="p-4 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-md transition-all text-center"
                >
                  <div className="text-3xl mb-2">{organ.icon}</div>
                  <h3 className="font-semibold text-foreground text-sm">
                    {organ.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {organ.description}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Red Alert Modal */}
      <RedAlertModal
        open={showRedAlert}
        onClose={() => setShowRedAlert(false)}
        alert={mockRedAlert}
      />
    </div>
  );
}

export default DonorDashboard;
