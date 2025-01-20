export const validatePassword = (password) => {
    const minLength = 12;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
    return (
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumbers &&
      hasSpecialChar
    );
  };
  
  export const sanitizeInput = (data) => {
    const sanitized = {};
    for (const [key, value] of Object.entries(data)) {
      if (typeof value === 'string') {
        // Remove any potentially dangerous characters
        sanitized[key] = value.replace(/[<>]/g, '');
      } else {
        sanitized[key] = value;
      }
    }
    return sanitized;
  };