//document.addEventListener('DOMContentLoaded', () => {
//    const form = document.getElementById('edgeCaseForm');
//    const successEl = document.getElementById('form-success');
//
//    // State objects
//    const formData = {
//      name: '', email: '', phone: '',
//      message: '', gender: '',
//      hobbies: [], file: null,
//      birthdate: ''
//    };
//
//    // Utility to set error text
//    function setError(field, msg) {
//      document.getElementById(`error-${field}`).textContent = msg;
//    }
//
//    // Update formData on change
//    form.querySelectorAll('input, textarea').forEach(el => {
//      el.addEventListener('change', e => {
//        const { name, type, value, checked, files } = e.target;
//
//        if (type === 'checkbox') {
//          if (checked) {
//            formData.hobbies.push(value);
//          } else {
//            formData.hobbies = formData.hobbies.filter(h => h !== value);
//          }
//        }
//        else if (type === 'radio') {
//          formData.gender = value;
//        }
//        else if (type === 'file') {
//          formData.file = files[0] || null;
//        }
//        else {
//          formData[name] = value;
//        }
//      });
//    });
//
//    // Form validation logic
//    function validateForm() {
//      let valid = true;
//      // Name
//      if (!formData.name || formData.name.length > 100) {
//        setError('name', 'Name is required and must be less than 100 characters.');
//        valid = false;
//      } else setError('name', '');
//
//      // Email
//      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
//      if (!emailPattern.test(formData.email)) {
//        setError('email', 'Please enter a valid email address.');
//        valid = false;
//      } else setError('email', '');
//
//      // Phone
//      if (formData.phone && !/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/.test(formData.phone)) {
//        setError('phone', 'Phone number must match the format 123-456-7890.');
//        valid = false;
//      } else setError('phone', '');
//
//      // Message
//      if (formData.message.length > 1000) {
//        setError('message', 'Message is too long. Maximum 1000 characters.');
//        valid = false;
//      } else setError('message', '');
//
//      // Gender
//      if (!formData.gender) {
//        setError('gender', 'Please select a gender.');
//        valid = false;
//      } else setError('gender', '');
//
//      // Hobbies
//      if (formData.hobbies.length === 0) {
//        setError('hobbies', 'Please select at least one hobby.');
//        valid = false;
//      } else setError('hobbies', '');
//
//      // File
//      if (formData.file) {
//        const { type, size } = formData.file;
//        if (!type.match('image.*') && !type.match('pdf')) {
//          setError('file', 'Please upload an image (JPG/PNG) or PDF file.');
//          valid = false;
//        }
//        else if (size > 5_000_000) {
//          setError('file', 'File size must be less than 5MB.');
//          valid = false;
//        } else {
//          setError('file', '');
//        }
//      } else {
//        setError('file', '');
//      }
//
//      // Birthdate
//      if (formData.birthdate && new Date(formData.birthdate) > new Date()) {
//        setError('birthdate', 'Date of birth cannot be in the future.');
//        valid = false;
//      } else setError('birthdate', '');
//
//      return valid;
//    }
//
//    // Handle submit
//    form.addEventListener('submit', e => {
//      e.preventDefault();
//      successEl.textContent = '';
//
//      if (validateForm()) {
//        successEl.textContent = 'Form submitted successfully!';
//        console.log('Form data:', formData);
//        // here you could send `formData` via fetch(), etc.
//      }
//    });
//  });
