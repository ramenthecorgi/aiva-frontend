import React from "react";

const testimonials = [
  {
    quote: "Aiva has become my secret weapon. She handles all the routine stuff so I can focus on strategic decisions. It's like having the world's best EA who never sleeps.",
    name: "Sarah Chen",
    title: "VP of Product, TechFlow",
    persona: "Corporate Leadership"
  },
  {
    quote: "As a solo consultant, I was drowning in client communications. Aiva now manages my entire client workflow - from scheduling to follow-ups. I've reclaimed 15 hours per week.",
    name: "Marcus Rodriguez",
    title: "Management Consultant",
    persona: "Small Business"
  },
  {
    quote: "Between content creation and family life, I was constantly overwhelmed. Aiva handles my social media scheduling, email responses, and even coordinates my kids' activities.",
    name: "Jennifer Park",
    title: "Content Creator & Mom of 3",
    persona: "Working Parent"
  }
];

const companies = [
  "Google", "Microsoft", "Stripe", "Notion", "Figma", "Slack"
];

const stats = [
  { number: "10,000+", label: "Professionals Trust Aiva" },
  { number: "15hrs", label: "Average Weekly Time Saved" },
  { number: "94%", label: "Report Increased Productivity" }
];

const SocialProofSection = () => (
  <section className="bg-gradient-to-br from-[#0c2461] to-[#0a3d62] py-24">
    <div className="max-w-screen-xl mx-auto px-6">
      {/* Stats */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Trusted by Thousands of Professionals</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-white/80 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Companies */}
      <div className="text-center mb-16">
        <p className="text-white/70 mb-8">Used by teams at</p>
        <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
          {companies.map((company, idx) => (
            <div key={idx} className="text-white/80 font-semibold text-lg">
              {company}
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial, idx) => (
          <div key={idx} className="bg-[rgba(10,61,98,0.3)] backdrop-blur-xl border border-white/10 rounded-3xl p-8 transition-all hover:scale-[1.02] hover:shadow-xl hover:border-amber-400/30">
            <div className="mb-6">
              <div className="flex text-amber-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-xl">★</span>
                ))}
              </div>
              <p className="text-white/90 text-base leading-relaxed italic">"{testimonial.quote}"</p>
            </div>
            <div className="border-t border-white/10 pt-4">
              <div className="font-semibold text-white">{testimonial.name}</div>
              <div className="text-amber-300 text-sm">{testimonial.title}</div>
              <div className="text-white/60 text-xs mt-1">{testimonial.persona}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default SocialProofSection;
