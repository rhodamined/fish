const quadrantEls = Array.from(document.querySelectorAll('.quadrant'));

function renderFishCard(fish) {
  const info = fish || { fish: 0, status: 'none', size: 0, location: 'none' };
  return [
    '<div class="fish-card">',
    '<div class="fish-name">Fish ' + String(info.fish) + '</div>',
    '<div class="fish-status">Status: ' + String(info.status) + '</div>',
    '<div class="fish-size">Size: ' + String(info.size) + '</div>',
    '<div class="fish-location">Location: ' + String(info.location) + '</div>',
    '</div>'
  ].join('');
}

async function refreshState() {
  try {
    const response = await fetch('/state');
    if (!response.ok) {
      throw new Error('Unable to load state');
    }

    const fishState = await response.json();
    const map = new Map(fishState.map((fish) => [Number(fish.fish), fish]));

    quadrantEls.forEach((el) => {
      const fishNumber = Number(el.dataset.fish);
      const fish = map.get(fishNumber) || { fish: fishNumber, status: 'none', size: 0, location: 'none' };
      el.innerHTML = renderFishCard(fish);
    });
  } catch (error) {
    console.error('Dashboard refresh failed:', error);
  }
}

refreshState();
setInterval(refreshState, 1000);
