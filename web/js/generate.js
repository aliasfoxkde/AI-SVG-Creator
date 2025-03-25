document.addEventListener('DOMContentLoaded', function() {
	// Menu on small screens
	const menuIcon = document.getElementById('menu-icon');
	const menu = document.querySelector('.menu');
	menuIcon.addEventListener('click', function() {
		if (menu.style.display !== 'block') {
			menu.style.display = 'block'; 
			menuIcon.style.color = getComputedStyle(document.documentElement).getPropertyValue('--secondary-color');
		} else {
			menu.style.display = 'none';
			menuIcon.style.color = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
		};
	});
	
	// Login and Logout buttons
	var loginButton = document.getElementById('loginButton');
	var logoutButton = document.getElementById('logoutButton');

	if (loginButton) {
		loginButton.addEventListener('click', function() {
			window.location.href = '/login/huggingface';
		});
	}

	if (logoutButton) {
		logoutButton.addEventListener('click', function() {
			window.location.href = '/logout';
		});
	}
	// Sync Bookmarking
	response = fetch('/bookmarks/')
	if (response.ok) {
		data = response.json();
		window.bookmarks = data.bookmarks || [];
		localStorage.setItem('svgBookmarks', JSON.stringify(window.bookmarks));
	} else {
		window.bookmarks = JSON.parse(localStorage.getItem('svgBookmarks')) || [];
	}
});

function toggleActions(container) {
	// Close all other active SVG actions
	document.querySelectorAll('.svg-container').forEach(el => {
		if (el !== container) el.classList.remove('active');
	});

	// Toggle current container's active state
	container.classList.toggle('active');
}

/* Image Preview */
function showUrlInput() {
	const urlInputContainer = document.getElementById('urlInputContainer');
	if (urlInputContainer.style.display === 'none' || urlInputContainer.style.display === '') {
		urlInputContainer.style.display = 'flex';
	} else {
		urlInputContainer.style.display = 'none';
	}
}

function loadImage(imageUrl) {
	const imagePreviewContainer = document.getElementById('imagePreviewContainer');
	if (imageUrl) {
		imagePreviewContainer.innerHTML = `
			<img id="imagePreview" src="${imageUrl}" alt="Image Preview" style="width: 100%; height: 100%;">
			<i id="trashIcon" class="fas fa-trash-alt" style="display: block; cursor: pointer; font-size:1.25rem; color: var(--primary-color);" onclick="clearImage()"></i>`;
		document.getElementById('urlInputContainer').style.display = 'none';
		imageLoaded();
	} else {
		alert('Please enter a valid URL.');
	}
}

function clearImage() {
	const imagePreviewContainer = document.getElementById('imagePreviewContainer');
	const trashIcon = document.getElementById('trashIcon');
	imagePreviewContainer.innerHTML = `<i id="imagePreview" class="fas fa-image" title="Click to add image" style="font-size: 3rem; color: #ccc;"></i>`;
	trashIcon.style.display = 'none';
}