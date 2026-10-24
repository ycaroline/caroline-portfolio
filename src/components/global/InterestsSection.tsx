import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { FaArrowLeft, FaArrowRight, FaBriefcase, FaCode, FaExpandAlt, FaGraduationCap, FaHome, FaTimes, FaTrophy, FaUsers } from 'react-icons/fa';
import type { Image, personalHobbie } from '../../types';
import type { Section } from './NotesApp';
import '../../styles/interests.css';

function InterestPhoto({ image }: { image: Image }) {
  const [failed, setFailed] = useState(false);
  return failed ? <span className="interest-image-fallback">Image unavailable</span> : <img src={image.url} alt={image.alt || 'Personal photograph'} decoding="async" loading="lazy" onError={() => setFailed(true)} />;
}

function PhotoPreview({ images, startIndex, onClose }: { images: readonly Image[]; startIndex: number; onClose: () => void }) {
  const [index, setIndex] = useState(startIndex);
  const ref = useRef<HTMLDialogElement>(null);
  const cycle = (direction: number) => setIndex(current => (current + direction + images.length) % images.length);
  useEffect(() => { const dialog = ref.current; dialog?.showModal(); return () => dialog?.close(); }, []);
  const image = images[index];
  return createPortal(<dialog ref={ref} className="interest-preview" aria-label="Personal photo gallery" onCancel={event => { event.preventDefault(); onClose(); }} onKeyDown={event => { event.stopPropagation(); if (event.key === 'ArrowRight') { event.preventDefault(); cycle(1); } if (event.key === 'ArrowLeft') { event.preventDefault(); cycle(-1); } }} onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
    <header><p>A little outside work</p><button type="button" autoFocus onClick={onClose} aria-label="Close personal photo preview"><FaTimes aria-hidden="true" /></button></header>
    <div className="interest-preview-image"><InterestPhoto key={image.url} image={image} /></div>
    <div className="interest-preview-nav"><button type="button" aria-label="Previous personal photo" onClick={() => cycle(-1)}><FaArrowLeft aria-hidden="true" /></button><p aria-live="polite">{index + 1} / {images.length} · {image.description || image.alt}</p><button type="button" aria-label="Next personal photo" onClick={() => cycle(1)}><FaArrowRight aria-hidden="true" /></button></div>
  </dialog>, document.body);
}

const stories = [
  { source: 'Traveling', title: 'Places & perspectives', tag: 'Travel', text: 'Exploring new places and local cultures.', className: 'travel' },
  { source: 'Sports', title: 'Movement & balance', tag: 'Sports', text: 'Training and making time to recharge.', className: 'sports' },
  { source: 'Food Exploration', title: 'Good food, good company', tag: 'Food exploration', text: 'Discovering new restaurants and food spots.', className: 'food' },
] as const;

export default function InterestsSection({ hobbies, onNavigate }: { hobbies: readonly personalHobbie[]; onNavigate: (section: Section) => void }) {
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const photos = hobbies.flatMap(item => item.images || []);
  const navigation = [
    { id: 'menu' as const, label: 'Overview', icon: FaHome },
    { id: 'experience' as const, label: 'Experience', icon: FaBriefcase },
    { id: 'education' as const, label: 'Education', icon: FaGraduationCap },
    { id: 'skills' as const, label: 'Skills', icon: FaCode },
    { id: 'competitions' as const, label: 'Competitions', icon: FaTrophy },
    { id: 'hobbies' as const, label: 'Interests', icon: FaUsers },
  ];
  return <div className="interests-layout">
    <nav className="interests-sidebar" aria-label="Resume Notes sections"><p>RESUME NOTES</p>{navigation.map(item => <button type="button" key={item.id} onClick={() => onNavigate(item.id)} aria-current={item.id === 'hobbies' ? 'page' : undefined}><item.icon aria-hidden="true" /><span>{item.label}</span></button>)}</nav>
    <div className="interests-content"><header className="interests-heading"><p>A little outside work</p><h2>Beyond the résumé</h2><span>Places, movement and good food.</span></header>
      <div className="interests-grid">{stories.map(story => {
        const item = hobbies.find(item => item.title === story.source);
        if (!item) return null;
        // Show the travel portrait first while keeping both original travel images.
        const images = story.className === 'travel' ? [...(item.images || [])].reverse() : item.images || [];
        return <section key={story.source} className={`interest-story interest-story--${story.className}`} aria-label={story.tag}>
          <header><div><h3>{story.title}</h3><p>{story.text}</p></div><span>{story.tag}</span></header>
          <div className="interest-photo-grid">{images.map(image => <figure key={image.url}><button type="button" aria-label={`Enlarge: ${image.alt}`} onClick={() => setPreviewIndex(photos.findIndex(photo => photo.url === image.url))}><InterestPhoto image={image} /><span className="interest-enlarge"><FaExpandAlt aria-hidden="true" /></span></button><figcaption>{image.description || image.alt}</figcaption></figure>)}</div>
        </section>;
      })}</div>
    </div>
    {previewIndex !== null && <PhotoPreview images={photos} startIndex={previewIndex} onClose={() => setPreviewIndex(null)} />}
  </div>;
}
