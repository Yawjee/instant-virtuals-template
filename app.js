const input = document.getElementById('imageInput');
const preview = document.getElementById('preview');
const dropzone = document.getElementById('dropzone');
const extractBtn = document.getElementById('extractBtn');
const ocrText = document.getElementById('ocrText');
const output = document.getElementById('probabilityOutput');

input.addEventListener('change', () => {
  const file = input.files && input.files[0];
  if (!file) return;
  if (!file.type.startsWith('image/')) {
    alert('Please choose a PNG, JPG, or WebP image.');
    input.value = '';
    return;
  }
  const reader = new FileReader();
  reader.onload = () => {
    preview.src = reader.result;
    preview.hidden = false;
    const strong = dropzone.querySelector('strong');
    strong.textContent = file.name;
  };
  reader.readAsDataURL(file);
});

extractBtn.addEventListener('click', async () => {
  const file = input.files && input.files[0];
  if (!file) {
    alert('Choose a screenshot first.');
    return;
  }
  if (!window.Tesseract) {
    alert('OCR library did not load. Check your internet connection and try again.');
    return;
  }
  extractBtn.disabled = true;
  extractBtn.textContent = 'Reading screenshot…';
  try {
    const result = await Tesseract.recognize(file, 'eng', {
      logger: message => {
        if (message.status === 'recognizing text') {
          extractBtn.textContent = `Reading screenshot… ${Math.round((message.progress || 0) * 100)}%`;
        }
      }
    });
    ocrText.value = (result.data.text || '').trim();
    if (!ocrText.value) ocrText.value = 'No readable text found. Try a clearer screenshot or type the match details manually.';
  } catch (error) {
    alert('OCR failed. Try a clearer image or enter the details manually.');
  } finally {
    extractBtn.disabled = false;
    extractBtn.innerHTML = 'Extract screenshot text <span>→</span>';
  }
});

document.getElementById('calcBtn').addEventListener('click', () => {
  const names = ['Home', 'Draw', 'Away'];
  const ids = ['homeOdds', 'drawOdds', 'awayOdds'];
  const odds = ids.map(id => Number(document.getElementById(id).value));
  if (odds.some(value => !Number.isFinite(value) || value <= 1)) {
    output.innerHTML = '<div class="empty-state"><span>!</span><b>Check the odds</b><small>Enter valid decimal odds greater than 1.00 in all three fields.</small></div>';
    return;
  }
  const raw = odds.map(value => 1 / value);
  const total = raw.reduce((sum, value) => sum + value, 0);
  const probabilities = raw.map(value => value / total * 100);
  output.innerHTML = probabilities.map((probability, index) =>
    `<div class="prob-row"><span>${names[index]}</span><div class="bar"><span style="width:${probability.toFixed(1)}%"></span></div><strong>${probability.toFixed(1)}%</strong></div>`
  ).join('') + '<p class="microcopy">Normalized implied probabilities from the odds you entered. This removes the bookmaker margin proportionally; it is not a guarantee or a model of the virtual football RNG.</p>';
});
