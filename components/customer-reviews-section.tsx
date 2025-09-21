import { Star, Quote } from "lucide-react"

export function CustomerReviewsSection() {
  const reviews = [
    {
      name: "Vishal Panwar",
      location: "Nahan, H.P.",
      rating: 5,
      review:
        "Excellent service! Got my car with complete documentation and great support from Thakur Dealings team.",
      vehicle: "Alto 800",
    },
    {
      name: "Gunjan Thakur",
      location: "Chopal, Shimla",
      rating: 5,
      review:
        "Very professional and trustworthy. Made it so easy to buy my first vehicle. Highly recommended!",
      vehicle: "HONDA ACTIVA",
    },
    {
      name: "Shivansh",
      location: "Mandi H.P.",
      rating: 5,
      review:
        "Amazing experience! 100% verified vehicle as promised. The team was very helpful throughout the process.",
      vehicle: "KTM DUKE 390",
    },
    {
      name: "Sujal Mehaik",
      location: "Shimla H.P.",
      rating: 5,
      review:
        "Vanshit sir gave me the best deal.. i searched this model in all over chandigarh, but THAKUR DEALINGS gave me this car in a very genuine rate",
      vehicle: "MARUTI SUZUKI ALTO 800",
    },
  ]

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Customer <span className="text-primary">Reviews</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our satisfied customers have to say.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <div key={index} className="bg-card rounded-lg p-6 border border-border relative">
                <Quote className="h-8 w-8 text-primary/20 absolute top-4 right-4" />

                <div className="flex items-center mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>

                <p className="text-muted-foreground mb-4 italic">"{review.review}"</p>

                <div className="border-t border-border pt-4">
                  <h4 className="font-semibold text-foreground">{review.name}</h4>
                  <p className="text-sm text-muted-foreground">{review.location}</p>
                  <p className="text-sm text-primary font-medium">Purchased: {review.vehicle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
