import { useState } from 'react';
import { getAlbums } from '../data/dataService';
import BackButton from '../components/BackButton';
import './Gallery.css';

export default function Gallery() {
  const albums = getAlbums();
  const [activeAlbum, setActiveAlbum] = useState(null);
  const [lightbox, setLightbox] = useState(null);

  const displayAlbums = activeAlbum ? albums.filter(a => a.id === activeAlbum) : albums;

  return (
    <div className="gallery-page">
      <div className="page-hero">
        <div className="page-hero-bg"></div>
        <div className="container">
          <BackButton />
          <h1 className="page-hero-title">Gallery</h1>
          <p className="page-hero-subtitle">Memories from <span className="golden-text" style={{fontWeight: 600}}>EFFICACY'26</span></p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="gallery-filters">
            <button className={`gallery-filter-btn ${!activeAlbum ? 'active' : ''}`} onClick={() => setActiveAlbum(null)}>All</button>
            {albums.map(a => (
              <button key={a.id} className={`gallery-filter-btn ${activeAlbum === a.id ? 'active' : ''}`} onClick={() => setActiveAlbum(a.id)}>{a.name}</button>
            ))}
          </div>

          {displayAlbums.map(album => (
            <div key={album.id} className="gallery-album">
              <h3 className="gallery-album-title">{album.name}</h3>
              <div className="gallery-grid">
                {album.images.map((img, i) => (
                  <div key={img.id} className="gallery-item" style={{ animationDelay: `${i * 0.08}s` }} onClick={() => setLightbox(img)}>
                    <img src={img.url} alt={img.caption} loading="lazy" />
                    <div className="gallery-item-overlay">
                      <span>{img.caption}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setLightbox(null)}>✕</button>
            <img src={lightbox.url} alt={lightbox.caption} />
            <p className="lightbox-caption">{lightbox.caption}</p>
          </div>
        </div>
      )}
    </div>
  );
}
