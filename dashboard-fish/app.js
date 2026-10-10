const quadrantEls = Array.from(document.querySelectorAll('.quadrant'));
const lastSizeByFish = new Map();

function getFishVideoPath(fishNumber) {
  return `/dashboard-fish/src/fish-${fishNumber}.mp4`;
}

function getScaleFromSize(size) {
  const numericSize = Number(size) || 0;
  return Math.min(2.2, Math.max(0.5, 0.7 + numericSize / 10));
}

function getRippleScale(size) {
  const numericSize = Number(size) || 0;
  return Math.min(8, Math.max(2.4, 2.4 + numericSize / 8));
}

function getRippleOpacity(size) {
  const numericSize = Number(size) || 0;
  return Math.min(1, Math.max(0.8, 0.8 + numericSize / 20));
}

function triggerRipple(el, size) {
  const rippleScale = getRippleScale(size);
  const rippleOpacity = getRippleOpacity(size);

  el.style.setProperty('--ripple-scale', String(rippleScale));
  el.style.setProperty('--ripple-opacity', '1');
  el.classList.remove('ripple-active');
  void el.offsetWidth;
  el.classList.add('ripple-active');

  window.clearTimeout(el._rippleTimer);
  el._rippleTimer = window.setTimeout(() => {
    el.classList.remove('ripple-active');
    el.style.setProperty('--ripple-opacity', '0');
  }, 500);
}

function populateQuadrant(el, fish) {
  const videoEl = el.querySelector('.fish-video');
  const fishNumber = Number(el.dataset.fish);
  const fishData = fish || { fish: fishNumber, status: 'none', size: 0, location: 'none' };
  const previousSize = lastSizeByFish.get(fishNumber);

  const videoPath = getFishVideoPath(fishNumber);
  if (videoEl.dataset.src !== videoPath) {
    videoEl.dataset.src = videoPath;
    videoEl.src = videoPath;
    videoEl.load();
    videoEl.loop = true;
    videoEl.muted = true;
    videoEl.playsInline = true;
    videoEl.autoplay = true;
    videoEl.addEventListener('ended', () => {
      videoEl.currentTime = 0;
      videoEl.play().catch(() => {});
    }, { once: true });
  }

  const fishScale = getScaleFromSize(fishData.size);
  videoEl.style.setProperty('--fish-scale', String(fishScale));
  videoEl.style.opacity = '1';
  videoEl.play().catch(() => {});

  const currentSize = Number(fishData.size || 0);
  const hasGrowth = previousSize !== undefined && currentSize > Number(previousSize);
  const shouldRipple = previousSize === undefined && currentSize > 0 ? true : hasGrowth;

  if (shouldRipple) {
    triggerRipple(el, fishData.size);
  }

  lastSizeByFish.set(fishNumber, currentSize);
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
      populateQuadrant(el, fish);
    });
  } catch (error) {
    console.error('Fish dashboard refresh failed:', error);
  }
}

refreshState();
setInterval(refreshState, 250);
