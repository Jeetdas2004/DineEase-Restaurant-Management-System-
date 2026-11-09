import { Star, Quote } from "lucide-react";

export default function Testimonial() {
  const testimonials = [
    {
      name: "Sophia Montgomery",
      role: "Culinary Journalist & Critic",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
      review:
        "The Truffle Mushroom Burger and Wood-fired Diavola Pizza at DineEase are culinary revelation. Impeccable balance of textures, rich depth of flavor, and first-class table service.",
      rating: 5,
    },
    {
      name: "Marcus Vance",
      role: "Executive Chef & Food Consultant",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
      review:
        "Booking a table was instantaneous and our anniversary dinner exceeded all expectations. The USDA Prime Ribeye cooked to a flawless medium rare with rosemary garlic butter is worth traveling for.",
      rating: 5,
    },
    {
      name: "Elena Rostova",
      role: "Gourmet Lifestyle Creator",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
      review:
        "From placing online delivery orders that arrive piping hot in 30 minutes to celebrating birthdays with molten lava cake, DineEase sets the gold standard for hospitality and taste.",
      rating: 5,
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-orange-600 font-bold text-xs uppercase tracking-widest bg-orange-100/70 px-4 py-1.5 rounded-full inline-block mb-3">
            Guest Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            Loved by Guests, <span className="text-orange-500">Celebrated by Critics</span>
          </h2>
          <p className="text-gray-500 mt-2 text-base">
            Read what our wonderful patrons say about our ambiance, flavors, and dining experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="relative bg-gray-50/70 rounded-3xl p-8 border border-gray-100/90 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Quote Icon */}
                <div className="w-10 h-10 rounded-2xl bg-orange-100 text-orange-500 flex items-center justify-center mb-6">
                  <Quote className="w-5 h-5 fill-orange-500 text-orange-500" />
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-4 text-amber-400">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed italic mb-8">
                  "{item.review}"
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3.5 pt-4 border-t border-gray-200/60">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover shadow-sm ring-2 ring-orange-200"
                />
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">{item.name}</h4>
                  <p className="text-xs text-gray-400">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
