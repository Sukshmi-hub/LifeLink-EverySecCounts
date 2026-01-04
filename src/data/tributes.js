/* ---------------- CONSTANTS ---------------- */

export const tributeStatuses = [
  "pending",
  "published",
  "archived",
  "private",
];

/* ---------------- TRIBUTES DATA ---------------- */

export const tributes = [
  {
    id: "trb_001",
    donorName: "Michael Anderson",
    donorAge: 34,
    donorLocation: "Portland, OR",
    donationType: "Organ Donor - Heart, Kidneys, Liver",
    recipientMessage:
      "Because of Michael, I get to see my grandchildren grow up. Forever grateful.",
    familyName: "The Anderson Family",
    familyMessage:
      "Michael always believed in giving back. Even in death, he wanted to help others live. He was a firefighter who saved lives every day, and now he continues that legacy.",
    familyConsent: true,
    photo:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    status: "published",
    livesImpacted: 4,
    donationDate: "2024-01-15",
    createdAt: "2024-01-20",
    publishedAt: "2024-01-22",
  },
  {
    id: "trb_002",
    donorName: "Sarah Mitchell",
    donorAge: 28,
    donorLocation: "Austin, TX",
    donationType: "Organ Donor - Corneas, Tissues",
    familyName: "The Mitchell Family",
    familyMessage:
      "Sarah was an artist who loved to see beauty in everything. We find comfort knowing her gift of sight lives on in others.",
    familyConsent: true,
    photo:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    status: "published",
    livesImpacted: 2,
    donationDate: "2024-02-08",
    createdAt: "2024-02-12",
    publishedAt: "2024-02-14",
  },
  {
    id: "trb_003",
    donorName: "Robert Chen",
    donorAge: 45,
    donorLocation: "Seattle, WA",
    donationType: "Blood Donor - 50+ Donations",
    familyName: "Chen Family",
    familyMessage:
      "Dad donated blood every 8 weeks for over 15 years. His dedication to helping others was an inspiration to us all.",
    familyConsent: true,
    status: "published",
    livesImpacted: 150,
    donationDate: "2024-02-20",
    createdAt: "2024-02-25",
    publishedAt: "2024-02-27",
  },
  {
    id: "trb_004",
    donorName: "Emma Williams",
    donorAge: 19,
    donorLocation: "Denver, CO",
    donationType: "Organ Donor - Kidney",
    familyName: "Williams Family",
    familyMessage:
      "Emma was taken from us too soon, but her spirit lives on through the life she saved. She would have wanted nothing less.",
    familyConsent: true,
    photo:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    status: "pending",
    livesImpacted: 1,
    donationDate: "2024-03-01",
    createdAt: "2024-03-05",
  },
  {
    id: "trb_005",
    donorName: "James Thompson",
    donorAge: 52,
    donorLocation: "Miami, FL",
    donationType: "Organ & Tissue Donor",
    familyName: "Thompson Family",
    familyMessage: "Private tribute - family prefers privacy.",
    familyConsent: false,
    status: "private",
    livesImpacted: 3,
    donationDate: "2024-02-14",
    createdAt: "2024-02-18",
  },
];

/* ---------------- HELPERS ---------------- */

export const getPublishedTributes = () => {
  return tributes.filter((t) => t.status === "published");
};

export const getPendingTributes = () => {
  return tributes.filter((t) => t.status === "pending");
};

export const getTributeStats = () => {
  const published = tributes.filter(
    (t) => t.status === "published"
  );

  return {
    total: tributes.length,
    published: published.length,
    pending: tributes.filter(
      (t) => t.status === "pending"
    ).length,
    livesImpacted: published.reduce(
      (sum, t) => sum + t.livesImpacted,
      0
    ),
  };
};
