window.addEventListener('DOMContentLoaded', (event) => {
const params = new URLSearchParams(window.location.search);
  if (params.has('prompt')) {
	  document.getElementById('prompt').value = params.get('prompt');
  }
  if (params.has('svg')) {
	  loadImage(params.get('svg'));
  }
  document.getElementById('seed').value = Math.floor(Math.random() * 1000000);
});

window.onload = function() {
  updateBudgetDisplay();
}

document.getElementById('prompt').addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
	  generateSVGs();
  }
});

function toggleSettings() {
  var settings = document.getElementById("settings");
  settings.style.display = (settings.style.display === "none" || settings.style.display === "") ? "flex" : "none";
}

function updateValue(id, displayId) {
  document.getElementById(displayId).textContent = document.getElementById(id).value;
}

async function imageLoaded() {}  // do nothing

async function fetchWithErrorHandling(url) {
  const response = await fetch(url);
  if (!response.ok) {
	  if (response.status === 402) {
	  throw new Error('Error: Daily generation budget exhausted. Request a free token by submitting the "Request Token" form. For this, press the Key button');
	  }
	  throw new Error(`Error: ${response.status} - ${response.statusText}`);
  }
  return response.json();
}

let isGenerating = false;
async function generateSVGs() {
  if (isGenerating) return;
  isGenerating = true;

  const token = document.getElementById('token').value;
  const prompt = document.getElementById('prompt').value;
  const n_iterations = document.getElementById('n_iterations').value;
  const n_samples = document.getElementById('n_samples').value;
  const detail_level = document.getElementById('detail_level').value;
  const style = document.getElementById('style').value;
  const seed = document.getElementById('seed').value;
  const width = document.getElementById('width').value;
  const height = document.getElementById('height').value;

  const imagePreview = document.getElementById('imagePreview');
  let url = '';
  if (imagePreview && imagePreview.tagName === 'IMG') {
	  imageUrl = imagePreview.src;
	  imageUrl = imageUrl.replace(/svg(?!stud)/g, 'png');
	  strength = document.getElementById('strength').value;
	  url = `/generate/?token=${encodeURIComponent(token)}&prompt=${encodeURIComponent(prompt)}&n_iterations=${n_iterations}&n_samples=${n_samples}&detail_level=${detail_level}&style=${style}&seed=${seed}&width=${width}&height=${height}&strength=${strength}&image_url=${encodeURIComponent(imageUrl)}`;
  } else {
	  url = `/generate/?token=${encodeURIComponent(token)}&prompt=${encodeURIComponent(prompt)}&n_iterations=${n_iterations}&n_samples=${n_samples}&detail_level=${detail_level}&style=${style}&seed=${seed}&width=${width}&height=${height}`;
  }
  
  if (!prompt) {
	  alert('Please enter a prompt.');
	  return;
  }

  const container = document.getElementById('svgContainer');
  for (let i = 0; i < n_samples; i++) {
	  const div = document.createElement('div');
	  div.className = 'svg-item';
	  div.innerHTML = `<div class="loadingIndicator" style="width: 300px; height: 300px">
						  <div style="display: flex; justify-content: center; align-items: center; height: 100%; font-size: 3rem;">
							  <i class="fas fa-spinner fa-spin"></i>
						  </div>
					   </div>`;
	  container.prepend(div);
  }

  try {
	  const svgUrls = await fetchWithErrorHandling(url);
	  // Remove loading indicators
	  for (let i = 0; i < n_samples; i++) {
		  container.removeChild(container.firstChild);
	  }
	  // Add generated SVGs
	  displaySVGs(svgUrls);
  } catch (error) {
	  alert('Failed to generate SVGs: ' + error.message);
	  container.innerHTML = '';  // Clear the loading indicators
  }
  updateBudgetDisplay();
  document.getElementById('seed').value = Math.floor(Math.random() * 1000000);
  isGenerating = false;
}

function displaySVGs(svgUrls) {
  const container = document.getElementById('svgContainer');
  svgUrls.forEach(url => {
	  const div = document.createElement('div');
	  div.className = 'svg-container';
	  div.setAttribute('onclick', 'toggleActions(this)');
	  div.classList.add('svg-item');
	  div.innerHTML = `<img src="${url}" alt="SVG Image" width="300">` +
						`<div class="svg-actions">
							<button onclick="window.location.href='/generator.html?svg=${url}"> <i class="fa-solid fa-wand-magic-sparkles"></i> Gene rate</button>
							<button onclick="window.location.href='/semantic_search.html?svg=${url}'"> <i class="fas fa-search"></i> Search</button>
							<button onclick="window.location.href='/svgedit.html?svg=${url}'"> <i class="fa fa-pencil" aria-hidden="true"></i> Edit</button>
							<button onclick="window.location.href='/uid/${url.split('/').pop().split('.')[0]}'"> <i class="fas fa-arrow-right"></i> View</button>
							<button onclick="bookmarkSVG('${url}')"> <i class="fa-solid fa-star"></i> Book mark</button>
						</div>`;
	  container.prepend(div);
  });
}

async function handleTokenRequest(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  try {
	const response = await fetch(form.action, {
	  method: form.method,
	  body: formData
	});
	const result = await response.json();
	if (response.ok) {
	  alert(result.message);
	} else {
	  alert(`Error: ${result.detail}`);
	}
  } catch (error) {
	alert(`Request failed: ${error.message}`);
  }
}