// components/PasswordStrengthMeter.tsx

import React from 'react';
import { evaluatePasswordStrength } from '../utils/passwordUtils';

interface PasswordStrengthMeterProps {
  password: string;
}

const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({ password }) => {
  const { score, feedback } = evaluatePasswordStrength(password);
  
  // Define colors for different strength levels
  const getColor = () => {
    switch(score) {
      case 0: return 'red';
      case 1: return 'orangered';
      case 2: return 'orange';
      case 3: return 'yellowgreen';
      case 4:
      case 5: return 'green';
      default: return 'gray';
    }
  };
  
  // Only show the meter if there's something typed
  if (!password) {
    return null;
  }
  
  return (
    <div className="password-strength-meter">
      <div className="strength-bars">
        {[...Array(5)].map((_, index) => (
          <div 
            key={index}
            className="strength-bar"
            style={{
              backgroundColor: index <= score ? getColor() : 'lightgray',
              height: '5px',
              width: '20%',
              display: 'inline-block',
              margin: '0 1px'
            }}
          />
        ))}
      </div>
      <div className="strength-text" style={{ color: getColor(), fontSize: '0.8rem', marginTop: '5px' }}>
        {feedback}
      </div>
    </div>
  );
};

export default PasswordStrengthMeter;