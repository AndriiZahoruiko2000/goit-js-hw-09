const STORAGE_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');

let formData = {
  email: '',
  message: '',
};

// =================================================

document.addEventListener('DOMContentLoaded', () => {
  const saved = loadFromLS(STORAGE_KEY);
  if (saved) {
    form.elements.email.value = saved.email || '';
    form.elements.message.value = saved.message || '';
    formData = saved;
  }

  form.addEventListener('submit', handleFormSubmit);
  form.addEventListener('input', handleFormInput);
});

// =================================================

function handleFormSubmit(e) {
  e.preventDefault();

  formData.email = form.elements.email.value;
  formData.message = form.elements.message.value;

  if (
    form.elements.email.value.trim() === '' ||
    form.elements.message.value.trim() === ''
  ) {
    alert('Filled all the fileds');
    return;
  }

  console.log('Sended', formData);

  localStorage.removeItem(STORAGE_KEY);
  formData.email = '';
  formData.message = '';
  form.reset();
}

// =================================================

function handleFormInput(e) {
  formData.email = form.elements.email.value;
  formData.message = form.elements.message.value;
  saveToLS(STORAGE_KEY, formData);
}

// =================================================

function saveToLS(key, value) {
  const zip = JSON.stringify(value);
  localStorage.setItem(key, zip);
}

function loadFromLS(key) {
  const zip = localStorage.getItem(key);
  if (!zip) return null;
  return JSON.parse(zip);
}
