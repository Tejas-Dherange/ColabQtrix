interface HeroButton {
  label: string;
  href: string;
}

interface HeroSectionProps {
  componentId?: string;
  title: string;
  subtitle: string;
  primaryButton: HeroButton;
  secondaryButton: HeroButton;
  image?: string;
  _sectionId?: number;
}

export default function HeroSection({
  title,
  subtitle,
  primaryButton,
  secondaryButton,
  image,
}: HeroSectionProps) {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center bg-gradient-to-br from-white via-mint/30 to-white pt-24 pb-16 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text content */}
          <div className="space-y-8">
            <div className="inline-block">
              <span className="bg-mint text-primary text-sm font-semibold px-4 py-1.5 rounded-full">
                Technology Innovation
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary leading-tight">
              {title}
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
              {subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              {primaryButton && (
                <a
                  href={primaryButton.href}
                  className="inline-flex items-center justify-center px-8 py-3.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-all duration-200 shadow-lg shadow-primary/30 hover:shadow-primary/40 hover:-translate-y-0.5"
                >
                  {primaryButton.label}
                </a>
              )}
              {secondaryButton && (
                <a
                  href={secondaryButton.href}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border-2 border-primary text-primary font-semibold rounded-xl hover:bg-mint transition-all duration-200 hover:-translate-y-0.5"
                >
                  {secondaryButton.label}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              )}
            </div>

            {/* Stats row */}
            <div className="flex gap-8 pt-4 border-t border-gray-100">
              {[
                { value: '50+', label: 'Projects Delivered' },
                { value: '30+', label: 'Happy Clients' },
                { value: '24/7', label: 'Support Available' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: 3D Illustration placeholder */}
          <div className="relative hidden lg:flex items-center justify-center">
            {image ? (
              <img src={image} alt={title || 'Hero Resource'} className="w-[480px] h-[480px] object-cover rounded-full shadow-[0_20px_50px_rgba(8,_112,_184,_0.3)] border-4 border-white" />
            ) : (
              <div className="w-[480px] h-[480px] bg-gradient-to-br from-primary/10 to-mint rounded-full flex items-center justify-center">
                <div className="w-[380px] h-[380px] bg-gradient-to-br from-primary/20 to-mint-dark rounded-full flex items-center justify-center">
                  <div className="text-center space-y-4">
                    {/* Abstract tech brain icon */}
                    <div className="text-8xl">🧠</div>
                    <div className="text-primary font-bold text-lg">AI-Powered Solutions</div>
                    <div className="flex justify-center gap-2">
                      {['Web', 'Mobile', 'AI', 'Cloud'].map((tech) => (
                        <span key={tech} className="text-xs bg-white text-primary px-2 py-1 rounded-full shadow-sm border border-primary/20">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* Floating badges */}
            <div className="absolute top-8 right-8 bg-white rounded-xl shadow-lg p-3 flex items-center gap-2 animate-bounce">
              <div className="w-2 h-2 bg-green-400 rounded-full" />
              <span className="text-sm font-medium text-gray-700">24/7 Support</span>
            </div>
            <div className="absolute bottom-12 left-4 bg-white rounded-xl shadow-lg p-3 flex items-center gap-2">
              <span className="text-yellow-400">⭐</span>
              <span className="text-sm font-medium text-gray-700">5.0 Rated</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
