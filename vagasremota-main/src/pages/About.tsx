import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Briefcase, Globe, Target } from "lucide-react"

const stats = [
  {
    title: "Active Users",
    value: "10,000+",
    description: "Job seekers and companies using our platform",
    icon: Users,
  },
  {
    title: "Job Postings",
    value: "5,000+",
    description: "Remote job opportunities available",
    icon: Briefcase,
  },
  {
    title: "Countries",
    value: "50+",
    description: "Global reach across continents",
    icon: Globe,
  },
  {
    title: "Success Rate",
    value: "85%",
    description: "Of candidates find their dream job",
    icon: Target,
  },
]

const team = [
  {
    name: "John Doe",
    role: "CEO & Founder",
    bio: "10+ years of experience in HR tech and remote work solutions",
    image: "/team/john.jpg",
  },
  {
    name: "Jane Smith",
    role: "CTO",
    bio: "Expert in AI and machine learning for recruitment",
    image: "/team/jane.jpg",
  },
  {
    name: "Mike Johnson",
    role: "Head of Product",
    bio: "Product leader with experience in scaling platforms",
    image: "/team/mike.jpg",
  },
  {
    name: "Sarah Williams",
    role: "Head of Customer Success",
    bio: "Dedicated to ensuring customer satisfaction and success",
    image: "/team/sarah.jpg",
  },
]

export default function About() {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">About Vagas Remota</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          We're on a mission to connect talented professionals with remote job
          opportunities worldwide. Our platform makes it easy for companies to find
          the perfect candidates and for job seekers to discover their dream
          remote roles.
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader>
              <div className="flex items-center gap-2">
                <stat.icon className="h-6 w-6 text-primary" />
                <CardTitle className="text-lg">{stat.title}</CardTitle>
              </div>
              <CardDescription>{stat.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Mission Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Our Mission</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">For Companies</h3>
            <p className="text-muted-foreground">
              We help companies build their remote workforce by providing access to
              a global talent pool. Our platform streamlines the hiring process
              and ensures you find the best candidates for your remote positions.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">For Job Seekers</h3>
            <p className="text-muted-foreground">
              We empower professionals to find remote job opportunities that match
              their skills and preferences. Our platform makes it easy to connect
              with companies worldwide and build a successful remote career.
            </p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div>
        <h2 className="text-3xl font-bold text-center mb-8">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member) => (
            <Card key={member.name}>
              <CardHeader>
                <div className="w-24 h-24 rounded-full bg-muted mx-auto mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <CardTitle className="text-center">{member.name}</CardTitle>
                <CardDescription className="text-center">{member.role}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground">
                  {member.bio}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Join Our Mission</h2>
        <p className="text-muted-foreground mb-8">
          Be part of the future of remote work
        </p>
        <Button>Get Started</Button>
      </div>
    </div>
  )
} 