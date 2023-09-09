export const validate = {
  email: (value: string) => {
    // Regular expression for email validation
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(value);
  },
  phone: (value: string) => {
    // Regular expression for phone number validation (10 digits)
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(value);
  },
  password: (value: string) => {
    // Regular expression for password validation (at least 8 characters with letters and numbers)
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(value);
  },
  notEmpty: (value: string) => {
    return value.trim() !== '';
  },
};

export function hash(input: string):string {
  let hash = 0;
  if (input.length === 0) return "asdfkla";

  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = (hash << 5) - hash + char;
  }

  return hash.toString(16); // Convert to hexadecimal representation
}
