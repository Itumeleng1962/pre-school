import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Image as ImageIcon } from 'lucide-react'
import './Gallery.css'

const categories = ['All', 'Classroom', 'Technology', 'Arts & Crafts', 'Outdoor Play', 'Events']

const galleryItems = [
  { cat: 'Classroom', img: '/kids_playing.png', title: 'Happy Learning Classroom', color: '#1a73e8' },
  { cat: 'Classroom', img: '/teacher_reading.png', title: 'Story Time', color: '#9b59b6' },
  { cat: 'Arts & Crafts', img: '/arts_crafts.png', title: 'Creative Finger Painting', color: '#e91e8c' },
  { cat: 'Outdoor Play', img: '/outdoor_fun.png', title: 'Sunny Playground Fun', color: '#2ecc71' },
  { cat: 'Classroom', emoji: '🔢', title: 'Maths Play', color: '#FF6B35' },
  { cat: 'Events', emoji: '🎉', title: 'Prize-giving Day', color: '#f1c40f' },
  { cat: 'Technology', emoji: '🤖', title: 'Robotics Fun', color: '#9b59b6' },
  { cat: 'Arts & Crafts', emoji: '✂️', title: 'Craft Corner', color: '#e91e8c' },
  { cat: 'Outdoor Play', emoji: '⚽', title: 'Sports Morning', color: '#2ecc71' },
  { cat: 'Classroom', emoji: '📖', title: 'Reading Circle', color: '#1a73e8' },
  { cat: 'Events', emoji: '🎊', title: 'Year-End Concert', color: '#f1c40f' },
  { cat: 'Arts & Crafts', emoji: '🎵', title: 'Music Lesson', color: '#e91e8c' },
]

export default function Gallery() {
  const [active, setActive] = useState('All')

  const filtered = active === 'All' ? galleryItems : galleryItems.filter(g => g.cat === active)

  return (
    <div className="gallery-page">
      <section className="page-hero">
        <div className="page-hero-bg"/>
        <div className="container page-hero-content">
          <h1>Our <span className="text-gradient-warm">Gallery</span></h1>
          <p>Moments of joy, learning, and creativity captured at The Beacon Academy.</p>
          <div className="page-hero-breadcrumb">
            <Link to="/">Home</Link> / <span>Gallery</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="text-center" style={{marginBottom:'2.5rem'}}>
            <span className="section-tag"><ImageIcon size={14}/> Photo Gallery</span>
            <h2 className="section-title">Life at <span className="text-gradient">The Beacon</span></h2>
          </div>

          {/* Filter Tabs */}
          <div className="gallery-filters">
            {categories.map(c => (
              <button
                key={c}
                id={`filter-${c.toLowerCase().replace(/\s/g,'-')}`}
                className={`gallery-filter-btn ${active === c ? 'active' : ''}`}
                onClick={() => setActive(c)}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="gallery-grid">
            {filtered.map((item, i) => (
              <div key={i} className="gallery-item" style={{ '--gi-color': item.color }}>
                {item.img ? (
                  <img src={item.img} alt={item.title} className="gallery-img" />
                ) : (
                  <div className="gallery-img-placeholder">
                    <span className="gallery-emoji">{item.emoji}</span>
                  </div>
                )}
                <div className="gallery-overlay">
                  <div className="gallery-item-title">{item.title}</div>
                  <div className="gallery-item-cat">{item.cat}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="gallery-note text-center">
            <p>📸 More photos are added regularly. Follow us on social media for daily updates!</p>
          </div>
        </div>
      </section>
    </div>
  )
}
