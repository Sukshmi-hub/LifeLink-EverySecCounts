import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useNotifications } from '@/context/NotificationContext';
import Header from '@/components/Header';
import DashboardCard from '@/components/DashboardCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, AlertTriangle, FileText, MessageCircle, Users, Activity, Bell, Check, X, Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

const HospitalDashboard = () => {
  const { user } = useAuth();
  const { organRequests, notifications, getUnreadCount, markAsRead, updateOrganRequestStatus, simulateDonorMatch } = useNotifications();
  const [showNotifications, setShowNotifications] = useState(false);

  const hospitalNotifications = notifications.filter(n => n.targetRole === 'hospital');
  const unreadCount = getUnreadCount('hospital');

  const getStatusColor = (status) => {
    switch (status) {
      case 'Accepted': case 'Donor Matched': return 'bg-success/20 text-success';
      case 'Rejected': return 'bg-destructive/20 text-destructive';
      case 'In Progress': return 'bg-warning/20 text-warning';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">{user?.name}</h1>
            <p className="text-muted-foreground">Hospital Management Dashboard</p>
          </div>
          <div className="relative">
            <Button variant="ghost" size="icon" onClick={() => setShowNotifications(!showNotifications)}>
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">{unreadCount}</span>}
            </Button>
            {showNotifications && (
              <div className="absolute right-0 top-12 w-80 bg-card border border-border rounded-lg shadow-lg z-50">
                <div className="p-4 border-b border-border"><h3 className="font-semibold">Notifications</h3></div>
                <div className="max-h-64 overflow-y-auto">
                  {hospitalNotifications.length === 0 ? <p className="p-4 text-center text-muted-foreground">No notifications</p> : hospitalNotifications.slice(0, 5).map(n => (
                    <div key={n.id} className={cn("p-4 border-b border-border cursor-pointer hover:bg-muted/50", !n.read && "bg-primary/5")} onClick={() => markAsRead(n.id)}>
                      <p className="font-medium text-sm">{n.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">{n.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <DashboardCard icon={FileText} title="Pending Requests" value={String(organRequests.filter(r => r.status === 'Pending – Hospital Review').length)} variant="warning" />
          <DashboardCard icon={AlertTriangle} title="Emergencies" value={String(organRequests.filter(r => r.urgency === 'High').length)} variant="critical" />
          <DashboardCard icon={Users} title="Total Requests" value={String(organRequests.length)} variant="success" />
          <DashboardCard icon={Activity} title="Matched" value={String(organRequests.filter(r => r.status === 'Donor Matched').length)} variant="primary" />
        </div>

        <Card className="mb-8">
          <CardHeader><CardTitle>Patient Requests</CardTitle></CardHeader>
          <CardContent>
            {organRequests.length === 0 ? <p className="text-center py-8 text-muted-foreground">No requests yet</p> : (
              <div className="space-y-4">
                {organRequests.map(req => (
                  <div key={req.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div>
                      <h4 className="font-medium">{req.patientName}</h4>
                      <p className="text-sm text-muted-foreground">{req.organType} • Urgency: <span className={req.urgency === 'High' ? 'text-destructive font-medium' : ''}>{req.urgency}</span></p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={cn("px-3 py-1 rounded-full text-xs font-medium", getStatusColor(req.status))}>{req.status}</span>
                      {req.status === 'Pending – Hospital Review' && (
                        <>
                          <Button size="sm" variant="outline" onClick={() => updateOrganRequestStatus(req.id, 'Accepted')}><Check className="w-4 h-4" /></Button>
                          <Button size="sm" variant="outline" onClick={() => updateOrganRequestStatus(req.id, 'Rejected')}><X className="w-4 h-4" /></Button>
                        </>
                      )}
                      {req.status === 'Accepted' && (
                        <Button size="sm" onClick={() => simulateDonorMatch(req.id, 'Rahul Sharma')}><Play className="w-4 h-4 mr-1" />Match Donor</Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Link to="/hospital/emergency"><Button variant="destructive" className="w-full h-24 flex-col gap-2"><AlertTriangle className="h-6 w-6" />Red Alert</Button></Link>
          <Link to="/hospital/request"><Button variant="default" className="w-full h-24 flex-col gap-2"><FileText className="h-6 w-6" />Manage Requests</Button></Link>
          <Link to="/hospital/chat"><Button variant="outline" className="w-full h-24 flex-col gap-2"><MessageCircle className="h-6 w-6" />Messages</Button></Link>
        </div>
      </main>
    </div>
  );
};

export default HospitalDashboard;