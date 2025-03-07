// utils/passwordUtils.ts

export const evaluatePasswordStrength = (password: string): {
    score: number;  // 0-4 (0: very weak, 4: very strong)
    feedback: string;
  } => {
    // Initialize score
    let score = 0;
    let feedback = '';
    
    // Check length
    if (password.length < 8) {
      return { score: 0, feedback: 'Password is too short (minimum 8 characters)' };
    } else if (password.length >= 12) {
      score += 1;
    }
    
    // Check for lowercase letters
    if (/[a-z]/.test(password)) {
      score += 1;
    }
    
    // Check for uppercase letters
    if (/[A-Z]/.test(password)) {
      score += 1;
    }
    
    // Check for numbers
    if (/[0-9]/.test(password)) {
      score += 1;
    }
    
    // Check for special characters
    if (/[^A-Za-z0-9]/.test(password)) {
      score += 1;
    }
    
    // Provide feedback based on score
    switch(score) {
      case 0:
        feedback = 'Very weak: Use 8+ characters';
        break;
      case 1:
        feedback = 'Weak: Try adding uppercase letters';
        break;
      case 2:
        feedback = 'Fair: Try adding numbers';
        break;
      case 3:
        feedback = 'Good: Try adding special characters';
        break;
      case 4:
      case 5:
        feedback = 'Strong: Excellent password!';
        break;
      default:
        feedback = 'Unknown score';
    }
    
    return { score, feedback };
  };