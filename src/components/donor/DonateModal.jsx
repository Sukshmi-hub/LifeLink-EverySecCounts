import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { useDonor } from '@/context/DonorContext';
import { useAuth } from '@/context/AuthContext';
import { CheckCircle, Heart, AlertTriangle, ArrowRight, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

// ✅ SAFE Medical Icons (all verified existing)
import { GiKidneys, GiLiver, GiLungs, GiMedicalDrip, GiSkeleton } from "react-icons/gi";
import { FaEye, FaHeart } from "react-icons/fa";
import { MdBiotech } from "react-icons/md";

const organOptions = [
  {
    id: 'kidney',
    name: 'Kidney',
    description: 'Most commonly transplanted organ',
    icon: GiKidneys,
  },
  {
    id: 'liver',
    name: 'Liver',
    description: 'Can regenerate after partial donation',
    icon: GiLiver,
  },
  {
    id: 'heart',
    name: 'Heart',
    description: 'Critical for cardiac patients',
    icon: FaHeart, // ✅ SAFE replacement
  },
  {
    id: 'lung',
    name: 'Lung',
    description: 'For respiratory failure patients',
    icon: GiLungs,
  },
  {
    id: 'pancreas',
    name: 'Pancreas',
    description: 'For diabetes treatment',
    icon: MdBiotech,
  },
  {
    id: 'cornea',
    name: 'Cornea',
    description: 'Restore vision to the blind',
    icon: FaEye,
  },
  {
    id: 'bone_marrow',
    name: 'Bone Marrow',
    description: 'For blood cancer patients',
    icon: GiSkeleton, // ✅ SAFE replacement
  },
];

const DonateModal = ({ isOpen, onClose }) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const { addDonationIntent, donorProfile } = useDonor();

  const [step, setStep] = useState('select');
  const [selectedOrgan, setSelectedOrgan] = useState(null);
  const [consentChecks, setConsentChecks] = useState({
    voluntary: false,
    risks: false,
    pressure: false,
    verification: false,
    terms: false,
  });

  const allConsentsChecked = Object.values(consentChecks).every(Boolean);

  const handleOrganSelect = (organId) => {
    setSelectedOrgan(organId);
  };

  const handleProceedToConsent = () => {
    if (!selectedOrgan) {
      toast({
        title: 'Please select an organ',
        description: 'You must select an organ to proceed.',
        variant: 'destructive',
      });
      return;
    }
    setStep('consent');
  };

  const handleSubmit = () => {
    if (!allConsentsChecked) {
      toast({
        title: 'Consent Required',
        description: 'Please agree to all terms and conditions.',
        variant: 'destructive',
      });
      return;
    }

    const organ = organOptions.find(o => o.id === selectedOrgan);
    if (!organ) return;

    addDonationIntent({
      donorId: user?.id || 'donor_1',
      donorName: donorProfile.fullName || user?.name || 'Anonymous Donor',
      organType: organ.name,
      donorHospitalName: 'City General Hospital',
    });

    setStep('success');
    toast({
      title: 'Donation Intent Submitted',
      description: 'Your donation intent has been sent to the hospital for verification.',
    });
  };

  const handleClose = () => {
    setStep('select');
    setSelectedOrgan(null);
    setConsentChecks({
      voluntary: false,
      risks: false,
      pressure: false,
      verification: false,
      terms: false,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">

        {/* ================= SELECT ORGAN STEP ================= */}
        {step === 'select' && (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-xl">
                <Heart className="h-6 w-6 text-primary" />
                Choose Organ to Donate
              </DialogTitle>
              <DialogDescription>
                Select the organ you wish to donate. Your decision can save lives.
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
              {organOptions.map((organ) => {
                const Icon = organ.icon;
                return (
                  <button
                    key={organ.id}
                    type="button"
                    onClick={() => handleOrganSelect(organ.id)}
                    className={cn(
                      "flex flex-col items-center p-4 rounded-xl border-2 transition-all text-center",
                      selectedOrgan === organ.id
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50 hover:bg-muted/50"
                    )}
                  >
                    <div className="mb-2 text-primary">
                      {Icon && <Icon size={42} />}
                    </div>
                    <h3 className="font-semibold text-foreground text-sm">{organ.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{organ.description}</p>
                    {selectedOrgan === organ.id && (
                      <CheckCircle className="h-5 w-5 text-primary mt-2" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button onClick={handleProceedToConsent} disabled={!selectedOrgan}>
                Continue
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </>
        )}

        {/* ================= CONSENT STEP ================= */}
        {step === 'consent' && (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-xl">
                <AlertTriangle className="h-6 w-6 text-warning" />
                Terms & Conditions
              </DialogTitle>
              <DialogDescription>
                Please read and agree to the following terms before proceeding.
              </DialogDescription>
            </DialogHeader>

            <div className="mt-4 p-4 bg-muted/50 rounded-xl">
              <p className="text-sm font-medium text-foreground mb-1">Selected Organ</p>
              <p className="text-lg font-semibold text-primary">
                {organOptions.find(o => o.id === selectedOrgan)?.name}
              </p>
            </div>

            <div className="mt-6 space-y-4">
              {[
                { id: "voluntary", label: "I confirm that I am donating voluntarily and out of my own free will." },
                { id: "risks", label: "I understand the medical risks and the donation process involved." },
                { id: "pressure", label: "I am not under pressure or coercion from anyone." },
                { id: "verification", label: "I consent to LifeLink and hospital verification of my donation." },
              ].map((item) => (
                <div key={item.id} className="flex items-start gap-3">
                  <Checkbox
                    id={item.id}
                    checked={consentChecks[item.id]}
                    onCheckedChange={(checked) =>
                      setConsentChecks(prev => ({ ...prev, [item.id]: checked === true }))
                    }
                  />
                  <label htmlFor={item.id} className="text-sm leading-relaxed cursor-pointer">
                    {item.label}
                  </label>
                </div>
              ))}

              <div className="border-t border-border pt-4">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="terms"
                    checked={consentChecks.terms}
                    onCheckedChange={(checked) =>
                      setConsentChecks(prev => ({ ...prev, terms: checked === true }))
                    }
                  />
                  <label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer font-medium">
                    I agree to the <span className="text-primary underline">Terms & Conditions</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-between gap-3 mt-6">
              <Button variant="outline" onClick={() => setStep('select')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <Button onClick={handleSubmit} disabled={!allConsentsChecked}>
                Submit Donation Intent
              </Button>
            </div>
          </>
        )}

        {/* ================= SUCCESS STEP ================= */}
        {step === 'success' && (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="w-20 h-20 rounded-full bg-success/20 flex items-center justify-center mb-6">
              <CheckCircle className="w-10 h-10 text-success" />
            </div>
            <h3 className="text-2xl font-semibold text-foreground mb-2">
              Intent Submitted Successfully!
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              Your donation intent has been sent to the hospital for verification. 
              You will be notified once the verification is complete.
            </p>
            <div className="bg-muted/50 p-4 rounded-xl w-full text-left space-y-2 max-w-sm">
              <p className="text-sm">
                <span className="text-muted-foreground">Organ:</span>{' '}
                <span className="font-medium">
                  {organOptions.find(o => o.id === selectedOrgan)?.name}
                </span>
              </p>
              <p className="text-sm">
                <span className="text-muted-foreground">Status:</span>{' '}
                <span className="font-medium text-warning">Pending Verification</span>
              </p>
            </div>
            <Button onClick={handleClose} className="mt-6">
              Done
            </Button>
          </div>
        )}

      </DialogContent>
    </Dialog>
  );
};

export default DonateModal;
