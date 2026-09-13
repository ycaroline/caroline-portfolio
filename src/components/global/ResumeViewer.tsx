import { useEffect, useRef } from 'react';
import { userConfig } from '../../config/index';
import DraggableWindow from './DraggableWindow';

interface ResumeViewerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeViewer({ isOpen, onClose }: ResumeViewerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <DraggableWindow
      title="Resume.pdf"
      onClose={onClose}
      initialPosition={{ 
        x: Math.floor(window.innerWidth * 0.4), 
        y: Math.floor(window.innerHeight * 0.2) 
      }}
      className="w-[90%] h-[90%] max-w-5xl"
      initialSize={{ width: 800, height: 600 }}
    >
      <div className="h-full bg-white flex flex-col">
        <div className="flex items-center justify-between gap-3 border-b border-gray-200 bg-gray-50 px-4 py-2 text-sm">
          <span className="font-medium text-gray-700">Curriculum Vitae</span>
          <div className="flex gap-2">
            <a href="/resume.pdf" target="_blank" rel="noreferrer noopener" className="rounded-md bg-blue-600 px-3 py-1.5 text-white hover:bg-blue-500">
              English PDF
            </a>
            <a href="/lebenslauf.pdf" target="_blank" rel="noreferrer noopener" className="rounded-md border border-gray-300 px-3 py-1.5 text-gray-700 hover:bg-gray-100">
              Deutsch PDF
            </a>
          </div>
        </div>
        <figure className="min-h-0 flex-1">
          <object 
            data={userConfig.resume.localPath} 
            type="application/pdf" 
            width="100%" 
            className="h-full"
            aria-label="Embedded resume PDF"
            title="Resume PDF"
          >
            <p className="p-4 text-sm text-gray-700">
              Your browser can’t display this PDF. 
              <a href={userConfig.resume.url} target="_blank" rel="noreferrer noopener" className="text-blue-600 underline">
                Open the resume in a new tab
              </a>.
            </p>
          </object>
        </figure>
      </div>
    </DraggableWindow>
  );
}
