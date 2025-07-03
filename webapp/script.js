// Initialize Supabase
const supabase = supabase.createClient(
  'https://YOUR_SUPABASE_PROJECT.supabase.co',
  'PUBLIC_ANON_KEY'
);

const loginBtn = document.getElementById('login-btn');
const uploadSection = document.getElementById('upload-section');
const photoInput = document.getElementById('photo-input');
const processBtn = document.getElementById('process-btn');
const resultsDiv = document.getElementById('results');

let currentUser = null;

async function login() {
  const { user, error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
  if (error) {
    alert('Authentication error');
  } else {
    currentUser = user;
    uploadSection.hidden = false;
  }
}

loginBtn.addEventListener('click', login);

async function enhanceImages() {
  const files = photoInput.files;
  if (!files.length) {
    return alert('Please select images');
  }
  if (files.length > 5) {
    return alert('You can upload up to 5 images');
  }
  const formData = new FormData();
  Array.from(files).forEach((file) => formData.append('photos', file));

  const response = await fetch('/api/enhance', {
    method: 'POST',
    body: formData,
  });

  const data = await response.json();
  resultsDiv.innerHTML = '';
  data.images.forEach((url) => {
    const img = document.createElement('img');
    img.src = url;
    resultsDiv.appendChild(img);
  });
}

processBtn.addEventListener('click', enhanceImages);
