import React from "react";
import Header from "@/components/Header";
import {
  Heart,
  Target,
  Shield,
  Users,
  Clock,
  Award,
  CheckCircle,
  Globe,
} from "lucide-react";

function About() {
  const values = [
    {
      icon: Heart,
      title: "Compassion",
      description: "Every life matters. We approach every case with empathy and urgency.",
    },
    {
      icon: Shield,
      title: "Trust & Safety",
      description: "Verified donors, secure data, and transparent processes at every step.",
    },
    {
      icon: Clock,
      title: "Speed",
      description: "In medical emergencies, every second counts. Our systems are built for rapid response.",
    },
    {
      icon: Globe,
      title: "Accessibility",
      description: "Healthcare support should be available to everyone, regardless of location or status.",
    },
  ];

  const milestones = [
    { year: "2020", title: "Platform Launch", description: "LifeLink was founded with a mission to save lives" },
    { year: "2021", title: "1,000 Lives Saved", description: "Reached our first major milestone" },
    { year: "2022", title: "Hospital Network", description: "Partnered with 100+ hospitals nationwide" },
    { year: "2023", title: "NGO Integration", description: "Launched financial support through NGO partners" },
    { year: "2024", title: "Red Alert System", description: "Introduced 24/7 emergency response capability" },
  ];

  const team = [
    {
      name: "Dr. Sarah Mitchell",
      role: "Medical Director",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop",
    },
    {
      name: "James Anderson",
      role: "CEO & Founder",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
    },
    {
      name: "Emily Chen",
      role: "Operations Lead",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop",
    },
    {
      name: "Michael Roberts",
      role: "Tech Director",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative py-20 gradient-hero">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              About <span className="text-primary">LifeLink</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              We are a social impact healthcare platform dedicated to connecting those in need
              with life-saving resources. Our mission is simple: every second counts.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 border-b border-border">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="flex items-center gap-2 text-primary mb-4">
                <Target className="h-5 w-5" />
                <span className="text-sm font-semibold uppercase tracking-wider">
                  Our Mission
                </span>
              </div>

              <h2 className="text-3xl font-bold text-foreground">
                Bridging the Gap Between Need and Help
              </h2>

              <p className="mt-4 text-muted-foreground">
                LifeLink was created to solve a critical problem in healthcare: the disconnect between
                patients who urgently need blood, organs, or medical support, and those who can provide it.
              </p>

              <p className="mt-4 text-muted-foreground">
                Through technology and human compassion, we've built a platform that enables rapid matching,
                real-time coordination, and seamless communication.
              </p>

              <div className="mt-8 flex flex-col gap-3">
                {[
                  "Real-time donor matching",
                  "Hospital network coordination",
                  "Financial assistance programs",
                  "Emergency red alert system",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-success" />
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                <Heart className="h-32 w-32 text-primary/30" />
              </div>
              <div className="absolute -bottom-6 -right-6 rounded-xl bg-card border border-border p-4 shadow-lg">
                <p className="text-3xl font-bold text-primary">12,450+</p>
                <p className="text-sm text-muted-foreground">Lives Saved</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground">Our Core Values</h2>
            <p className="mt-2 text-muted-foreground">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <div
                key={index}
                className="rounded-xl border border-border bg-card p-6 text-center hover:shadow-md transition-shadow"
              >
                <div className="mx-auto w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <value.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">{value.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 text-primary mb-4">
              <Users className="h-5 w-5" />
              <span className="text-sm font-semibold uppercase tracking-wider">
                Our Team
              </span>
            </div>
            <h2 className="text-3xl font-bold text-foreground">
              Meet the People Behind LifeLink
            </h2>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member, index) => (
              <div key={index} className="text-center group">
                <div className="relative inline-block mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-2xl object-cover mx-auto border-2 border-border group-hover:border-primary transition-colors"
                  />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <Award className="h-4 w-4 text-primary-foreground" />
                  </div>
                </div>
                <h3 className="font-semibold text-foreground">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-muted/30 py-8">
        <div className="container text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 LifeLink. Every Second Counts.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default About;
