import { Shield, Users, Award } from "lucide-react"

export function AboutUsSection() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              About <span className="text-primary">Thakur Dealings</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Your trusted partner in finding the perfect vehicle. We've been serving customers with integrity, quality,
              and exceptional service.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Trusted Dealer</h3>
              <p className="text-muted-foreground">
                Years of experience in the automotive industry with a reputation built on trust and reliability.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Customer First</h3>
              <p className="text-muted-foreground">
                We prioritize customer satisfaction and provide personalized service to meet your unique needs.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Quality Assured</h3>
              <p className="text-muted-foreground">
                Every vehicle undergoes thorough inspection to ensure you get the best quality and value.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
