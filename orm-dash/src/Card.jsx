// src/components/ui/card.jsx
export function Card({ children, className }) {
    return <div className={`bg-gray-700 p-4 rounded-lg ${className}`}>{children}</div>;
  }
  
  export function CardContent({ children }) {
    return <div className="p-4">{children}</div>;
  }
  