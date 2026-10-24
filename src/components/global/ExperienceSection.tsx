import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { FaArrowLeft, FaArrowRight, FaBriefcase, FaCode, FaGraduationCap, FaHome, FaSearchPlus, FaTimes, FaTrophy, FaUsers } from 'react-icons/fa';
import type { Experience, Image } from '../../types';
import type { Section } from './NotesApp';
import '../../styles/experience.css';

// Crop the source screenshot in the browser; the original photographic pixels stay unchanged.
function EventPhoto({ source, crop, alt }: { source: string; crop: readonly [number, number, number, number]; alt: string }) {
  const [x, y, width, height] = crop;
  return <div className="experience-event-photo" style={{ aspectRatio: `${width} / ${height}` }}>
    <img src={source} alt={alt} decoding="async" style={{ width: `${946 / width * 100}%`, left: `${-x / width * 100}%`, top: `${-y / height * 100}%` }} />
  </div>;
}

function ExperienceImage({ image }: { image: Image }) {
  const [failedUrl, setFailedUrl] = useState<string | null>(null);
  if (failedUrl === image.url) return <span className="experience-image-fallback">Image unavailable</span>;
  if (image.presentation === 'ibm-event-collage') return <div className="experience-event-board">
    <div className="experience-event-heading"><span>IBM</span> Storage On Tour<small>Frankfurt · 21 April 2026</small></div>
    <div className="experience-event-grid">
      <EventPhoto source={image.url} crop={[312, 822, 309, 140]} alt="Team presentation at IBM Storage On Tour in Frankfurt." />
      <EventPhoto source={image.url} crop={[477, 1108, 321, 127]} alt="An IBM event speaker demonstrating software to the audience." />
      <EventPhoto source={image.url} crop={[478, 965, 298, 127]} alt="Speaker discussing flash storage in the modern data center." />
    </div>
  </div>;
  return <img src={image.url} alt={image.alt || 'Professional experience photograph'} decoding="async" onError={() => setFailedUrl(image.url)} />;
}

function ExperienceGallery({ item, onPreview }: { item: Experience; onPreview: (image: Image) => void }) {
  const images = item.images || [];
  const [activeIndex, setActiveIndex] = useState(item.id === 'mercedes-benz' ? Math.max(0, images.findIndex(image => image.url === '/IMG_7032.PNG')) : 0);
  const image = images[activeIndex];
  if (!image) return null;
  return <div className="experience-gallery">
    <button type="button" className="experience-main-image" aria-label={`Enlarge: ${image.alt}`} onClick={() => onPreview(image)}>
      <ExperienceImage image={image} /><span className="experience-zoom"><FaSearchPlus aria-hidden="true" /> Enlarge</span>
    </button>
    {images.length > 1 && <div className="experience-gallery-nav">
      <button type="button" aria-label={`Previous image for ${item.organization}`} onClick={() => setActiveIndex(index => (index - 1 + images.length) % images.length)}><FaArrowLeft aria-hidden="true" /></button>
      <span aria-live="polite">{activeIndex + 1} / {images.length}</span>
      <button type="button" aria-label={`Next image for ${item.organization}`} onClick={() => setActiveIndex(index => (index + 1) % images.length)}><FaArrowRight aria-hidden="true" /></button>
    </div>}
    <p className="experience-caption" aria-live="polite">{image.description || image.alt}</p>
    {images.length > 1 && <div className="experience-thumbnails">{images.map((image, index) => <button type="button" key={image.url} aria-label={`Show ${image.description || image.alt}`} aria-pressed={index === activeIndex} onClick={() => setActiveIndex(index)}><ExperienceImage image={image} /></button>)}</div>}
  </div>;
}

function ExperiencePreview({ image, onClose }: { image: Image; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    dialog?.showModal();
    return () => dialog?.close();
  }, []);
  return createPortal(<dialog ref={ref} className="experience-preview" aria-label={image.alt || 'Experience image preview'} onCancel={event => { event.preventDefault(); onClose(); }} onKeyDown={event => event.stopPropagation()} onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
    <div className="experience-preview-inner"><button type="button" autoFocus onClick={onClose} aria-label="Close experience image preview"><FaTimes aria-hidden="true" /></button><div className="experience-preview-media"><ExperienceImage image={image} /></div><p>{image.description || image.alt}</p></div>
  </dialog>, document.body);
}

export default function ExperienceSection({ experience, onNavigate }: { experience: readonly Experience[]; onNavigate: (section: Section) => void }) {
  const [preview, setPreview] = useState<Image | null>(null);
  const navigation = [
    { id: 'menu' as const, label: 'Overview', icon: FaHome },
    { id: 'experience' as const, label: 'Experience', icon: FaBriefcase },
    { id: 'education' as const, label: 'Education', icon: FaGraduationCap },
    { id: 'skills' as const, label: 'Skills', icon: FaCode },
    { id: 'competitions' as const, label: 'Competitions', icon: FaTrophy },
    { id: 'hobbies' as const, label: 'Interests', icon: FaUsers },
  ];
  return <div className="experience-layout">
    <nav className="experience-sidebar" aria-label="Resume Notes sections"><p>RESUME NOTES</p>{navigation.map(item => <button type="button" key={item.id} onClick={() => onNavigate(item.id)} aria-current={item.id === 'experience' ? 'page' : undefined}><item.icon aria-hidden="true" /><span>{item.label}</span></button>)}</nav>
    <div className="experience-content">
      <header className="experience-heading"><p className="experience-eyebrow">Technology · Communication · Exploration</p><h2>Experience</h2><p>Hands-on work, shared ideas and the people behind it.</p></header>
      <div className="experience-timeline">{experience.map((item, index) => <article className="experience-entry" key={item.id || item.title}>
        <p className="experience-period">{item.period}</p>
        <details className="experience-card" open={index < 2}>
          <summary><div><h3>{item.organization || item.title.split(' | ')[0]}</h3><p className="experience-specialism">{item.title.split(' | ')[1] || item.title}</p><p className="experience-role">{item.company} · {item.location}</p></div><span className="experience-expand" aria-hidden="true">+</span></summary>
          <div className="experience-card-body">
            <ExperienceGallery item={item} onPreview={setPreview} />
            <div className="experience-contributions"><h4>Selected contributions</h4>{item.highlights ? <ul>{item.highlights.map(text => <li key={text}>{text}</li>)}</ul> : <p>{item.description}</p>}<ul className="experience-tags" aria-label={`Skills used at ${item.organization}`}>{item.technologies?.map(tech => <li key={tech}>{tech}</li>)}</ul></div>
          </div>
        </details>
      </article>)}</div>
    </div>
    {preview && <ExperiencePreview image={preview} onClose={() => setPreview(null)} />}
  </div>;
}
