import { useNavigate } from 'react';
import './BackButton.css';

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <button 
      className="back-button" 
      onClick={() => navigate(-1)}
      aria-label="Go back"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="20" 
        height="20" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <path d="M19 12H5M12 19l-7-7 7-7"/>
      </svg>
      Back
    </button>
  );
}
