import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { FaArrowLeft, FaArrowRight, FaBookOpen, FaBriefcase, FaCode, FaGraduationCap, FaHome, FaSearchPlus, FaTimes, FaTrophy, FaUsers } from 'react-icons/fa';
import type { Competition, Image } from '../../types';
import type { Section } from './NotesApp';
import '../../styles/competitions.css';

interface Props {
  competitions: readonly Competition[];
  onNavigate: (section: Section) => void;
  showCourses: boolean;
}

function CompetitionImage({ image }: { image: Image }) {
  const [failedUrl, setFailedUrl] = useState<string | null>(null);
  return failedUrl === image.url
    ? <span className="competition-image-fallback">Image unavailable</span>
    : <img src={image.url} alt={image.alt || 'Competition image'} decoding="async" onError={() => setFailedUrl(image.url)} />;
}

function CompetitionCard({ competition, onPreview }: { competition: Competition; onPreview: (image: Image) => void }) {
  const [imageIndex, setImageIndex] = useState(0);
  const images = competition.images || [];
  const image = images[imageIndex];
  const isIBM = competition.id === 'watsonx-challenge';
  return <article className={`competition-card${isIBM ? ' competition-card--ibm' : ''}`} aria-labelledby={`${competition.id}-title`}>
    <header className="competition-card-header">
      <p className="competition-eyebrow">{competition.year} <span> / </span> {competition.status}</p>
      <h3 id={`${competition.id}-title`}>{competition.title}</h3>
      <p className="competition-organizer">{competition.description}</p>
      <ul className="competition-badges" aria-label="Competition recognition and participation">
        {competition.badges.map(badge => <li key={badge}>{!isIBM && <FaTrophy aria-hidden="true" />}{badge}</li>)}
      </ul>
    </header>
    <div className="competition-feature">
      <div className="competition-gallery">
        {image && <>
          <button type="button" className="competition-image" onClick={() => onPreview(image)} aria-label={`Enlarge: ${image.alt}`}>
            <CompetitionImage image={image} /><span className="competition-zoom"><FaSearchPlus aria-hidden="true" /> Enlarge</span>
          </button>
          {images.length > 1 && <div className="competition-gallery-nav">
            <button type="button" aria-label={`Previous image for ${competition.title}`} onClick={() => setImageIndex(i => (i - 1 + images.length) % images.length)}><FaArrowLeft aria-hidden="true" /></button>
            <span aria-live="polite">{imageIndex + 1} / {images.length}</span>
            <button type="button" aria-label={`Next image for ${competition.title}`} onClick={() => setImageIndex(i => (i + 1) % images.length)}><FaArrowRight aria-hidden="true" /></button>
          </div>}
          <p className="competition-caption" aria-live="polite">{image.description}</p>
          {images.length > 1 && <div className="competition-thumbnails">{images.map((item, index) => <button type="button" key={item.url} aria-label={`Show ${item.description}`} aria-pressed={index === imageIndex} onClick={() => setImageIndex(index)}><CompetitionImage image={item} /></button>)}</div>}
        </>}
      </div>
      <div className="competition-overview">
        <p className="competition-eyebrow">{isIBM ? 'Concept development with IBM Bob' : 'Featured team concept · AOK'}</p>
        <h4>{competition.concept}</h4>
        <p className="competition-summary">{competition.summary}</p>
        <ul className="competition-tags" aria-label="Skills and methods">{competition.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
        {competition.sections.slice(0, 2).map(section => <section className="competition-text" key={section.title}><h5>{section.title}</h5>{section.text && <p>{section.text}</p>}{section.items && <ul>{section.items.map(item => <li key={item}>{item}</li>)}</ul>}</section>)}
      </div>
    </div>
    <details className="competition-details">
      <summary>{isIBM ? 'My contribution & development stage' : 'Team & further context'} <span aria-hidden="true">+</span></summary>
      <div className="competition-details-grid">{competition.sections.slice(2).map(section => <section className="competition-text" key={section.title}><h5>{section.title}</h5>{section.text && <p>{section.text}</p>}{section.items && <ul>{section.items.map(item => <li key={item}>{item}</li>)}</ul>}</section>)}</div>
    </details>
  </article>;
}

function ImagePreview({ image, onClose }: { image: Image; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = dialogRef.current;
    dialog?.showModal();
    return () => dialog?.close();
  }, []);
  return createPortal(<dialog ref={dialogRef} className="competition-preview" aria-label={image.alt || 'Competition image preview'} onCancel={event => { event.preventDefault(); onClose(); }} onKeyDown={event => event.stopPropagation()} onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
    <div className="competition-preview-inner"><button type="button" autoFocus onClick={onClose} aria-label="Close competition image preview"><FaTimes aria-hidden="true" /></button><CompetitionImage image={image} /><p>{image.description}</p></div>
  </dialog>, document.body);
}

export default function CompetitionSection({ competitions, onNavigate, showCourses }: Props) {
  const [preview, setPreview] = useState<Image | null>(null);
  const navigation = [
    { id: 'menu' as const, label: 'Overview', icon: FaHome },
    { id: 'experience' as const, label: 'Experience', icon: FaBriefcase },
    { id: 'education' as const, label: 'Education', icon: FaGraduationCap },
    { id: 'skills' as const, label: 'Skills', icon: FaCode },
    ...(showCourses ? [{ id: 'courses' as const, label: 'Courses', icon: FaBookOpen }] : []),
    { id: 'competitions' as const, label: 'Competitions', icon: FaTrophy },
    { id: 'hobbies' as const, label: 'Interests', icon: FaUsers },
  ];
  return <div className="competition-layout">
    <nav className="competition-sidebar" aria-label="Resume Notes sections"><p>RESUME NOTES</p>{navigation.map(item => <button type="button" key={item.id} onClick={() => onNavigate(item.id)} aria-current={item.id === 'competitions' ? 'page' : undefined}><item.icon aria-hidden="true" /><span>{item.label}</span></button>)}</nav>
    <div className="competition-content">
      <header className="competition-heading"><p className="competition-eyebrow">Ideas · Collaboration · Exploration</p><h2>Competitions</h2><p>From award-winning concepts to hands-on AI exploration.</p></header>
      {competitions.map(competition => <CompetitionCard key={competition.id} competition={competition} onPreview={setPreview} />)}
    </div>
    {preview && <ImagePreview image={preview} onClose={() => setPreview(null)} />}
  </div>;
}
