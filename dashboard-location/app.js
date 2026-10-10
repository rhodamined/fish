const quadrantEls = Array.from(document.querySelectorAll('.quadrant'));

const locationMap = [
  { label: 'the East River Esplanade', file: 'the East River Esplanade.png' },
  { label: 'Brooklyn Bridge Park', file: 'Brooklyn Bridge Park.png' },
  { label: 'the parking lot behind the Astoria Costco', file: 'the parking lot behind the Astoria Costco.png' },
  { label: 'Queensbridge Park', file: 'Queensbridge Park.png' }
];

function getLocationImagePath(label) {
  const match = locationMap.find((item) => item.label === label);
  if (!match) {
    return '';
  }

  return `/dashboard-location/src/${encodeURIComponent(match.file)}`;
}

function updateQuadrant(quadrant, fish) {
  const fishNumber = Number(fish?.fish ?? quadrant.dataset.fish ?? 0);
  const location = typeof fish?.location === 'string' ? fish.location.trim() : '';
  const hasLocation = Boolean(location) && location !== 'none';
  const img = quadrant.querySelector('.location-image');
  const labelEl = quadrant.querySelector('.location-label');

  quadrant.classList.toggle('active', hasLocation);
  quadrant.classList.toggle('empty', !hasLocation);

  if (!hasLocation) {
    img.removeAttribute('src');
    img.setAttribute('alt', '');
    labelEl.textContent = '';
    return;
  }

  const imagePath = getLocationImagePath(location);
  if (imagePath) {
    img.setAttribute('src', imagePath);
  }
  img.setAttribute('alt', location);
  labelEl.textContent = `Fish ${fishNumber}: ${location}`;
}

function setLocationState(fishState) {
  quadrantEls.forEach((quadrant) => {
    const fishNumber = Number(quadrant.dataset.fish || 0);
    const fish = fishState.find((entry) => Number(entry.fish) === fishNumber)
      || { fish: fishNumber, location: 'none' };

    updateQuadrant(quadrant, fish);
  });
}

async function refreshState() {
  try {
    const response = await fetch('/state');
    if (!response.ok) {
      throw new Error('Unable to load state');
    }

    const fishState = await response.json();
    setLocationState(Array.isArray(fishState) ? fishState : []);
  } catch (error) {
    console.error('Location dashboard refresh failed:', error);
    setLocationState([]);
  }
}

refreshState();
setInterval(refreshState, 250);
