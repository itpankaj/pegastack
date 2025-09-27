import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

const Card = ({ children, className = '', hover = true }: CardProps) => {
  return (
    <div className={`card ${hover ? 'hover:shadow-xl' : ''} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
