import React from 'react';

export const changelogData = [
    {
    version: 'v1.6.0',
    date: 'October 22, 2025',
    changes: [
      'Fixed a critical bug where the application failed to load, resulting in a blank screen.',
      'Ensured the main application script is correctly loaded in `index.html` to enable UI rendering.',
    ],
  },
    {
    version: 'v1.5.0',
    date: 'October 21, 2025',
    changes: [
      'Fixed a critical bug where the application logo was broken due to an incomplete image data string.',
      'Improvement: Replaced the previous logo implementation with a scalable and self-contained SVG for better performance and reliability.',
    ],
  },
    {
    version: 'v1.4.0',
    date: 'October 20, 2025',
    changes: [
      'New Feature: Added an "Inspiration" dropdown with example prompts.',
      'Helps users overcome creative blocks by providing starting points for their icon descriptions.',
    ],
  },
    {
    version: 'v1.3.0',
    date: 'October 19, 2025',
    changes: [
      'Added a changelog modal to keep you updated on new features.',
      'Updated version history to reflect actual application development.',
    ],
  },
  {
    version: 'v1.2.0',
    date: 'October 19, 2025',
    changes: [
      'New Feature: Generate slight variations of a single icon concept using the new checkbox.',
      'The AI prompt is now dynamically adjusted based on the user\'s choice for more creative control.',
    ],
  },
  {
    version: 'v1.1.0',
    date: 'October 19, 2025',
    changes: [
        'Expanded batch size options to include 16 and 20 icons for larger generation jobs.',
    ],
  },
  {
    version: 'v1.0.0',
    date: 'October 19, 2025',
    changes: [
        'Initial release of the AI Icon Batch Generator.',
        'Core features include generating icons from a text prompt, selecting from various styles, and choosing batch sizes.',
        'Added the ability to download all generated icons as a single .zip file.'
    ],
  },
];

interface ChangelogModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChangelogModal: React.FC<ChangelogModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="bg-base-200 w-full max-w-2xl rounded-2xl shadow-2xl border border-white/10 p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">What's New</h2>
          <button
            onClick={onClose}
            className="text-content-200 hover:text-white transition-colors"
            aria-label="Close changelog"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 20 20" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-8">
          {changelogData.map((entry) => (
            <div key={entry.version}>
              <div className="flex items-baseline space-x-3">
                <span className="bg-brand-primary text-white text-xs font-semibold px-2 py-1 rounded-full">{entry.version}</span>
                <p className="text-sm text-content-200">{entry.date}</p>
              </div>
              <ul className="mt-4 list-disc list-inside space-y-2 text-content-100">
                {entry.changes.map((change, index) => (
                  <li key={index}>{change}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChangelogModal;