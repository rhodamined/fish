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

function setLocationHighlight(activeLocation) {
  const normalizedActive = typeof activeLocation === 'string' ? activeLocation.trim() : '';

  quadrantEls.forEach((el) => {
    const isActive = el.dataset.location === normalizedActive;
    el.classList.toggle('active', isActive);
    const img = el.querySelector('.location-image');
    const label = el.dataset.location;
    const imagePath = getLocationImagePath(label);

    if (imagePath && img.getAttribute('src') !== imagePath) {
      img.setAttribute('src', imagePath);
    }
  });
}

async function refreshState() {
  try {
    const response = await fetch('/state');
    if (!response.ok) {
      throw new Error('Unable to load state');
    }

    const fishState = await response.json();
    const allLocations = fishState
      .map((fish) => fish && fish.location)
      .filter((location) => typeof location === 'string' && location && location !== 'none');

    const activeLocation = allLocations[0] || locationMap[0].label;
    setLocationHighlight(activeLocation);
  } catch (error) {
    console.error('Location dashboard refresh failed:', error);
    setLocationHighlight(locationMap[0].label);
  }
}

refreshState();
setInterval(refreshState, 1000);
