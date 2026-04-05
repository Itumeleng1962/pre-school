import { Link } from 'react-router-dom'
import { Heart, Users, Award, Target, BookOpen, Star, Cpu, ArrowRight, MapPin, Clock } from 'lucide-react'
import './About.css'

const team = [
  { name: 'Principal', role: 'Executive Director', emoji: '👩🏾‍🏫', desc: 'B.Ed Early Childhood Development | 12 Years Experience' },
  { name: 'Lead Educator', role: 'Preschool Lead', emoji: '👩🏽‍🏫', desc: 'Diploma in Education | Child Development Specialist' },
  { name: 'Tech Coordinator', role: 'EdTech Lead', emoji: '👨🏿‍💻', desc: 'B.Sc Computer Science | Educational Technology' },
  { name: 'Arts Director', role: 'Creative Arts', emoji: '👩🏾‍🎨', desc: 'BA Fine Arts | Drama & Music Educator' },
]

const milestones = [
  { year: '2018', event: 'The Beacon Academy founded in Sophiatown' },
  { year: '2019', event: 'Registered as Private Limited Company' },
  { year: '2020', event: 'Launched digital parent communication platform' },
  { year: '2021', event: 'Introduced Coding for Kids & Technology programme' },
  { year: '2022', event: 'Expanded to Arts, Creativity & Leadership streams' },
  { year: '2024', event: 'Launched Smart Check-In & Live Classroom system' },
]

const values = [
  { icon: <Heart size={24}/>, label: 'Love & Care', color: '#e91e8c' },
  { icon: <Award size={24}/>, label: 'Excellence', color: '#f1c40f' },
  { icon: <Star size={24}/>, label: 'Faith-Based', color: '#9b59b6' },
  { icon: <Users size={24}/>, label: 'Community', color: '#2ecc71' },
  { icon: <Target size={24}/>, label: 'Purpose', color: '#FF6B35' },
  { icon: <Cpu size={24}/>, label: 'Innovation', color: '#1a73e8' },
]

export default function About() {
  return (
    <div className="about-page">
      {/* Page Header */}
      <section className="page-hero about-hero">
        <div className="page-hero-bg"/>
        <div className="container page-hero-content">
          <h1>About <span className="text-gradient-warm">The Beacon</span></h1>
          <p>A loving, caring, and Christian-based environment preparing every child for a bright tomorrow.</p>
          <div className="page-hero-breadcrumb">
            <Link to="/">Home</Link> / <span>About Us</span>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section">
        <div className="container">
          <div className="about-story">
            <div className="about-story-img">
              <img src="/logo.jpeg" alt="The Beacon Academy" className="story-logo animate-float"/>
              <div className="story-badge story-badge-mission">
                <BookOpen size={18}/>
                <div><strong>Our Mission</strong><p>Holistic development for every child</p></div>
              </div>
              <div className="story-badge story-badge-vision">
                <Heart size={18}/>
                <div><strong>Our Vision</strong><p>Beacon of light in every home</p></div>
              </div>
            </div>
            <div className="about-story-content">
              <span className="section-tag">Our Story</span>
              <h2 className="section-title">A School Built on <span className="text-gradient">Faith & Innovation</span></h2>
              <p>The Beacon Academy was born out of a passion to provide Sophiatown's families with more than just childcare. We believe every child carries a unique light, and our role is to fan that flame.</p>
              <p>Founded in 2018, we started as a small preschool with a handful of children and a big vision. Today, we are a fully integrated early childhood development centre combining the warmth of a Christian home with the rigour of a tech-forward education.</p>
              <p>Our holistic approach ensures children develop intellectually, emotionally, socially, physically, and spiritually — fully prepared for primary school and life beyond.</p>

              <div className="about-vals">
                {values.map((v, i) => (
                  <div key={i} className="val-chip" style={{ color: v.color, background: `${v.color}15` }}>
                    {v.icon} {v.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section about-mv-section">
        <div className="container">
          <div className="mv-grid">
            <div className="mv-card mv-mission">
              <div className="mv-icon"><Target size={32}/></div>
              <h3>Mission</h3>
              <p>To provide a secure, technology-integrated environment that prepares children for primary school through holistic development.</p>
            </div>
            <div className="mv-card mv-vision">
              <div className="mv-icon"><Star size={32}/></div>
              <h3>Vision</h3>
              <p>To create a loving, caring, and Christian-based environment where children can holistically develop optimally.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section">
        <div className="container text-center">
          <span className="section-tag">Our Journey</span>
          <h2 className="section-title">Milestones That <span className="text-gradient">Define Us</span></h2>
          <div className="timeline">
            {milestones.map((m, i) => (
              <div key={i} className={`timeline-item ${i % 2 === 0 ? 'left' : 'right'}`}>
                <div className="timeline-dot"/>
                <div className="timeline-card card">
                  <div className="timeline-year">{m.year}</div>
                  <p>{m.event}</p>
                </div>
              </div>
            ))}
            <div className="timeline-line"/>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section about-team-section">
        <div className="container text-center">
          <span className="section-tag"><Users size={14}/> Our People</span>
          <h2 className="section-title">Meet the <span className="text-gradient">Team</span></h2>
          <p className="section-sub">Experienced, passionate educators dedicated to nurturing every bright mind.</p>

          <div className="team-grid">
            {team.map((t, i) => (
              <div key={i} className="team-card card">
                <div className="team-avatar">{t.emoji}</div>
                <h3 className="team-name">{t.name}</h3>
                <div className="team-role badge badge-primary" style={{margin:'0.5rem auto'}}>{t.role}</div>
                <p className="team-desc">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="section-sm about-location">
        <div className="container">
          <div className="location-card card-glass">
            <div className="location-info">
              <span className="section-tag"><MapPin size={14}/> Find Us</span>
              <h3>Visit The Beacon Academy</h3>
              <p><MapPin size={16}/> 65 Gerty Street / 28 Edward St, Sophiatown, 2092</p>
              <p><Clock size={16}/> Mon – Fri: 06:30 – 18:00 | Sat: 07:00 – 13:00</p>
              <Link to="/contact" className="btn btn-primary" style={{marginTop:'1.2rem'}}>
                Book a Tour <ArrowRight size={16}/>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
