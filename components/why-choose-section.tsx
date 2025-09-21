import { CheckCircle, CreditCard, FileText, Headphones, Shield } from "lucide-react"

export function WhyChooseSection() {
  const features = [
    {
      icon: Shield,
      title: "100% Verified Vehicles",
      description: "All vehicles are thoroughly inspected and verified for authenticity and quality.",
    },
    {
      icon: CreditCard,
      title: "Easy Loan Facility",
      description: "Hassle-free financing options with competitive rates and quick approval.",
    },
    {
      icon: CheckCircle,
      title: "Customer Satisfaction",
      description: "Our priority is your satisfaction with dedicated support throughout your journey.",
    },
    {
      icon: FileText,
      title: "Complete Documentation",
      description: "All paperwork handled professionally with transparent and legal documentation.",
    },
    {
      icon: Headphones,
      title: "24/7 Customer Support",
      description: "Round-the-clock assistance for all your queries and support needs.",
    },
  ]

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Why Choose <span className="text-primary">Thakur Dealings</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience the difference with our commitment to excellence and customer satisfaction.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-card rounded-lg p-6 border border-border hover:shadow-lg transition-shadow"
              >
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
