import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useDonor } from '@/context/DonorContext';
import DonorSidebar from '@/components/donor/DonorSidebar';
import DonateModal from '@/components/donor/DonateModal';
import DonationCertificate from '@/components/donor/DonationCertificate';
import DashboardCard from '@/components/DashboardCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Bell, MessageCircle, CheckCircle, Award, FileText, Clock, Activity } from 'lucide-react';

const DonorDashboard = () => {
  const { user } = useAuth();
  const { donationIntents, donorMatches, donorProfile } = useDonor();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showDonateModal, setShowDonateModal] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  // Derive stats from Context
  const currentStatus = donationIntents.length > 0 ? donationIntents[0].status : 'Registered';
  const activeMatch = donorMatches.find(m => m.status !== 'Completed' && m.donorName === donorProfile.fullName);
  const completedCount = donorMatches.filter(m => m.status === 'Completed').length;
  const pendingIntents = donationIntents.filter(i => i.status === 'Pending Verification').length;
  const verifiedIntents = donationIntents.filter(i => i.status === 'Verified').length;

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-success text-success-foreground';
      case 'Matched': 
      case 'In Progress': return 'bg-primary text-primary-foreground';
      case 'Verified': return 'bg-warning text-warning-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const handleViewCertificate = (match) => {
    setSelectedCertificate({
      organType: match.organType,
      hospitalName: match.hospitalName,
      patientName: match.patientName,
      date: match.matchDate,
    });
    setShowCertificate(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <DonorSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      <main className="lg:ml-64 min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-20 bg-card border-b border-border px-6 py-4">
          <div className="ml-12 lg:ml-0 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Welcome, {donorProfile.fullName}</h1>
              <p className="text-muted-foreground">Thank you for being a life-saver</p>
            </div>
            <Badge className={getStatusColor(currentStatus)}>{currentStatus}</Badge>
          </div>
        </header>

        <div className="p-6 space-y-6">
          {/* Active Match Banner */}
          {activeMatch && (
            <Card className="border-success/50 bg-success/5">
              <CardContent className="flex items-center justify-between p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center">
                    <Heart className="w-6 h-6 text-success" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-success">You Have Been Matched!</h3>
                    <p className="text-sm text-muted-foreground">
                      Patient: {activeMatch.patientName} • Organ: {activeMatch.organType}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Status: {activeMatch.paymentCompleted ? 'Awaiting Procedure' : 'Awaiting Patient Payment'}
                    </p>
                  </div>
                </div>
                {activeMatch.paymentCompleted && (
                  <Badge className="bg-primary text-primary-foreground">Procedure Scheduled</Badge>
                )}
              </CardContent>
            </Card>
          )}

          {/* Stats Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <DashboardCard 
              icon={Heart} 
              title="Donations Completed" 
              value={String(completedCount)} 
              variant="success"
              subtitle="Lives saved through donation"
            />
            <DashboardCard 
              icon={Clock} 
              title="Pending Verification" 
              value={String(pendingIntents)} 
              variant="warning"
              subtitle="Awaiting hospital review"
            />
            <DashboardCard 
              icon={CheckCircle} 
              title="Verified Intents" 
              value={String(verifiedIntents)} 
              variant="primary"
              subtitle="Ready for matching"
            />
            <DashboardCard 
              icon={Award} 
              title="Certificates Earned" 
              value={String(completedCount)} 
              variant="primary"
              subtitle="Download your certificates"
            />
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-3">
                <Button 
                  onClick={() => setShowDonateModal(true)} 
                  className="h-24 flex-col gap-2 bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                >
                  <Heart className="h-8 w-8" />
                  <span className="font-semibold">Donate Organ</span>
                  <span className="text-xs opacity-80">Register donation intent</span>
                </Button>
                <Link to="/donor/alerts" className="block">
                  <Button variant="outline" className="w-full h-24 flex-col gap-2 border-warning/50 hover:bg-warning/10">
                    <Bell className="h-8 w-8 text-warning" />
                    <span className="font-semibold">View Alerts</span>
                    <span className="text-xs text-muted-foreground">Check urgent requests</span>
                  </Button>
                </Link>
                <Link to="/donor/messages" className="block">
                  <Button variant="outline" className="w-full h-24 flex-col gap-2 border-primary/50 hover:bg-primary/10">
                    <MessageCircle className="h-8 w-8 text-primary" />
                    <span className="font-semibold">Messages</span>
                    <span className="text-xs text-muted-foreground">Chat with hospital</span>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Recent Donation Intents */}
          {donationIntents.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  Your Donation Intents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {donationIntents.slice(0, 5).map(intent => (
                    <div key={intent.id} className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
                          <Heart className="h-5 w-5 text-destructive" />
                        </div>
                        <div>
                          <p className="font-medium">{intent.organType}</p>
                          <p className="text-sm text-muted-foreground">
                            {intent.createdAt.toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(intent.status)}>{intent.status}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Completed Donations with Certificates */}
          {donorMatches.filter(m => m.status === 'Completed').length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-success" />
                  Completed Donations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {donorMatches.filter(m => m.status === 'Completed').map(match => (
                    <div key={match.id} className="flex items-center justify-between p-4 rounded-lg border border-success/30 bg-success/5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
                          <CheckCircle className="h-5 w-5 text-success" />
                        </div>
                        <div>
                          <p className="font-medium">{match.organType} Donation</p>
                          <p className="text-sm text-muted-foreground">
                            Patient: {match.patientName} • {match.hospitalName}
                          </p>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        onClick={() => handleViewCertificate(match)}
                        className="bg-success hover:bg-success/90"
                      >
                        <Award className="w-4 h-4 mr-2" />
                        View Certificate
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <DonateModal isOpen={showDonateModal} onClose={() => setShowDonateModal(false)} />
      
      {showCertificate && selectedCertificate && (
        <DonationCertificate
          donorName={donorProfile.fullName}
          organType={selectedCertificate.organType}
          hospitalName={selectedCertificate.hospitalName}
          patientName={selectedCertificate.patientName}
          donationDate={selectedCertificate.date}
          certificateId={`CERT-${Date.now().toString(36).toUpperCase()}`}
          onClose={() => setShowCertificate(false)}
        />
      )}
    </div>
  );
};

export default DonorDashboard;