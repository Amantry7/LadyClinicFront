
// ui/GlobalStyles.tsx
import React from 'react';

export const GlobalStyles: React.FC = () => {
    return (
        <style jsx global>{`
      @keyframes fade-in {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .animate-fade-in {
        animation: fade-in 0.8s ease-out forwards;
      }

      .fade-in {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
      }

      .fade-in.visible {
        opacity: 1;
        transform: translateY(0);
      }

      html {
        scroll-behavior: smooth;
      }

      ::-webkit-scrollbar {
        width: 8px;
      }

      ::-webkit-scrollbar-track {
        background: #f1f1f1;
      }

      ::-webkit-scrollbar-thumb {
        background: linear-gradient(to bottom, #ec4899, #8b5cf6);
        border-radius: 4px;
      }

      ::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(to bottom, #db2777, #7c3aed);
      }

      .ant-card {
        border-radius: 16px !important;
      }

      .ant-btn-primary {
        box-shadow: 0 4px 14px 0 rgba(236, 72, 153, 0.39);
      }

      .ant-btn-primary:hover {
        box-shadow: 0 6px 20px rgba(236, 72, 153, 0.23);
      }

      @media (max-width: 768px) {
        .ant-col {
          margin-bottom: 16px;
        }
      }
    `}</style>
    );
};

// HomePage