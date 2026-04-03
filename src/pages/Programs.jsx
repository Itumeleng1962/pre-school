import { Link } from 'react-router-dom'
import { Baby, Laptop, Palette, Crown, BookOpen, Clock, Users, ArrowRight, CheckCircle2 } from 'lucide-react'
import './Programs.css'

const programs = [
  {
    id: 'preschool',
    icon: <Baby size={40}/>,
    color: '#1a73e8',
    title: 'Preschool Programme',
    ages: 'Ages 2 – 6',
    duration: 'Full Day / Half Day',
    desc: 'Our flagship preschool programme provides a rich, play-based learning environment that builds the essential foundations for lifelong learning.',
    highlights: [
      'Language and early literacy development',
      'Numeracy and mathematical thinking',
      'Social-emotional learning & character development',
      'Creative play and exploration',
      'Christian values and daily devotions',
      'Physical development & gross motor skills',
      'School readiness preparation (Grade R)',
    ],
    schedule: '06:30 – 18:00',
  },
  {
    id: 'tech',
    icon: <Laptop size={40}/>,
    color: '#9b59b6',
    title: 'Technology & Innovation',
    ages: 'Ages 3 – 6',
    duration: '4 Sessions / Week',
    desc: 'Introducing children to the digital world through hands-on, age-appropriate technology activities that spark curiosity and critical thinking.',
    highlights: [
      'Introduction to tablets & coding basics',
      'Age-appropriate robotics',
      'Creative digital storytelling',
      'Problem-solving and logical thinking',
      'Digital safety awareness',
      'AI and innovation concepts (simplified)',
    ],
    schedule: 'Mon, Tue, Thu, Fri',
  },
  {
    id: 'arts',
    icon: <Palette size={40}/>,
    color: '#e91e8c',
    title: 'Arts & Creativity',
    ages: 'All Ages',
    duration: '3 Sessions / Week',
    desc: 'A nurturing creative space where children explore self-expression through visual arts, drama, music, and movement.',
    highlights: [
      'Painting, drawing & sculpture',
      'Drama & storytelling performance',
      'Music appreciation & rhythm',
      'Dance and creative movement',
      'Cultural arts and heritage',
      'Craft skills and fine motor development',
    ],
    schedule: 'Mon, Wed, Fri',
  },
  {
    id: 'leadership',
    icon: <Crown size={40}/>,
    color: '#FF6B35',
    title: 'Leadership Training',
    ages: 'Ages 4+',
    duration: '2 Sessions / Week',
    desc: 'Developing the next generation of confident, compassionate leaders through structured, faith-based character training.',
    highlights: [
      'Public speaking & presentation skills',
      'Teamwork & collaborative projects',
      'Christian values and servant leadership',
      'Confidence building activities',
      'Goal-setting for young minds',
      'Community service awareness',
    ],
    schedule: 'Tue, Thu',
  },
]

export default function Programs() {
  return (
    <div className="programs-page">
      <section className="page-hero">
        <div className="page-hero-bg"/>
        <div className="container page-hero-content">
          <h1>Our <span className="text-gradient-warm">Programmes</span></h1>
          <p>Comprehensive learning journeys crafted to nurture every dimension of your child's growth.</p>
          <div className="page-hero-breadcrumb">
            <Link to="/">Home</Link> / <span>Programmes</span>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="section-sm programs-overview">
        <div className="container text-center">
          <span className="section-tag"><BookOpen size={14}/> Curriculum Design</span>
          <h2 className="section-title">Holistic Education <span className="text-gradient">by Design</span></h2>
          <p className="section-sub">
            Each programme is carefully designed by early childhood specialists to ensure balanced development across cognitive, emotional, social, physical, and spiritual domains.
          </p>
        </div>
      </section>

      {/* Programme Details */}
      {programs.map((p, i) => (
        <section key={p.id} id={p.id} className={`section prog-detail-section ${i % 2 === 1 ? 'prog-alt' : ''}`}>
          <div className="container">
            <div className={`prog-detail-grid ${i % 2 === 1 ? 'prog-reverse' : ''}`}>
              <div className="prog-visual" style={{ '--pc': p.color }}>
                <div className="prog-icon-big">{p.icon}</div>
                <div className="prog-meta">
                  <div className="prog-meta-item"><Users size={16}/> {p.ages}</div>
                  <div className="prog-meta-item"><Clock size={16}/> {p.duration}</div>
                  <div className="prog-meta-item"><BookOpen size={16}/> {p.schedule}</div>
                </div>
              </div>
              <div className="prog-content">
                <div className="badge badge-primary" style={{ marginBottom: '0.8rem' }}>{p.ages}</div>
                <h2 className="section-title" style={{ fontSize: '2rem', textAlign: 'left', marginBottom: '1rem' }}>
                  {p.title}
                </h2>
                <p className="prog-desc">{p.desc}</p>
                <h4 style={{ marginBottom: '1rem', color: 'var(--text-dark)', fontWeight: 800 }}>
                  Programme Highlights
                </h4>
                <ul className="prog-highlights">
                  {p.highlights.map((h, j) => (
                    <li key={j} className="prog-highlight-item" style={{ '--pc': p.color }}>
                      <CheckCircle2 size={16} className="phi-icon"/>
                      {h}
                    </li>
                  ))}
                </ul>
                <Link to="/contact" className="btn btn-primary" style={{ marginTop: '1.5rem' }} id={`enrol-${p.id}-btn`}>
                  Enrol in This Programme <ArrowRight size={16}/>
                </Link>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Tutoring */}
      <section className="section tutoring-section">
        <div className="container text-center">
          <span className="section-tag"><BookOpen size={14}/> Extra Support</span>
          <h2 className="section-title">Primary School <span className="text-gradient">Tutoring</span></h2>
          <p className="section-sub">
            After-school tutoring for primary school learners covering Mathematics, English, Science, and Life Skills. Taught by qualified educators in a safe, structured environment.
          </p>
          <Link to="/contact" className="btn btn-secondary" id="tutoring-enquire-btn">
            Enquire About Tutoring <ArrowRight size={16}/>
          </Link>
        </div>
      </section>
    </div>
  )
}
