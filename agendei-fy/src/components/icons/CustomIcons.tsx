
import React from 'react';
import { LucideProps } from 'lucide-react';

export const Scissors = (props: LucideProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="6" cy="6" r="3"></circle>
      <circle cx="6" cy="18" r="3"></circle>
      <line x1="20" y1="4" x2="8.12" y2="15.88"></line>
      <line x1="14.47" y1="14.48" x2="20" y2="20"></line>
      <line x1="8.12" y1="8.12" x2="12" y2="12"></line>
    </svg>
  );
};

export const HandHeart = (props: LucideProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"></path>
      <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2"></path>
      <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8"></path>
      <path d="M18 8a2 2 0 1 1 4 0c0 .28-.1.52-.24.72"></path>
      <path d="M19.24 8.72A2 2 0 1 1 22 10.24"></path>
      <path d="M18 8.5a4 4 0 0 1 0 6"></path>
      <path d="M15.34 12.84 14 14.18l-1.34-1.34a1.74 1.74 0 0 0-2.5 0 1.77 1.77 0 0 0 0 2.5l3.84 3.84 3.84-3.84a1.77 1.77 0 0 0 0-2.5 1.74 1.74 0 0 0-2.5 0z"></path>
    </svg>
  );
};

export const Leaf = (props: LucideProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M11 20A7 7 0 0 1 4 13c0-7 9-11 9-11s9 4 9 11a7 7 0 0 1-7 7Z"></path>
      <path d="M12 16v4"></path>
      <path d="m8 16 4-7 4 7"></path>
    </svg>
  );
};
