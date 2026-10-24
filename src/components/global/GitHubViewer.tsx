import { useEffect, useRef, useState } from 'react';
import { FaArrowLeft, FaArrowRight, FaExternalLinkAlt, FaGithub, FaSearchPlus, FaTimes } from 'react-icons/fa';
import { userConfig } from '../../config/index';
import type { Image, Project } from '../../types';
import DraggableWindow from './DraggableWindow';
import '../../styles/projects.css';

interface GitHubViewerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProjectId?: string;
}

function ProjectImage({ image, className = '' }: { image: Image; className?: string }) {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [image.url]);
  return failed ? (
    <div className={`project-image-fallback ${className}`} role="img" aria-label={image.alt || 'Project image unavailable'}>
      <span>Image unavailable</span>
    </div>
  ) : <img src={image.url} alt={image.alt || 'Project image'} className={className} onError={() => setFailed(true)} />;
}

function ProjectLinks({ project }: { project: Project }) {
  const specificRepo = project.repoUrl && project.repoUrl.replace(/\/$/, '') !== userConfig.social.github.replace(/\/$/, '');
  return <div className="project-links">
    {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"><FaExternalLinkAlt aria-hidden="true" />{project.liveLabel || 'View project'}</a>}
    {specificRepo && <a href={project.repoUrl} target="_blank" rel="noopener noreferrer"><FaGithub aria-hidden="true" />View code</a>}
  </div>;
}

function ProjectTags({ project }: { project: Project }) {
  return <ul className="project-tags" aria-label="Project skills and technologies">{project.techStack.map(tech => <li key={tech}>{tech}</li>)}</ul>;
}

export default function GitHubViewer({ isOpen, onClose, selectedProjectId }: GitHubViewerProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [preview, setPreview] = useState<{ project: Project; index: number } | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const previewCloseRef = useRef<HTMLButtonElement>(null);
  const previewOpenerRef = useRef<HTMLElement | null>(null);

  const openProject = (project: Project) => {
    setSelectedProject(project);
    setActiveImageIndex(0);
    scrollRef.current?.scrollTo({ top: 0 });
  };
  const openPreview = (project: Project, index = 0) => {
    previewOpenerRef.current = document.activeElement as HTMLElement | null;
    setPreview({ project, index });
  };
  const closePreview = () => {
    setPreview(null);
    previewOpenerRef.current?.focus();
  };
  const cyclePreview = (direction: number) => setPreview(current => current && ({
    ...current, index: (current.index + direction + current.project.images.length) % current.project.images.length,
  }));

  useEffect(() => {
    if (!isOpen) { setPreview(null); return; }
    if (selectedProjectId) {
      const project = userConfig.projects.find(item => item.id === selectedProjectId);
      if (project) { setSelectedProject(project); setActiveImageIndex(0); }
    }
  }, [isOpen, selectedProjectId]);

  useEffect(() => {
    if (!preview) return;
    previewCloseRef.current?.focus();
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); closePreview(); }
      if (event.key === 'ArrowRight') { event.preventDefault(); cyclePreview(1); }
      if (event.key === 'ArrowLeft') { event.preventDefault(); cyclePreview(-1); }
      if (event.key === 'Tab') {
        const dialog = previewCloseRef.current?.closest('[role="dialog"]');
        const controls = dialog?.querySelectorAll<HTMLButtonElement>('button:not([disabled])');
        if (!controls?.length) return;
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [preview?.project.id]);

  if (!isOpen) return null;
  const width = Math.min(1120, window.innerWidth - 48);
  const height = Math.min(740, window.innerHeight - 160);
  const activeImage = selectedProject?.images[activeImageIndex];

  return <>
    <DraggableWindow
      title={selectedProject?.title || 'Selected Projects'}
      onClose={onClose}
      initialPosition={{ x: Math.max(16, (window.innerWidth - width) / 2), y: Math.max(88, (window.innerHeight - height) / 2 - 15) }}
      initialSize={{ width, height }}
      className="project-window"
    >
      <div className="project-browser" ref={scrollRef}>
        {!selectedProject ? <>
          <header className="projects-heading"><p className="project-eyebrow">SELECTED WORK</p><h2>Projects & explorations</h2><p>AI · Digital Solutions · Human–Computer Interaction</p></header>
          <div className="project-grid">
            {userConfig.projects.map(project => <article className="project-card" data-project-id={project.id} key={project.id}>
              {project.images[0] && <button type="button" className="project-cover" aria-label={`Preview images: ${project.title}`} onClick={() => openPreview(project)}>
                <ProjectImage image={project.images[0]} />
                <span className="project-cover-hint"><FaSearchPlus aria-hidden="true" /> Preview images</span>
              </button>}
              <div className="project-card-content"><p className="project-eyebrow">{project.category || 'Project'}</p><h3><button type="button" onClick={() => openProject(project)}>{project.title}</button></h3><p className="project-summary">{project.description}</p>
                {project.contribution && <p className="project-contribution"><strong>My contribution</strong>{project.contribution}</p>}
                <ProjectTags project={project} />
                <button type="button" className="project-action" onClick={() => openProject(project)}>View project <FaArrowRight aria-hidden="true" /></button>
                <ProjectLinks project={project} />
              </div>
            </article>)}
          </div>
        </> : <>
          <button type="button" className="project-back" onClick={() => { setSelectedProject(null); setActiveImageIndex(0); scrollRef.current?.scrollTo({ top: 0 }); }}><FaArrowLeft aria-hidden="true" />Back to Projects</button>
          <header className="projects-heading project-detail-heading"><p className="project-eyebrow">{selectedProject.category || 'Project'}</p><h2>{selectedProject.title}</h2><p>{selectedProject.description}</p><ProjectTags project={selectedProject} /><ProjectLinks project={selectedProject} /></header>
          <div className="project-detail-grid">
            <section className="project-gallery" data-project-id={selectedProject.id} aria-label="Project images">
              {activeImage && <>
                <button type="button" className="project-main-image" aria-label={`Enlarge image ${activeImageIndex + 1}: ${activeImage.alt || selectedProject.title}`} onClick={() => openPreview(selectedProject, activeImageIndex)}><ProjectImage image={activeImage} /><span className="project-cover-hint"><FaSearchPlus aria-hidden="true" /> Enlarge image</span></button>
                <div className="project-gallery-nav"><button type="button" aria-label="Previous screenshot" disabled={selectedProject.images.length < 2} onClick={() => setActiveImageIndex(index => (index - 1 + selectedProject.images.length) % selectedProject.images.length)}><FaArrowLeft /></button><span aria-live="polite">{activeImageIndex + 1} / {selectedProject.images.length}</span><button type="button" aria-label="Next screenshot" disabled={selectedProject.images.length < 2} onClick={() => setActiveImageIndex(index => (index + 1) % selectedProject.images.length)}><FaArrowRight /></button></div>
                <p className="project-caption" aria-live="polite">{activeImage.description || activeImage.alt}</p>
                <div className="project-thumbnails">{selectedProject.images.map((image, index) => <button type="button" key={image.url} onClick={() => setActiveImageIndex(index)} aria-label={`Show image ${index + 1}: ${image.alt || selectedProject.title}`} aria-pressed={index === activeImageIndex}><ProjectImage image={image} /></button>)}</div>
              </>}
            </section>
            <section className="project-story" aria-label="Project overview">
              {selectedProject.sections?.map(section => <div key={section.title}><h3>{section.title}</h3><p>{section.text}</p></div>)}
            </section>
          </div>
        </>}
      </div>
    </DraggableWindow>
    {preview && <div className="project-preview" role="dialog" aria-modal="true" aria-label={`Image preview: ${preview.project.title}`}>
      <div className="project-preview-backdrop" onClick={closePreview} />
      <div className="project-preview-panel" data-project-id={preview.project.id}>
        <header><div><p className="project-eyebrow">PROJECT GALLERY</p><h2>{preview.project.title}</h2></div><button type="button" ref={previewCloseRef} onClick={closePreview} aria-label="Close image preview"><FaTimes /></button></header>
        <ProjectImage image={preview.project.images[preview.index]} className="project-preview-image" />
        <div className="project-gallery-nav"><button type="button" aria-label="Previous preview image" disabled={preview.project.images.length < 2} onClick={() => cyclePreview(-1)}><FaArrowLeft /></button><span aria-live="polite">{preview.index + 1} / {preview.project.images.length}</span><button type="button" aria-label="Next preview image" disabled={preview.project.images.length < 2} onClick={() => cyclePreview(1)}><FaArrowRight /></button></div>
        <p className="project-caption" aria-live="polite">{preview.project.images[preview.index].description || preview.project.images[preview.index].alt}</p>
        <button type="button" className="project-action" onClick={() => { const project = preview.project; closePreview(); openProject(project); }}>View project details <FaArrowRight aria-hidden="true" /></button>
      </div>
    </div>}
  </>;
}
