interface FounderSectionProps {
  componentId?: string;
  badge: string;
  heading: string;
  quote: string;
  founderName: string;
  founderTitle: string;
  founderImage?: string;
  _sectionId?: number;
}

export default function FounderSection({
  badge,
  heading,
  quote,
  founderName,
  founderTitle,
  founderImage,
}: FounderSectionProps) {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Badge */}
        <div className="flex justify-center mb-4">
          <span className="bg-mint text-primary text-sm font-semibold px-5 py-1.5 rounded-full tracking-wider uppercase">
            {badge}
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">
          {heading}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          {/* Left: Founder portrait placeholder */}
          <div className="flex justify-center">
            <div className="relative">
              {founderImage ? (
                <img src={founderImage} alt={founderName} className="w-64 h-80 object-cover rounded-2xl shadow-xl shadow-primary/20 bg-gray-100" />
              ) : (
                <div className="w-64 h-80 bg-gradient-to-br from-primary to-primary-light rounded-2xl flex items-center justify-center shadow-xl shadow-primary/20">
                  <div className="text-center text-white space-y-3">
                    <div className="text-7xl">👤</div>
                    <div className="font-bold text-xl">{founderName}</div>
                    <div className="text-white/80 text-sm">{founderTitle}</div>
                  </div>
                </div>
              )}
              {/* Decorative ring */}
              <div className="absolute -inset-3 border-2 border-primary/20 rounded-2xl -z-10" />
            </div>
          </div>

          {/* Right: Quote */}
          <div className="space-y-6">
            {/* Large quote mark */}
            <div className="text-8xl text-primary/20 font-serif leading-none select-none">&ldquo;</div>
            <blockquote className="text-gray-700 text-lg leading-relaxed -mt-8">
              {quote}
            </blockquote>
            <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg">
                {founderName.charAt(0)}
              </div>
              <div>
                <div className="font-bold text-gray-900">{founderName}</div>
                <div className="text-primary text-sm font-medium">{founderTitle}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
