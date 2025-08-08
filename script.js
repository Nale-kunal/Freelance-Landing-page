const { useEffect, useRef, useState } = React;

// Error Boundary Component
class ErrorBoundary extends React.Component {
  state = { hasError: false };
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return <div className="text-center py-24 text-[var(--text-primary)] text-xl">Something went wrong. Please refresh the page.</div>;
    }
    return this.props.children;
  }
}

// Cursor-Following Orb
const useCursorOrb = () => {
  const orbRef = useRef(document.getElementById('cursor-orb'));
  useEffect(() => {
    let mouseX = 0, mouseY = 0;
    let orbX = 0, orbY = 0;
    let scrollY = 0;
    const lerp = (a, b, n) => (1 - n) * a + n * b;

    const updateOrb = () => {
      orbX = lerp(orbX, mouseX + (Math.random() - 0.5) * 150, 0.1);
      orbY = lerp(orbY, mouseY + scrollY + (Math.random() - 0.5) * 150, 0.1);
      orbRef.current.style.transform = `translate(${orbX - 30}px, ${orbY - 30}px)`;
      requestAnimationFrame(updateOrb);
    };

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const onScroll = () => {
      scrollY = window.scrollY * 0.3;
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('scroll', onScroll);
    updateOrb();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);
};

// Counter Animation Hook
const useCounterAnimation = (ref, trigger) => {
  useEffect(() => {
    const elements = ref.current.querySelectorAll('.counter');
    elements.forEach((element) => {
      const endValue = parseInt(element.getAttribute('data-value'));
      gsap.fromTo(
        element,
        { innerText: 0 },
        {
          innerText: endValue,
          duration: 2.5,
          ease: 'power2.out',
          snap: { innerText: 1 },
          scrollTrigger: { trigger: trigger.current, start: 'top 90%' }
        }
      );
    });
  }, []);
};

// Navbar with Theme Toggle and Section Links
const Navbar = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Why Us', href: '#whyus' },
    { name: 'Our Impact', href: '#successmetrics' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Case Studies', href: '#casestudies' },
    { name: 'Process', href: '#process' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--bg-primary)] bg-opacity-95 backdrop-blur-lg shadow-[var(--shadow)]">
      <div className="container mx-auto px-8 py-3 flex justify-between items-center max-w-8xl">
        <h1 className="text-xl font-bold text-[var(--text-primary)]">Techy</h1>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex gap-4">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-base font-semibold text-[var(--text-primary)] hover:text-blue-900 dark:hover:text-blue-300 transition-all hover:underline hover:scale-105"
              >
                {link.name}
              </a>
            ))}
          </div>
          <button onClick={toggleTheme} className="p-1.5 rounded-full bg-[var(--card-bg)] text-[var(--text-primary)] hover:bg-blue-100 dark:hover:bg-blue-900 transition-all neumorphism">
            <lucide-icon name={theme === 'light' ? 'Moon' : 'Sun'} className="w-6 h-6" />
          </button>
          <button className="md:hidden p-1.5" onClick={toggleMenu}>
            <lucide-icon name={isMenuOpen ? 'X' : 'Menu'} className="w-6 h-6 text-[var(--text-primary)]" />
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-[var(--bg-primary)] bg-opacity-90 backdrop-blur-lg px-8 py-4 absolute top-full right-0 w-full h-screen transform transition-transform duration-300">
          {navLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="block py-3 text-base font-semibold text-[var(--text-primary)] hover:text-blue-900 dark:hover:text-blue-300 transition-all hover:underline"
              onClick={toggleMenu}
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

// Fixed Banner Component
const FixedBanner = () => {
  const bannerRef = useRef(null);
  useEffect(() => {
    gsap.fromTo(
      bannerRef.current,
      { opacity: 0, y: 20 },
      { opacity: 0.8, y: 0, duration: 1, ease: 'power3.out', delay: 0.5 }
    );
  }, []);
  return (
    <div ref={bannerRef} className="fixed bottom-5 left-0 right-0 mx-auto max-w-sm text-center py-1.5 px-4 bg-blue-900 text-white font-medium text-sm rounded-full glassmorphism neumorphism z-30">
      We Build Tech That Builds Your Business
    </div>
  );
};

// Hero Section
const Hero = () => {
  const heroRef = useRef(null);
  useCursorOrb();
  useEffect(() => {
    gsap.fromTo(
      heroRef.current.children,
      { opacity: 0, y: 40, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 1.8, stagger: 0.25, ease: 'power3.out' }
    );
    gsap.to('.svg-bg', {
      scale: 1.15,
      rotation: 15,
      duration: 25,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
    gsap.to('.orb', {
      scale: 1.2,
      opacity: 0.85,
      duration: 3.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  }, []);
  return (
    <section id="hero" className="relative min-h-screen bg-[var(--gradient)] text-white flex items-center justify-center overflow-hidden pt-24 z-1">
      <div className="absolute inset-0 overflow-hidden opacity-15 parallax-layer">
        <svg className="w-full h-full svg-bg" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="#ffffff" d="M44.7,-76.4C58.8,-69.2,71.4,-58.1,79.1,-44.1C86.8,-30.2,89.5,-15.1,87.7,-0.2C85.9,14.7,79.6,29.4,69.7,42.3C59.8,55.2,46.2,66.3,31.6,72.7C17,79.1,1.5,80.8,-13.7,78.9C-28.9,77,-44.1,71.5,-56.7,61.5C-69.3,51.5,-79.3,37,-83.7,21.5C-88.1,6,-86.9,-10.5,-80.7,-25.5C-74.5,-40.5,-63.3,-54,-49.1,-65.2C-34.9,-76.4,-17.5,-85.3,0.4,-85.9C18.3,-86.5,36.6,-78.8,44.7,-76.4Z" transform="translate(100 100)" />
        </svg>
      </div>
      <div className="orb top-20 right-20"></div>
      <div ref={heroRef} className="container mx-auto px-8 text-center z-10 max-w-8xl">
        <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight text-shadow">Your Idea. Our Code. Infinite Possibilities.</h1>
        <p className="text-xl md:text-2xl mb-8 font-medium">We Build Tech That Builds Your Business.</p>
        <p className="text-lg mb-12 max-w-3xl mx-auto">Launch a custom website that captivates, converts, and drives explosive growth for your brand.</p>
        <div className="flex justify-center gap-8">
          <a href="#contact" className="bg-white text-blue-900 px-10 py-5 rounded-full font-medium text-lg hover:bg-blue-100 transition-all transform hover:scale-105 shadow-[var(--shadow)] glassmorphism neumorphism">Get a Free Demo</a>
          <a href="#contact" className="border-2 border-white text-white px-10 py-5 rounded-full font-medium text-lg hover:bg-white hover:text-blue-900 transition-all transform hover:scale-105 glassmorphism">Talk to Our Team</a>
        </div>
      </div>
    </section>
  );
};

// About Us Section
const About = () => {
  const aboutRef = useRef(null);
  useEffect(() => {
    gsap.from(aboutRef.current.children, {
      opacity: 0,
      y: 80,
      scale: 0.98,
      duration: 1.8,
      stagger: 0.25,
      ease: 'power3.out',
      scrollTrigger: { trigger: aboutRef.current, start: 'top 90%' }
    });
  }, []);
  return (
    <section id="about" ref={aboutRef} className="py-24 bg-[var(--bg-primary)] z-1">
      <div className="container mx-auto px-8 max-w-8xl">
        <h2 className="text-5xl font-bold text-center mb-12 text-shadow">Your Tech Partners for Explosive Growth</h2>
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-lg mb-8 leading-relaxed">At Techy, we’re more than developers—we’re your partners in building a digital future. Our passionate team crafts custom websites with unmatched speed and creativity.</p>
            <p className="text-lg mb-8 leading-relaxed">From startups to global brands, we deliver solutions that are fast, affordable, and designed to convert. We Build Tech That Builds Your Business.</p>
            <p className="text-lg font-medium">We Code Your Vision. From Idea to Impact — in Days.</p>
            <a href="#contact" className="mt-8 inline-block bg-blue-900 text-white px-10 py-5 rounded-full font-medium text-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-[var(--shadow)] neumorphism">Start Now</a>
          </div>
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1516321310762-479e93c1e78e" alt="Team working" className="rounded-2xl shadow-[var(--shadow)] card" onError={(e) => e.target.src = 'https://via.placeholder.com/600x400?text=Team+Working'} />
            <div className="absolute inset-0 bg-blue-900 opacity-10 rounded-2xl glassmorphism"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Services Section
const Services = () => {
  const servicesRef = useRef(null);
  const gridRef = useRef(null);
  const services = [
    { icon: 'ShoppingCart', title: 'E-commerce Stores', desc: 'Sell smarter with secure, high-converting online stores.' },
    { icon: 'User', title: 'Portfolio Websites', desc: 'Showcase your work with stunning, personalized designs.' },
    { icon: 'Newspaper', title: 'Blogs & News Portals', desc: 'Engage readers with dynamic, SEO-optimized content.' },
    { icon: 'Utensils', title: 'Restaurant & Hotel Sites', desc: 'Attract customers with immersive, user-friendly designs.' },
    { icon: 'Stethoscope', title: 'Medical & Clinic Platforms', desc: 'Streamlined solutions for healthcare professionals.' },
    { icon: 'Briefcase', title: 'Business & Corporate Sites', desc: 'Elevate your brand with professional websites.' },
    { icon: 'LayoutDashboard', title: 'Custom Dashboards', desc: 'Data-driven interfaces tailored to your needs.' },
    { icon: 'Calendar', title: 'Booking Systems', desc: 'Simplify appointments with seamless systems.' },
    { icon: 'Store', title: 'Marketplaces', desc: 'Connect buyers and sellers with robust platforms.' },
  ];
  useEffect(() => {
    gsap.from(gridRef.current.children, {
      opacity: 0,
      y: 60,
      duration: 1.5,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: { trigger: servicesRef.current, start: 'top 90%' }
    });
  }, []);
  return (
    <section id="services" ref={servicesRef} className="py-24 bg-[var(--bg-secondary)] z-1 min-h-[600px]">
      <div className="container mx-auto px-8 max-w-8xl">
        <h2 className="text-5xl font-bold text-center mb-12 text-shadow">What We Build</h2>
        <p className="text-center text-lg mb-12 max-w-3xl mx-auto">Websites That Work. Designs That Convert.</p>
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16">
          {services.map((service, index) => (
            <div key={index} className="p-8 bg-[var(--card-bg)] rounded-2xl shadow-[var(--shadow)] card glassmorphism neumorphism">
              <lucide-icon name={service.icon} className="w-12 h-12 text-blue-900 mb-6" />
              <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
              <p className="text-lg text-[var(--text-secondary)] leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Portfolio Section
const Portfolio = () => {
  const portfolioRef = useRef(null);
  const gridRef = useRef(null);
  const projects = [
    { title: 'Luxury Restaurant Site', img: 'https://images.unsplash.com/photo-1517248135467-2c7ed3ab7221', desc: 'A visually stunning website that boosted reservations by 40%.', link: '#' },
    { title: 'E-commerce Platform', img: 'https://images.unsplash.com/photo-1557821555-234e86d64703', desc: 'A scalable store with seamless checkout, driving 30% more sales.', link: '#' },
    { title: 'Corporate Dashboard', img: 'https://images.unsplash.com/photo-1551288049-b1f3a0a2f734', desc: 'A real-time analytics dashboard loved by a SaaS startup.', link: '#' },
  ];
  useEffect(() => {
    gsap.from(gridRef.current.children, {
      opacity: 0,
      y: 40,
      scale: 0.98,
      duration: 1.5,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: { trigger: portfolioRef.current, start: 'top 90%' }
    });
  }, []);
  return (
    <section id="portfolio" ref={portfolioRef} className="py-24 bg-[var(--bg-primary)] z-1 min-h-[700px]">
      <div className="container mx-auto px-8 max-w-8xl">
        <h2 className="text-5xl font-bold text-center mb-12 text-shadow">Our Work Speaks for Itself</h2>
        <p className="text-center text-lg mb-12 max-w-3xl mx-auto">Built for Performance. Designed for People.</p>
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-24 justify-items-center align-items-start">
          {projects.map((project, index) => (
            <div key={index} className="relative rounded-2xl overflow-hidden shadow-[var(--shadow)] card glassmorphism neumorphism min-h-[400px]">
              <img src={project.img} alt={project.title} className="w-full h-64 object-cover transform group-hover:scale-105 transition duration-500" onError={(e) => e.target.src = 'https://via.placeholder.com/600x400?text=Project+Image'} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity glassmorphism">
                <div>
                  <h3 className="text-2xl font-semibold text-white">{project.title}</h3>
                  <p className="text-lg text-gray-200">{project.desc}</p>
                  <a href={project.link} className="text-blue-300 hover:underline mt-2 inline-block">View Project</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Why Choose Us Section
const WhyUs = () => {
  const whyUsRef = useRef(null);
  const gridRef = useRef(null);
  const reasons = [
    { icon: 'Brush', title: '100% Custom Designs', desc: 'Unique websites tailored to your brand’s vision.' },
    { icon: 'Rocket', title: 'Lightning-Fast Delivery', desc: 'Launch your site in just 3-5 days.' },
    { icon: 'Smartphone', title: 'SEO & Mobile First', desc: 'Rank high and shine on every device.' },
    { icon: 'Gift', title: 'Free Demo Page', desc: 'See your homepage before you commit.' },
    { icon: 'Wallet', title: 'Budget-Friendly', desc: 'Scalable plans for any budget.' },
    { icon: 'Headphones', title: '24/7 Human Support', desc: 'Real experts, always here for you.' },
  ];
  useEffect(() => {
    gsap.from(gridRef.current.children, {
      opacity: 0,
      y: 60,
      scale: 0.98,
      duration: 1.5,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: { trigger: whyUsRef.current, start: 'top 90%' }
    });
  }, []);
  return (
    <section id="whyus" ref={whyUsRef} className="py-24 bg-[var(--bg-secondary)] z-1 min-h-[600px]">
      <div className="container mx-auto px-8 max-w-8xl">
        <h2 className="text-5xl font-bold text-center mb-12 text-shadow">Why Choose Techy?</h2>
        <p className="text-center text-lg mb-12 max-w-3xl mx-auto">We Build Tech That Builds Your Business.</p>
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16">
          {reasons.map((reason, index) => (
            <div key={index} className="p-8 bg-[var(--card-bg)] rounded-2xl shadow-[var(--shadow)] card glassmorphism neumorphism">
              <lucide-icon name={reason.icon} className="w-12 h-12 text-blue-900 mb-6" />
              <h3 className="text-2xl font-semibold mb-4">{reason.title}</h3>
              <p className="text-lg text-[var(--text-secondary)] leading-relaxed">{reason.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Success Metrics Section
const SuccessMetrics = () => {
  const metricsRef = useRef(null);
  const gridRef = useRef(null);
  const metrics = [
    { value: '50', title: 'Projects Delivered', desc: 'High-quality websites for clients worldwide.' },
    { value: '3', title: 'Average Delivery (Days)', desc: 'Lightning-fast turnaround for your project.' },
    { value: '98', title: 'Client Satisfaction (%)', desc: 'Our clients love the results we deliver.' },
  ];
  useCounterAnimation(gridRef, metricsRef);
  useEffect(() => {
    gsap.from(gridRef.current.children, {
      opacity: 0,
      y: 60,
      scale: 0.98,
      duration: 1.5,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: { trigger: metricsRef.current, start: 'top 90%' }
    });
  }, []);
  return (
    <section id="successmetrics" ref={metricsRef} className="py-24 bg-[var(--bg-primary)] z-1 min-h-[600px]">
      <div className="container mx-auto px-8 max-w-8xl">
        <h2 className="text-5xl font-bold text-center mb-12 text-shadow">Our Impact</h2>
        <p className="text-center text-lg mb-12 max-w-3xl mx-auto">From Idea to Impact — in Days.</p>
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {metrics.map((metric, index) => (
            <div key={index} className="p-8 bg-[var(--card-bg)] rounded-2xl shadow-[var(--shadow)] text-center card glassmorphism neumorphism">
              <h3 className="text-4xl font-bold text-blue-900 mb-4 counter" data-value={metric.value}>0</h3>
              <p className="text-2xl font-semibold mb-4">{metric.title}</p>
              <p className="text-lg text-[var(--text-secondary)] leading-relaxed">{metric.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Testimonials Section
const Testimonials = () => {
  const testimonialsRef = useRef(null);
  const gridRef = useRef(null);
  const testimonials = [
    { name: 'Sarah Johnson', business: 'E-commerce Store', quote: 'Techy built a stunning store in just 4 days. Our sales skyrocketed by 50%!' },
    { name: 'Michael Chen', business: 'Tech Startup', quote: 'Their custom dashboard transformed how we manage our data. Exceptional work!' },
    { name: 'Emma Davis', business: 'Restaurant Owner', quote: 'The website they created brought in new customers daily. Absolutely worth it!' },
    { name: 'James Wilson', business: 'Freelance Photographer', quote: 'My portfolio site is a masterpiece. Techy delivered beyond my expectations.' },
  ];
  useEffect(() => {
    gsap.from(gridRef.current.children, {
      opacity: 0,
      x: (index) => (index % 2 === 0 ? 30 : -30),
      duration: 1.5,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: { trigger: testimonialsRef.current, start: 'top 90%' }
    });
  }, []);
  return (
    <section id="testimonials" ref={testimonialsRef} className="py-24 bg-[var(--bg-secondary)] z-1 min-h-[700px]">
      <div className="container mx-auto px-8 max-w-8xl">
        <h2 className="text-5xl font-bold text-center mb-12 text-shadow">Trusted by Businesses Worldwide</h2>
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 gap-20">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="p-8 bg-[var(--card-bg)] rounded-2xl shadow-[var(--shadow)] card glassmorphism neumorphism">
              <lucide-icon name="Quote" className="w-10 h-10 text-blue-900 mb-6" />
              <p className="text-lg italic mb-6 leading-relaxed">"{testimonial.quote}"</p>
              <p className="text-xl font-semibold">{testimonial.name}</p>
              <p className="text-lg text-[var(--text-secondary)]">{testimonial.business}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Case Studies Section
const CaseStudies = () => {
  const caseStudiesRef = useRef(null);
  const gridRef = useRef(null);
  const cases = [
    { title: 'E-commerce Growth', img: 'https://images.unsplash.com/photo-1556740714-7c4b6f3e4e4b', desc: 'Increased conversions by 35% for a fashion retailer with a custom-built store.' },
    { title: 'Restaurant Success', img: 'https://images.unsplash.com/photo-1517248135467-2c7ed3ab7221', desc: 'Boosted reservations by 50% with a sleek, SEO-optimized website.' },
    { title: 'Startup Dashboard', img: 'https://images.unsplash.com/photo-1551288049-b1f3a0a2f734', desc: 'Delivered a real-time analytics dashboard for a SaaS startup in 5 days.' },
  ];
  useEffect(() => {
    gsap.from(gridRef.current.children, {
      opacity: 0,
      scale: 0.98,
      duration: 1.5,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: { trigger: caseStudiesRef.current, start: 'top 90%' }
    });
  }, []);
  return (
    <section id="casestudies" ref={caseStudiesRef} className="py-24 bg-[var(--bg-primary)] z-1 min-h-[600px]">
      <div className="container mx-auto px-8 max-w-8xl">
        <h2 className="text-5xl font-bold text-center mb-12 text-shadow">Case Studies</h2>
        <p className="text-center text-lg mb-12 max-w-3xl mx-auto">We Build Tech That Builds Your Business.</p>
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {cases.map((caseStudy, index) => (
            <div key={index} className="p-6 bg-[var(--card-bg)] rounded-2xl shadow-[var(--shadow)] card glassmorphism neumorphism">
              <img src={caseStudy.img} alt={caseStudy.title} className="w-full h-48 object-cover rounded-lg mb-6" onError={(e) => e.target.src = 'https://via.placeholder.com/600x400?text=Case+Study'} />
              <h3 className="text-2xl font-semibold mb-4">{caseStudy.title}</h3>
              <p className="text-lg text-[var(--text-secondary)] leading-relaxed">{caseStudy.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Process Section
const Process = () => {
  const processRef = useRef(null);
  const gridRef = useRef(null);
  const steps = [
    { icon: 'Lightbulb', title: 'Share Your Vision', desc: 'We start by understanding your goals and ideas.' },
    { icon: 'PencilRuler', title: 'Plan & Design', desc: 'Our team crafts a tailored plan and mockups.' },
    { icon: 'Code', title: 'Development', desc: 'We code your website with precision and speed.' },
    { icon: 'Rocket', title: 'Launch & Support', desc: 'Launch your site and enjoy ongoing support.' },
  ];
  useEffect(() => {
    gsap.from(gridRef.current.children, {
      opacity: 0,
      y: 60,
      duration: 1.5,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: { trigger: processRef.current, start: 'top 90%' }
    });
  }, []);
  return (
    <section id="process" ref={processRef} className="py-24 bg-[var(--bg-secondary)] z-1 min-h-[600px]">
      <div className="container mx-auto px-8 max-w-8xl">
        <h2 className="text-5xl font-bold text-center mb-12 text-shadow">Our Seamless Process</h2>
        <p className="text-center text-lg mb-12 max-w-3xl mx-auto">From Idea to Impact — in Days.</p>
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-16">
          {steps.map((step, index) => (
            <div key={index} className="p-8 bg-[var(--card-bg)] rounded-2xl shadow-[var(--shadow)] text-center card glassmorphism neumorphism">
              <lucide-icon name={step.icon} className="w-12 h-12 text-blue-900 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold mb-4">{step.title}</h3>
              <p className="text-lg text-[var(--text-secondary)] leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Pricing Section
const Pricing = () => {
  const pricingRef = useRef(null);
  const gridRef = useRef(null);
  const plans = [
    { name: 'Starter', price: '$499', features: ['Basic Website', 'Mobile Optimized', 'SEO Setup', '1 Week Support', '1 Revision'] },
    { name: 'Professional', price: '$999', features: ['Advanced Website', 'E-commerce Features', 'SEO + Analytics', '1 Month Support', '3 Revisions'] },
    { name: 'Premium', price: '$1999', features: ['Custom Platform', 'Advanced Integrations', 'Full SEO + Marketing', '3 Months Support', 'Unlimited Revisions'] },
  ];
  useEffect(() => {
    gsap.from(gridRef.current.children, {
      opacity: 0,
      y: 60,
      duration: 1.5,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: { trigger: pricingRef.current, start: 'top 90%' }
    });
    gsap.from(gridRef.current.querySelectorAll('ul li'), {
      opacity: 0,
      x: -20,
      duration: 1.2,
      stagger: 0.1,
      delay: 0.5,
      ease: 'power3.out',
      scrollTrigger: { trigger: pricingRef.current, start: 'top 90%' }
    });
  }, []);
  return (
    <section id="pricing" ref={pricingRef} className="py-24 bg-[var(--bg-primary)] z-1 min-h-[600px]">
      <div className="container mx-auto px-8 max-w-8xl">
        <h2 className="text-5xl font-bold text-center mb-12 text-shadow">Pricing That Scales With You</h2>
        <p className="text-center text-lg mb-12 max-w-3xl mx-auto">Custom Quotes Available for Large Projects</p>
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {plans.map((plan, index) => (
            <div key={index} className="p-8 bg-[var(--card-bg)] rounded-2xl shadow-[var(--shadow)] text-center card glassmorphism neumorphism">
              <h3 className="text-3xl font-semibold mb-4">{plan.name}</h3>
              <p className="text-4xl font-bold mb-6">{plan.price}</p>
              <ul className="text-lg text-[var(--text-secondary)] mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="mb-3 flex items-center justify-center">
                    <lucide-icon name="CheckCircle" className="w-6 h-6 text-blue-900 mr-3" /> {feature}
                  </li>
                ))}
              </ul>
              <a href="#contact" className="bg-blue-900 text-white px-10 py-5 rounded-full font-medium text-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-[var(--shadow)] neumorphism">Choose Plan</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// FAQ Section
const FAQ = () => {
  const faqRef = useRef(null);
  const gridRef = useRef(null);
  const faqs = [
    { question: 'How fast can you deliver my website?', answer: 'Most projects are completed in 3-5 days, depending on complexity.' },
    { question: 'Do you offer ongoing support?', answer: 'Yes! We provide 24/7 support and flexible maintenance plans.' },
    { question: 'Can you handle complex projects?', answer: 'Absolutely. From marketplaces to custom dashboards, we build it all.' },
    { question: 'What if I’m not satisfied?', answer: 'We offer revisions and a satisfaction guarantee to ensure you love your site.' },
    { question: 'Do you provide SEO services?', answer: 'Every website is optimized for search engines to help you rank higher.' },
    { question: 'Can I see a demo before paying?', answer: 'Yes! We offer a free homepage preview for serious clients.' },
  ];
  useEffect(() => {
    gsap.from(gridRef.current.children, {
      opacity: 0,
      scale: 0.98,
      duration: 1.5,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: { trigger: faqRef.current, start: 'top 90%' }
    });
    gsap.from(gridRef.current.querySelectorAll('h3'), {
      opacity: 0,
      scale: 0.98,
      duration: 1.2,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: { trigger: faqRef.current, start: 'top 90%' }
    });
  }, []);
  return (
    <section id="faq" ref={faqRef} className="py-24 bg-[var(--bg-secondary)] z-1 min-h-[600px]">
      <div className="container mx-auto px-8 max-w-8xl">
        <h2 className="text-5xl font-bold text-center mb-12 text-shadow">Frequently Asked Questions</h2>
        <p className="text-center text-lg mb-12 max-w-3xl mx-auto">We Build Tech That Builds Your Business.</p>
        <div ref={gridRef} className="max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-8 p-8 bg-[var(--card-bg)] rounded-2xl shadow-[var(--shadow)] card glassmorphism neumorphism">
              <h3 className="text-2xl font-semibold mb-4">{faq.question}</h3>
              <p className="text-lg text-[var(--text-secondary)] leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Contact Section
const Contact = () => {
  const contactRef = useRef(null);
  const particleRef = useRef(null);
  useEffect(() => {
    gsap.from(contactRef.current.querySelectorAll('input, textarea, button'), {
      opacity: 0,
      x: -40,
      duration: 1.8,
      stagger: 0.25,
      ease: 'power3.out',
      scrollTrigger: { trigger: contactRef.current, start: 'top 90%' }
    });
    const createHeavyParticles = () => {
      const container = particleRef.current;
      for (let i = 0; i < 80; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        container.appendChild(particle);
      }
    };
    createHeavyParticles();
    gsap.from(particleRef.current.children, {
      opacity: 0,
      scale: 0,
      x: () => (Math.random() - 0.5) * 800,
      y: () => (Math.random() - 0.5) * 800,
      duration: 3.5,
      stagger: 0.05,
      ease: 'power4.out',
      scrollTrigger: { trigger: contactRef.current, start: 'top 90%' }
    });
    gsap.to(particleRef.current.children, {
      x: () => (Math.random() - 0.5) * 1200,
      y: () => (Math.random() - 0.5) * 1200,
      scale: 1.5,
      opacity: 0.3,
      duration: 7,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      scrollTrigger: { trigger: contactRef.current, scrub: 1 }
    });
  }, []);
  return (
    <section id="contact" className="py-24 bg-[var(--bg-primary)] relative overflow-hidden z-1 min-h-[600px]">
      <div ref={particleRef} className="absolute inset-0 pointer-events-none z-0"></div>
      <div className="container mx-auto px-8 max-w-8xl relative z-10">
        <h2 className="text-5xl font-bold text-center mb-12 text-shadow">Let’s Build Something Extraordinary</h2>
        <p className="text-center text-lg mb-12 max-w-3xl mx-auto">Websites That Work. Designs That Convert.</p>
        <form ref={contactRef} className="max-w-xl mx-auto text-center p-8 bg-[var(--card-bg)] rounded-xl shadow-[var(--shadow)] glassmorphism neumorphism flex flex-col items-center">
          <div className="mb-5 w-full">
            <label className="block text-lg mb-1.5 font-medium" htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              className="w-full py-4 px-8 rounded-xl border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 focus:ring-4 focus:ring-blue-900 focus:outline-none bg-[var(--card-bg)] text-[var(--text-primary)] text-lg transition-all glassmorphism neumorphism box-sizing-border-box"
              placeholder="Your Name"
              required
            />
          </div>
          <div className="mb-5 w-full">
            <label className="block text-lg mb-1.5 font-medium" htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              className="w-full py-4 px-8 rounded-xl border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 focus:ring-4 focus:ring-blue-900 focus:outline-none bg-[var(--card-bg)] text-[var(--text-primary)] text-lg transition-all glassmorphism neumorphism box-sizing-border-box"
              placeholder="Your Email"
              required
            />
          </div>
          <div className="mb-5 w-full">
            <label className="block text-lg mb-1.5 font-medium" htmlFor="business">Business Type</label>
            <input
              id="business"
              name="business"
              type="text"
              className="w-full py-4 px-8 rounded-xl border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 focus:ring-4 focus:ring-blue-900 focus:outline-none bg-[var(--card-bg)] text-[var(--text-primary)] text-lg transition-all glassmorphism neumorphism box-sizing-border-box"
              placeholder="E.g., E-commerce, Restaurant"
              required
            />
          </div>
          <div className="mb-5 w-full">
            <label className="block text-lg mb-1.5 font-medium" htmlFor="requirements">Requirements</label>
            <textarea
              id="requirements"
              name="requirements"
              className="w-full py-4 px-8 rounded-xl border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 focus:ring-4 focus:ring-blue-900 focus:outline-none bg-[var(--card-bg)] text-[var(--text-primary)] text-lg transition-all glassmorphism neumorphism box-sizing-border-box"
              rows="6"
              placeholder="Tell us about your project"
              required
            ></textarea>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-900 text-white px-12 py-4 rounded-full font-medium text-base hover:bg-blue-700 transition-all transform hover:scale-105 shadow-[var(--shadow)] glassmorphism neumorphism"
            >
              Get a Free Homepage Preview
            </button>
          </div>
          <div className="mt-10 text-center">
            <p className="text-lg">Or reach us directly:</p>
            <div className="flex justify-center gap-8 mt-6">
              <a href="https://wa.me/1234567890" className="flex items-center gap-3 text-blue-900 dark:text-blue-300 hover:underline text-lg">
                <lucide-icon name="MessageCircle" className="w-8 h-8" /> WhatsApp
              </a>
              <a href="mailto:contact@techy.co.in" className="flex items-center gap-3 text-blue-900 dark:text-blue-300 hover:underline text-lg">
                <lucide-icon name="Mail" className="w-8 h-8" /> Email
              </a>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

// Floating CTA
const FloatingCTA = () => {
  const ctaRef = useRef(null);
  useEffect(() => {
    gsap.fromTo(
      ctaRef.current,
      { opacity: 0, y: 80, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 1.8, ease: 'power3.out', scrollTrigger: { trigger: document.body, start: 'top -10%' } }
    );
    gsap.to(ctaRef.current, {
      y: -10,
      scale: 1.03,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  }, []);
  return (
    <div ref={ctaRef} className="fixed bottom-10 right-10 z-50">
      <a href="#contact" className="bg-blue-900 text-white px-10 py-5 rounded-full font-medium text-lg shadow-[var(--shadow)] hover:bg-blue-700 transition-all transform hover:scale-110 glassmorphism neumorphism">Start Your Website Today</a>
    </div>
  );
};

// Footer Section
const Footer = () => {
  const footerRef = useRef(null);
  const particleRef = useRef(null);
  useEffect(() => {
    gsap.from(footerRef.current.children, {
      opacity: 0,
      y: 80,
      scale: 0.98,
      duration: 2,
      stagger: 0.25,
      ease: 'power3.out',
      scrollTrigger: { trigger: footerRef.current, start: 'top 90%' }
    });
    const createHeavyParticles = () => {
      const container = particleRef.current;
      for (let i = 0; i < 80; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        container.appendChild(particle);
      }
    };
    createHeavyParticles();
    gsap.from(particleRef.current.children, {
      opacity: 0,
      scale: 0,
      x: () => (Math.random() - 0.5) * 1000,
      y: () => (Math.random() - 0.5) * 1000,
      duration: 4,
      stagger: 0.05,
      ease: 'power4.out',
      scrollTrigger: { trigger: footerRef.current, start: 'top 90%' }
    });
    gsap.to(particleRef.current.children, {
      x: () => (Math.random() - 0.5) * 1500,
      y: () => (Math.random() - 0.5) * 1500,
      scale: 2,
      opacity: 0.2,
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      scrollTrigger: { trigger: footerRef.current, scrub: 1 }
    });
  }, []);
  return (
    <footer id="footer" ref={footerRef} className="py-24 bg-blue-900 text-white relative overflow-hidden z-1">
      <div ref={particleRef} className="absolute inset-0 pointer-events-none z-0"></div>
      <div className="container mx-auto px-8 max-w-8xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
          <div>
            <h3 className="text-2xl font-semibold mb-6">Techy</h3>
            <p className="text-lg">We Build Tech That Builds Your Business. Your vision, our code.</p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-6">Services</h3>
            <ul className="text-lg">
              <li><a href="#services" className="hover:underline">E-commerce</a></li>
              <li><a href="#services" className="hover:underline">Portfolios</a></li>
              <li><a href="#services" className="hover:underline">Dashboards</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-6">Connect</h3>
            <div className="flex gap-4 text-lg">
              <a href="#" className="hover:underline">Twitter</a>
              <a href="#" className="hover:underline">LinkedIn</a>
              <a href="#" className="hover:underline">GitHub</a>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-6">Legal</h3>
            <div className="flex gap-4 text-lg">
              <a href="#" className="hover:underline">Privacy Policy</a>
              <a href="#" className="hover:underline">Terms of Service</a>
            </div>
          </div>
        </div>
        <p className="text-center mt-12 text-lg">Built with ❤️ by Techy</p>
      </div>
    </footer>
  );
};

// Main App Component
const App = () => {
  useEffect(() => {
    if (window.lucide) {
      lucide.createIcons();
    }
  }, []);
  return (
    <ErrorBoundary>
      <div>
        <Navbar />
        <FixedBanner />
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <WhyUs />
        <SuccessMetrics />
        <Testimonials />
        <CaseStudies />
        <Process />
        <Pricing />
        <FAQ />
        <Contact />
        <FloatingCTA />
        <Footer />
      </div>
    </ErrorBoundary>
  );
};

// Render the app
ReactDOM.render(<App />, document.getElementById('root'));