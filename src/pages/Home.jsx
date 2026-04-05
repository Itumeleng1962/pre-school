import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  QrCode, Camera, MessageCircle, CreditCard, BarChart3, Shield,
  Star, ArrowRight, CheckCircle2, Sparkles, Users, Award, Clock,
  Baby, Laptop, Palette, Crown, ChevronLeft, ChevronRight, Play,
  Heart, Zap, Globe, BookOpen, MapPin
} from 'lucide-react'
import './Home.css'

/* ── Animated Counter ─────────────────────────────── */
function Counter({ end, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const step = end / (duration / 16)
        let current = 0
        const timer = setInterval(() => {
          current += step
          if (current >= end) { setCount(end); clearInterval(timer) }
          else setCount(Math.floor(current))
        }, 16)
      }
    }, { threshold: 0.5 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [end, duration])

  return <span ref={ref} className="stat-number">{count}{suffix}</span>
}

/* ── Testimonial data ─────────────────────────────── */
const testimonials = [
  {
    name: 'Thandi Mokoena', role: 'Parent – Grade R',
    avatar: '👩🏾', stars: 5,
    text: 'The Beacon Academy transformed my daughter\'s confidence. The technology integration and loving teachers make this place truly special. She can\'t wait for school every morning!'
  },
  {
    name: 'Sipho Dlamini', role: 'Parent – Toddler Group',
    avatar: '👨🏿', stars: 5,
    text: 'The daily photo updates and real-time check-in system give me complete peace of mind at work. I always know my son is safe and learning something wonderful.'
  },
  {
    name: 'Nomsa Khumalo', role: 'Parent – Age 4',
    avatar: '👩🏾‍💼', stars: 5,
    text: 'The holistic curriculum is outstanding. My child has improved in speech, creativity and social skills tremendously. The Christian values embedded in the teaching are a blessing.'
  },
]

/* ── Features ─────────────────────────────── */
const features = [
  { icon: <QrCode size={28}/>, title: 'Smart Check-In', desc: 'QR code & biometric attendance tracking with instant parent notifications.', color: '#1a73e8', bg: 'rgba(26,115,232,0.1)' },
  { icon: <Camera size={28}/>, title: 'Live Classroom', desc: 'Real-time photos, videos & activity updates throughout the day.', color: '#9b59b6', bg: 'rgba(155,89,182,0.1)' },
  { icon: <BarChart3 size={28}/>, title: 'Progress Reports', desc: 'AI-powered developmental tracking across all key learning areas.', color: '#2ecc71', bg: 'rgba(46,204,113,0.1)' },
  { icon: <CreditCard size={28}/>, title: 'Digital Payments', desc: 'Seamless billing, invoicing & multiple payment methods.', color: '#FF6B35', bg: 'rgba(255,107,53,0.1)' },
  { icon: <MessageCircle size={28}/>, title: 'Parent-Teacher Chat', desc: 'Direct messaging, video calls & meeting scheduling in one place.', color: '#e91e8c', bg: 'rgba(233,30,140,0.1)' },
  { icon: <Shield size={28}/>, title: 'CCTV Secure Access', desc: 'Encrypted live viewing with parent-only authenticated access.', color: '#f1c40f', bg: 'rgba(241,196,15,0.1)' },
]

/* ── Programs ─────────────────────────────── */
const programs = [
  { icon: <Baby size={32}/>, label: 'Preschool', ages: 'Ages 2–6', color: '#1a73e8', desc: 'Play-based learning building foundational literacy, numeracy & social skills.' },
  { icon: <Laptop size={32}/>, label: 'Tech & Innovation', ages: 'All Ages', color: '#9b59b6', desc: 'Coding, robotics & digital literacy for the future-ready child.' },
  { icon: <Palette size={32}/>, label: 'Arts & Creativity', ages: 'All Ages', color: '#e91e8c', desc: 'Music, visual arts & drama fostering expressive, creative minds.' },
  { icon: <Crown size={32}/>, label: 'Leadership', ages: 'Ages 4+', color: '#FF6B35', desc: 'Building confidence, teamwork & Christian character from an early age.' },
]

/* ── Stats ─────────────────────────────── */
const stats = [
  { end: 150, suffix: '+', label: 'Happy Learners' },
  { end: 15, suffix: '+', label: 'Expert Educators' },
  { end: 6, suffix: '', label: 'Core Programs' },
  { end: 98, suffix: '%', label: 'Parent Satisfaction' },
]

export default function Home() {
  const [testimonialIdx, setTestimonialIdx] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setTestimonialIdx(i => (i + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const prevTestimonial = () => setTestimonialIdx(i => (i - 1 + testimonials.length) % testimonials.length)
  const nextTestimonial = () => setTestimonialIdx(i => (i + 1) % testimonials.length)

  return (
    <div className="home">
      {/* ══ HERO ══════════════════════════════════════ */}
      <section className="hero">
        <div className="hero-blobs">
          <div className="blob blob-1" />
          <div className="blob blob-2" />
          <div className="blob blob-3" />
        </div>

        <div className="container hero-inner">
          <div className="hero-content animate-fadeInLeft">
            <div className="hero-badge">
              <Sparkles size={14} />
              Sophiatown's #1 Smart Daycare
            </div>
            <h1 className="hero-title">
              Where Every Child
              <span className="hero-highlight"> Shines Bright</span>
              <span className="hero-emoji"> 🌟</span>
            </h1>
            <p className="hero-desc">
              A secure, technology-integrated early childhood development centre
              nurturing curious minds through holistic education, faith, and innovation.
            </p>
            <div className="hero-actions">
              <Link to="/enroll" className="btn btn-primary hero-btn-main" id="hero-enrol-btn">
                Enrol Your Child <ArrowRight size={18}/>
              </Link>
              <button
                className="btn btn-outline hero-btn-video"
                id="hero-video-btn"
                onClick={() => setIsPlaying(true)}
              >
                <div className="play-dot"><Play size={14} fill="currentColor"/></div>
                Watch Our Story
              </button>
            </div>
            <div className="hero-trust">
              <div className="hero-avatars">
                {['👩🏾','👨🏿','👩🏽','👨🏾'].map((a,i) => (
                  <span key={i} className="hero-avatar">{a}</span>
                ))}
              </div>
              <p><strong>150+ families</strong> trust us with their children</p>
            </div>
          </div>

          <div className="hero-visual animate-fadeInRight">
            <div className="hero-card-main card-glass" style={{ padding: '0.8rem' }}>
              <img src="/kids_playing.png" alt="Happy Kids at The Beacon Academy" className="hero-main-photo animate-float" style={{ width: '100%', height: '260px', objectFit: 'cover', borderRadius: '16px', marginBottom: '0.5rem', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }} />
              <div className="hero-card-text" style={{ padding: '0.5rem' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.2rem' }}>Play-Based Learning</h3>
                <p style={{ fontSize: '0.9rem', color: '#64748b' }}>Fostering creativity & joy every day ✨</p>
              </div>
            </div>

            {/* Floating stat cards */}
            <div className="hero-float-card hfc-1">
              <CheckCircle2 size={20} color="#2ecc71"/>
              <div>
                <div className="hfc-val">100%</div>
                <div className="hfc-label">Safe & Secure</div>
              </div>
            </div>
            <div className="hero-float-card hfc-2">
              <Star size={20} color="#f1c40f" fill="#f1c40f" />
              <div>
                <div className="hfc-val">4.9★</div>
                <div className="hfc-label">Parent Rating</div>
              </div>
            </div>
            <div className="hero-float-card hfc-3">
              <Heart size={20} color="#e91e8c" fill="#e91e8c"/>
              <div>
                <div className="hfc-val">Faith-Based</div>
                <div className="hfc-label">Christian Values</div>
              </div>
            </div>
          </div>
        </div>

        {/* Hero stats bar */}
        <div className="hero-stats-bar">
          <div className="container">
            <div className="hero-stats-inner">
              {stats.map((s, i) => (
                <div className="hero-stat-item" key={i}>
                  <Counter end={s.end} suffix={s.suffix} />
                  <span className="hero-stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ WE CHANGE LIVES ══════════════════════════════ */}
      <section className="section" style={{ background: 'white', position: 'relative', overflow: 'hidden' }}>
        <div className="container lb-change-lives">
           <div className="lb-img-container">
             <img src="/kid_cutting.png" className="lb-big-img" alt="Creative child" />
             <img src="/toddler_playing.png" className="lb-small-img" alt="Playing child" />
             <Star size={40} color="#f59e0b" fill="#f59e0b" style={{ position: 'absolute', bottom: '10%', left: '-5%', animation: 'spin-slow 10s linear infinite' }} />
           </div>
           <div>
             <h2 className="section-title" style={{ color: '#312e81' }}>We Change Lives, Everyday</h2>
             <p style={{ color: '#475569', fontSize: '1.05rem', marginBottom: '1.5rem' }}>We expose children to different environments and various learning experiences, we allow them to explore their self-awareness and gain a sense of the world around them.</p>
             <p style={{ color: '#475569', fontSize: '1.05rem', marginBottom: '2rem' }}>Once they leave The Beacon Academy, they're fully prepared for the next stage of their young lives.</p>
             
             <div className="lb-pill-grid">
               <div className="lb-pill">
                  <div className="icon-wrap" style={{ background: '#ec4899' }}><Heart size={16}/></div> Nurturing Talent
               </div>
               <div className="lb-pill">
                  <div className="icon-wrap" style={{ background: '#f59e0b' }}><Award size={16}/></div> Quality Education
               </div>
               <div className="lb-pill">
                  <div className="icon-wrap" style={{ background: '#06b6d4' }}><Palette size={16}/></div> Creative Arts
               </div>
               <div className="lb-pill">
                  <div className="icon-wrap" style={{ background: '#84cc16' }}><Users size={16}/></div> Social Interaction
               </div>
             </div>

             <Link to="/about" className="btn" style={{ background: '#ec4899', color: 'white', padding: '1rem 2rem', borderRadius: '999px', fontWeight: '800', letterSpacing: '0.05em' }}>
               DISCOVER OUR SCHOOL
             </Link>
           </div>
        </div>
      </section>

      {/* ══ GRADES SECTION ══════════════════════════════ */}
      <section className="section" style={{ background: '#312e81', position: 'relative', overflow: 'visible', paddingTop: '2rem' }}>
        <div style={{ position: 'absolute', top: '-10px', left: 0, right: 0, height: '80px', background: 'white', borderBottomLeftRadius: '50%', borderBottomRightRadius: '50%', zIndex: 1 }}></div>
        
        <div className="container text-center" style={{ position: 'relative', zIndex: 10 }}>
           
           <div className="lb-grades-grid">
              <div className="lb-grade-card">
                 <img src="/toddler_playing.png" className="lb-grade-img" alt="Grade 000" />
                 <h3 style={{ color: '#312e81', fontSize: '1.5rem', marginBottom: '1rem' }}>Grade 000/0000</h3>
                 <p style={{ color: '#475569', fontSize: '0.95rem' }}>The Beacon Academy offers Grade 000 & 0000 (2 turning 3 & 3 turning 4) classes.</p>
                 <Link to="/enroll" className="lb-grade-btn" style={{ background: '#ec4899' }}>ENROLL HERE</Link>
              </div>
              <div className="lb-grade-card">
                 <img src="/kid_cutting.png" className="lb-grade-img" alt="Grade 00" />
                 <h3 style={{ color: '#312e81', fontSize: '1.5rem', marginBottom: '1rem' }}>Grade 00</h3>
                 <p style={{ color: '#475569', fontSize: '0.95rem' }}>The Beacon Academy offers Grade 00 (4 turning 5) classes.</p>
                 <Link to="/enroll" className="lb-grade-btn" style={{ background: '#f59e0b' }}>ENROLL HERE</Link>
              </div>
              <div className="lb-grade-card">
                 <img src="/arts_crafts.png" className="lb-grade-img" alt="Grade R" />
                 <h3 style={{ color: '#312e81', fontSize: '1.5rem', marginBottom: '1rem' }}>Grade R</h3>
                 <p style={{ color: '#475569', fontSize: '0.95rem' }}>The Beacon Academy offers Grade R (5 turning 6) classes.</p>
                 <Link to="/enroll" className="lb-grade-btn" style={{ background: '#06b6d4' }}>ENROLL HERE</Link>
              </div>
           </div>
        </div>
      </section>

      {/* ══ STRUCTURED LEARNING ═════════════════════════ */}
      <section className="section" style={{ background: 'white' }}>
         <div className="container">
            <div className="lb-structure-grid">
               <div style={{ display: 'flex', flexDirection: 'column', justifySelf: 'center' }}>
                  <h2 className="section-title" style={{ color: '#312e81', lineHeight: '1.2' }}>Structured Learning Environment</h2>
                  <p style={{ color: '#475569', margin: '1.5rem 0' }}>We offer a structured curriculum with music and movement, many extra mural activities, hot meals and much more...</p>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                    {['Structured Curriculum', 'Music', 'Movement', 'Extra Murals', 'Arts & Crafts', 'Space to play'].map((item, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#312e81', fontWeight: '700', fontSize: '0.85rem' }}>
                         <div style={{ color: '#ec4899' }}>👉</div> {item}
                      </div>
                    ))}
                  </div>

                  <Link to="/programs" className="btn" style={{ background: '#ec4899', color: 'white', padding: '0.8rem 1.5rem', borderRadius: '999px', alignSelf: 'flex-start' }}>EXPLORE OUR CURRICULUM</Link>
               </div>

               <div className="lb-tall-card">
                  <img src="/kid_cutting.png" className="lb-tall-img" alt="Creativity"/>
                  <div className="lb-tall-panel" style={{ background: '#ec4899' }}>
                     <div className="lb-circle-num" style={{ color: '#ec4899' }}>1</div>
                     <span style={{ color: 'white', fontWeight: '800', fontSize: '1.2rem' }}>Creativity</span>
                  </div>
               </div>

               <div className="lb-tall-card">
                  <img src="/outdoor_fun.png" className="lb-tall-img" alt="Play Areas"/>
                  <div className="lb-tall-panel" style={{ background: '#f59e0b' }}>
                     <div className="lb-circle-num" style={{ color: '#f59e0b' }}>2</div>
                     <span style={{ color: 'white', fontWeight: '800', fontSize: '1.2rem' }}>Play Areas</span>
                  </div>
               </div>

               <div className="lb-tall-card" style={{ background: '#06b6d4', padding: '2rem', textAlign: 'left', color: 'white' }}>
                  <div className="lb-circle-num" style={{ color: '#06b6d4', marginBottom: '1.5rem' }}>3</div>
                  <h3 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem' }}>Expert Teachers</h3>
                  <p style={{ opacity: 0.9, lineHeight: 1.6, fontSize: '0.95rem' }}>The Beacon Academy's teachers care about your child and want to see them thrive.</p>
               </div>
            </div>
         </div>
      </section>

      {/* ══ FEATURES ═══════════════════════════════════ */}
      <section className="section features-section">
        <div className="features-bg" />
        <div className="container">
          <div className="text-center">
            <span className="section-tag"><Zap size={14}/> Smart Platform</span>
            <h2 className="section-title" style={{color:'white'}}>Everything You Need,<br/><span style={{color:'var(--accent-yellow)'}}>All In One Place</span></h2>
            <p className="section-sub" style={{color:'rgba(255,255,255,0.7)'}}>
              Our integrated digital platform keeps parents connected, children safe, and educators empowered.
            </p>
          </div>

          <div className="features-grid">
            {features.map((f, i) => (
              <div key={i} className="feature-card" id={`feature-card-${i}`}>
                <div className="feature-icon" style={{ background: f.bg, color: f.color }}>
                  {f.icon}
                </div>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-desc">{f.desc}</p>
                <div className="feature-badge" style={{ color: f.color, background: f.bg }}>
                  <CheckCircle2 size={12}/> Active Feature
                </div>
              </div>
            ))}
          </div>

          <div className="text-center" style={{marginTop:'3rem'}}>
            <Link to="/features" className="btn btn-outline" id="all-features-btn">
              Explore All Features <ArrowRight size={16}/>
            </Link>
          </div>
        </div>
      </section>

      {/* ══ WHY US ═════════════════════════════════════ */}
      <section className="section why-section">
        <div className="container">
          <div className="why-inner">
            <div className="why-content">
              <span className="section-tag"><Award size={14}/> Why Choose Us</span>
              <h2 className="section-title">More Than A<br/><span className="text-gradient">Daycare</span></h2>
              <p style={{color:'var(--text-mid)',marginBottom:'2rem',lineHeight:1.8}}>
                The Beacon Academy is where technology meets heart. We combine the best of early childhood education with smart digital tools, all within a warm, Christian environment.
              </p>

              {[
                { icon: <Shield size={18}/>, title: 'Child Safety First', desc: 'QR check-ins, biometric access, real-time tracking, and CCTV monitoring.' },
                { icon: <Laptop size={18}/>, title: 'Technology Integrated', desc: 'Digital learning tools, progress tracking, AI reports, and parent apps.' },
                { icon: <Heart size={18}/>, title: 'Loving & Christian', desc: 'Faith-based values, caring educators, and a nurturing community.' },
                { icon: <Users size={18}/>, title: 'Small Class Sizes', desc: 'Personalised attention ensuring every child thrives at their own pace.' },
              ].map((item, i) => (
                <div key={i} className="why-item">
                  <div className="why-icon">{item.icon}</div>
                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="why-visual">
              <div className="why-img-wrap" style={{ position: 'relative' }}>
                <img src="/teacher_reading.png" alt="Caring Teachers at The Beacon Academy" className="why-main-photo animate-float" style={{ width: '100%', height: '350px', objectFit: 'cover', borderRadius: '24px', zIndex: 2, position: 'relative', border: '6px solid white', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}/>
                
                {/* Floating kid image element for playful design */}
                <img src="/outdoor_fun.png" alt="Outdoor Fun" style={{ position: 'absolute', bottom: '-30px', left: '-30px', width: '150px', height: '150px', objectFit: 'cover', borderRadius: '50%', border: '6px solid white', zIndex: 3, boxShadow: '0 15px 30px rgba(0,0,0,0.15)', animation: 'float 4s ease-in-out infinite' }} />

                <div className="why-ring why-ring-1"/>
                <div className="why-ring why-ring-2"/>
              </div>
              <div className="why-cert-badges">
                <div className="cert-badge"><Award size={16}/> Registered Pty Ltd</div>
                <div className="cert-badge"><Globe size={16}/> Sophiatown Trusted</div>
                <div className="cert-badge"><Star size={16}/> Christian-Based</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ═══════════════════════════════ */}
      <section className="section testimonials-section">
        <div className="container text-center">
          <span className="section-tag"><Star size={14}/> Parent Reviews</span>
          <h2 className="section-title">What <span className="text-gradient">Families</span> Say</h2>

          <div className="testimonials-carousel">
            <button className="carousel-arrow" id="prev-testimonial-btn" onClick={prevTestimonial}><ChevronLeft size={20}/></button>

            <div className="testimonial-card card-glass">
              <div className="testimonial-stars">
                {Array(testimonials[testimonialIdx].stars).fill(0).map((_,i) => (
                  <Star key={i} size={18} fill="#f1c40f" color="#f1c40f"/>
                ))}
              </div>
              <p className="testimonial-text">"{testimonials[testimonialIdx].text}"</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">{testimonials[testimonialIdx].avatar}</div>
                <div>
                  <div className="testimonial-name">{testimonials[testimonialIdx].name}</div>
                  <div className="testimonial-role">{testimonials[testimonialIdx].role}</div>
                </div>
              </div>
            </div>

            <button className="carousel-arrow" id="next-testimonial-btn" onClick={nextTestimonial}><ChevronRight size={20}/></button>
          </div>

          <div className="carousel-dots">
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`carousel-dot ${i === testimonialIdx ? 'active' : ''}`}
                onClick={() => setTestimonialIdx(i)}
                id={`dot-${i}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA BANNER ════════════════════════════════ */}
      <section className="cta-section">
        <div className="cta-bg"/>
        <div className="container cta-inner">
          <div className="cta-content">
            <h2>Ready to Give Your Child<br/>The <span className="text-gradient-warm">Best Start?</span></h2>
            <p>Join the The Beacon Academy family. Limited spaces available for 2025/2026 intake.</p>
            <div className="cta-actions">
              <Link to="/enroll" className="btn btn-primary" id="cta-enrol-btn">
                Enrol Now <ArrowRight size={18}/>
              </Link>
              <Link to="/about" className="btn btn-ghost" id="cta-learn-btn">
                Learn More
              </Link>
            </div>
          </div>
          <div className="cta-highlight-box">
            <Clock size={28} color="var(--accent-yellow)"/>
            <div>
              <strong>Open Mon – Fri</strong>
              <p>06:30 – 18:00</p>
            </div>
            <div className="cta-divider" />
            <MapPin size={28} color="var(--secondary)"/>
            <div>
              <strong>Sophiatown, 2092</strong>
              <p>65 Gerty St / 28 Edward St</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

