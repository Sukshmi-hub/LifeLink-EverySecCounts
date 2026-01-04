import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth, getRoleBasedRedirect } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  Heart,
  LogIn,
  UserPlus,
  Mail,
  Lock,
  User,
  Phone,
  MapPin,
  Droplets,
  ArrowLeft,
  Loader2,
  CheckCircle,
} from "lucide-react";

function Login() {
  const navigate = useNavigate();
  const { login, register, verifyOtp, isAuthenticated, user } = useAuth();
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState("login");
  const [isLoading, setIsLoading] = useState(false);
  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState("");

  // Login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginRole, setLoginRole] = useState("patient");

  // Register state
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "patient",
    bloodType: "",
    location: "",
  });

  const [otpInput, setOtpInput] = useState("");

  useEffect(() => {
    if (isAuthenticated && user) {
      navigate(getRoleBasedRedirect(user.role));
    }
  }, [isAuthenticated, user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(loginEmail, loginPassword, loginRole);
      if (success) {
        toast({
          title: "Welcome back!",
          description: "You have successfully logged in.",
        });
        navigate(getRoleBasedRedirect(loginRole));
      }
    } catch {
      toast({
        title: "Login Failed",
        description: "Please check your credentials.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await register(registerData);
      if (result.success) {
        setGeneratedOtp(result.otp);
        setShowOtpScreen(true);
        toast({
          title: "OTP Sent!",
          description: `Demo OTP: ${result.otp}`,
        });
      }
    } catch {
      toast({
        title: "Registration Failed",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await verifyOtp(otpInput, generatedOtp);
      if (success) {
        toast({
          title: "Account Verified!",
          description: "Your account has been created.",
        });
        navigate(getRoleBasedRedirect(registerData.role));
      } else {
        toast({
          title: "Invalid OTP",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const roles = [
    { value: "patient", label: "Patient" },
    { value: "donor", label: "Donor" },
    { value: "hospital", label: "Hospital" },
    { value: "ngo", label: "NGO" },
    { value: "admin", label: "Admin" },
  ];

  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  /* OTP SCREEN */
  if (showOtpScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-hero p-4">
        <div className="w-full max-w-md bg-card p-8 rounded-2xl border shadow-lg">
          <Button variant="ghost" onClick={() => setShowOtpScreen(false)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <div className="text-center my-6">
            <CheckCircle className="mx-auto h-10 w-10 text-success" />
            <h2 className="text-2xl font-bold mt-4">Verify Account</h2>
            <p className="text-muted-foreground">
              Demo OTP: <b>{generatedOtp}</b>
            </p>
          </div>

          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <Input
              placeholder="Enter OTP"
              value={otpInput}
              onChange={(e) => setOtpInput(e.target.value)}
              required
              className="text-center text-xl tracking-widest"
            />
            <Button className="w-full" disabled={isLoading}>
              {isLoading ? <Loader2 className="animate-spin" /> : "Verify"}
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero p-4">
      <div className="w-full max-w-md">
        <Link to="/" className="flex justify-center items-center gap-2 mb-6">
          <Heart className="text-primary" />
          <span className="font-bold text-xl">LifeLink</span>
        </Link>

        <div className="bg-card p-8 rounded-2xl border shadow-lg">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            {/* LOGIN */}
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <Input
                  placeholder="Email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />

                <Select value={loginRole} onValueChange={setLoginRole}>
                  <SelectTrigger>
                    <SelectValue placeholder="Role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((r) => (
                      <SelectItem key={r.value} value={r.value}>
                        {r.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button className="w-full" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Login"}
                </Button>
              </form>
            </TabsContent>

            {/* REGISTER */}
            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4">
                <Input
                  placeholder="Full Name"
                  value={registerData.name}
                  onChange={(e) =>
                    setRegisterData({ ...registerData, name: e.target.value })
                  }
                  required
                />
                <Input
                  placeholder="Email"
                  value={registerData.email}
                  onChange={(e) =>
                    setRegisterData({ ...registerData, email: e.target.value })
                  }
                  required
                />
                <Input
                  placeholder="Phone"
                  value={registerData.phone}
                  onChange={(e) =>
                    setRegisterData({ ...registerData, phone: e.target.value })
                  }
                  required
                />

                <Select
                  value={registerData.role}
                  onValueChange={(v) =>
                    setRegisterData({ ...registerData, role: v })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.slice(0, 4).map((r) => (
                      <SelectItem key={r.value} value={r.value}>
                        {r.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={registerData.bloodType}
                  onValueChange={(v) =>
                    setRegisterData({ ...registerData, bloodType: v })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Blood Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {bloodTypes.map((b) => (
                      <SelectItem key={b} value={b}>
                        {b}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Input
                  placeholder="Location"
                  value={registerData.location}
                  onChange={(e) =>
                    setRegisterData({
                      ...registerData,
                      location: e.target.value,
                    })
                  }
                  required
                />

                <Button className="w-full" disabled={isLoading}>
                  {isLoading ? "Creating..." : "Create Account"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default Login;
