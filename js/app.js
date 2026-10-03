function isValidStudentNumber(value) {
  if (typeof value !== 'string') return false;
  const trimmed = value.trim();
  const regex = /^\d{2}-\d{4}-\d{3}$/;
  return regex.test(trimmed);
}

function isValidPassword(value) {
  if (typeof value !== 'string') return false;
  const hasMinLength = value.length >= 8;
  const hasUppercase = /[A-Z]/.test(value);
  const hasDigit = /\d/.test(value);
  const hasSpecialChar = /[@$!]/.test(value);
  const hasNoWhitespace = /^\S+$/.test(value);

  return hasMinLength && hasUppercase && hasDigit && hasSpecialChar && hasNoWhitespace;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    isValidStudentNumber,
    isValidPassword
  };
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    
    const fullNameInput = document.getElementById('fullName');
    const studentNumberInput = document.getElementById('studentNumber');
    const emailInput = document.getElementById('email');
    const mobileNumberInput = document.getElementById('mobileNumber');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const courseSelect = document.getElementById('course');
    const termsCheckbox = document.getElementById('terms');

    const fullNameError = document.getElementById('fullNameError');
    const studentNumberError = document.getElementById('studentNumberError');
    const emailError = document.getElementById('emailError');
    const mobileNumberError = document.getElementById('mobileNumberError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    const courseError = document.getElementById('courseError');
    const termsError = document.getElementById('termsError');

    const passwordFeedback = document.getElementById('passwordFeedback');
    const successMessage = document.getElementById('successMessage');
    const registrationSummary = document.getElementById('registrationSummary');

    const summaryName = document.getElementById('summaryName');
    const summaryStudentNumber = document.getElementById('summaryStudentNumber');
    const summaryEmail = document.getElementById('summaryEmail');
    const summaryMobileNumber = document.getElementById('summaryMobileNumber');
    const summaryCourse = document.getElementById('summaryCourse');

    function setError(inputElement, errorElement, message) {
      if (inputElement) {
        inputElement.setAttribute('aria-invalid', 'true');
      }
      if (errorElement) {
        errorElement.textContent = message;
      }
    }

    function clearError(inputElement, errorElement) {
      if (inputElement) {
        inputElement.setAttribute('aria-invalid', 'false');
      }
      if (errorElement) {
        errorElement.textContent = '';
      }
    }

    function validateFullName() {
      const value = fullNameInput.value.trim();
      if (!value) {
        setError(fullNameInput, fullNameError, 'Full name is required.');
        return false;
      }
      if (value.length < 2) {
        setError(fullNameInput, fullNameError, 'Full name must be at least 2 characters.');
        return false;
      }
      clearError(fullNameInput, fullNameError);
      return true;
    }

    function validateStudentNumber() {
      const value = studentNumberInput.value.trim();
      if (!value) {
        setError(studentNumberInput, studentNumberError, 'Student number is required.');
        return false;
      }
      if (!isValidStudentNumber(value)) {
        setError(studentNumberInput, studentNumberError, 'Enter a student number in the format 24-1234-123.');
        return false;
      }
      clearError(studentNumberInput, studentNumberError);
      return true;
    }

    function validateEmail() {
      const value = emailInput.value.trim();
      if (!value) {
        setError(emailInput, emailError, 'Email address is required.');
        return false;
      }
      const emailRegex = /^\S+@\S+\.\S+$/;
      if (!emailRegex.test(value)) {
        setError(emailInput, emailError, 'Please enter a valid email address.');
        return false;
      }
      clearError(emailInput, emailError);
      return true;
    }

    function validateMobileNumber() {
      const value = mobileNumberInput.value.trim();
      if (!value) {
        setError(mobileNumberInput, mobileNumberError, 'Mobile number is required.');
        return false;
      }
      const mobileRegex = /^(09\d{9}|\+639\d{9})$/;
      if (!mobileRegex.test(value)) {
        setError(mobileNumberInput, mobileNumberError, 'Enter a valid mobile number (e.g., 09123456789 or +639123456789).');
        return false;
      }
      clearError(mobileNumberInput, mobileNumberError);
      return true;
    }

    function validatePassword() {
      const value = passwordInput.value;
      if (!value) {
        setError(passwordInput, passwordError, 'Password is required.');
        return false;
      }
      if (!isValidPassword(value)) {
        setError(passwordInput, passwordError, 'Password does not meet all requirement criteria.');
        return false;
      }
      clearError(passwordInput, passwordError);
      return true;
    }

    function validateConfirmPassword() {
      const password = passwordInput.value;
      const confirmPassword = confirmPasswordInput.value;

      if (!confirmPassword) {
        setError(confirmPasswordInput, confirmPasswordError, 'Please confirm your password.');
        return false;
      }
      if (confirmPassword !== password) {
        setError(confirmPasswordInput, confirmPasswordError, 'Passwords do not match.');
        return false;
      }
      clearError(confirmPasswordInput, confirmPasswordError);
      return true;
    }

    function validateCourse() {
      const value = courseSelect.value;
      if (value !== 'BSIT' && value !== 'BSCS') {
        setError(courseSelect, courseError, 'Please select a valid course (BSIT or BSCS).');
        return false;
      }
      clearError(courseSelect, courseError);
      return true;
    }

    function validateTerms() {
      if (!termsCheckbox.checked) {
        setError(termsCheckbox, termsError, 'You must agree to the terms and conditions.');
        return false;
      }
      clearError(termsCheckbox, termsError);
      return true;
    }

    fullNameInput.addEventListener('blur', validateFullName);

    passwordInput.addEventListener('input', () => {
      const val = passwordInput.value;
      if (isValidPassword(val)) {
        passwordFeedback.textContent = 'Password meets all rules.';
        passwordFeedback.style.color = 'green';
      } else {
        passwordFeedback.textContent = 'Password must be 8+ chars, contain 1 uppercase, 1 digit, 1 special char (@, $, !), and no spaces.';
        passwordFeedback.style.color = 'darkorange';
      }
      if (passwordError.textContent) validatePassword();
      if (confirmPasswordInput.value) validateConfirmPassword();
    });

    confirmPasswordInput.addEventListener('input', () => {
      if (confirmPasswordError.textContent) validateConfirmPassword();
    });

    courseSelect.addEventListener('change', validateCourse);
    termsCheckbox.addEventListener('change', validateTerms);

    form.addEventListener('reset', () => {
      const inputs = [fullNameInput, studentNumberInput, emailInput, mobileNumberInput, passwordInput, confirmPasswordInput, courseSelect, termsCheckbox];
      const errors = [fullNameError, studentNumberError, emailError, mobileNumberError, passwordError, confirmPasswordError, courseError, termsError];

      inputs.forEach(input => input.setAttribute('aria-invalid', 'false'));
      errors.forEach(err => err.textContent = '');

      passwordFeedback.textContent = '';
      successMessage.textContent = '';
      
      registrationSummary.hidden = true;
      summaryName.textContent = '';
      summaryStudentNumber.textContent = '';
      summaryEmail.textContent = '';
      summaryMobileNumber.textContent = '';
      summaryCourse.textContent = '';
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const isNameValid = validateFullName();
      const isStudentNumValid = validateStudentNumber();
      const isEmailValid = validateEmail();
      const isMobileValid = validateMobileNumber();
      const isPasswordValid = validatePassword();
      const isConfirmValid = validateConfirmPassword();
      const isCourseValid = validateCourse();
      const isTermsValid = validateTerms();

      const isFormValid = isNameValid && isStudentNumValid && isEmailValid &&
                          isMobileValid && isPasswordValid && isConfirmValid &&
                          isCourseValid && isTermsValid;

      if (isFormValid) {
        successMessage.textContent = 'Registration details validated successfully!';
        
        summaryName.textContent = fullNameInput.value.trim();
        summaryStudentNumber.textContent = studentNumberInput.value.trim();
        summaryEmail.textContent = emailInput.value.trim();
        summaryMobileNumber.textContent = mobileNumberInput.value.trim();
        summaryCourse.textContent = courseSelect.value;

        registrationSummary.hidden = false;
      } else {
        successMessage.textContent = '';
        registrationSummary.hidden = true;
      }
    });
  });
}