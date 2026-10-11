const quadrantEls = Array.from(document.querySelectorAll('.quadrant'));

const trashMap = [
  { label: 'bike wheel', file: 'bike wheel.png' },
  { label: 'plastic bottle', file: 'plastic bottle.jpeg' },
  { label: 'can of Sprite', file: 'can of Sprite.png' },
  { label: 'hoof of a dead horse', file: 'hoof of a dead horse.jpeg' },
  { label: 'hubcap', file: 'hubcap.jpg' },
  { label: 'metal detector', file: 'metal detector.jpeg' },
  { label: 'beer bottle', file: 'beer bottle.jpg' },
  { label: 'beer can', file: 'beer can.png' },
  { label: 'styrofoam takeout container', file: 'styrofoam takeout container.jpeg' },
  { label: 'bamboo plant', file: 'bamboo plant.jpeg' },
  { label: 'broken flower pot', file: 'broken flower pot.jpeg' },
  { label: 'plastic bag', file: 'plastic bag.png' },
  { label: 'saran wrapper', file: 'saran wrapper.jpeg' },
  { label: 'gatorade bottle', file: 'gatorade bottle.png' },
  { label: 'cigarette box', file: 'cigarette box.jpg' },
  { label: 'dog toy', file: 'dog toy.jpg' },
  { label: 'tennis ball', file: 'tennis ball.jpeg' },
  { label: 'nalgene bottle', file: 'Nalgene bottle.jpg' },
  { label: 'single airpod', file: 'single airpod.jpg' },
  { label: 'scissors', file: 'scissors.png' },
  { label: 'syringe', file: 'syringe.png' },
  { label: 'rusty nails', file: 'rusty nails.png' },
  { label: 'lettuce', file: 'lettuce.png' },
  { label: 'lox bagel', file: 'lox bagel.png' },
  { label: 'bikini bottoms', file: 'bikini bottoms.png' },
  { label: 'wraparound sunglasses', file: 'wraparound sunglasses.png' },
  { label: 'a bag of marshmallows', file: 'an empty bag of marshmallows.png' },
  { label: 'a playbill', file: 'a playbill.png' },
  { label: 'shard of glass', file: 'shard of glass.png' },
  { label: 'a 7-11 slurpee', file: 'a 7eleven slurpee.png' },
  { label: 'pint of ben n jerrys phish food', file: 'a pint of ben & jerrys phish food.png' },
  { label: 'a can of fancy feast', file: 'a can of fancy feast.png' },
  { label: 'chopped cheese in tinfoil', file: 'chopped cheese wrapped in tinfoil.png' },
  { label: 'sneakers', file: 'sneakers.png' },
  { label: 'a funhouse mirror that makes you really looooong', file: 'funhouse-mirror.png' },
  { label: 'a grand piano', file: 'a grand piano.png' },
  { label: 'citibike', file: 'citibike.png' },
  { label: 'umbilical cord', file: 'umbilical cord.png' }
];

function normalizeTrashLabel(value) {
  return String(value || '').trim().toLowerCase();
}

function getTrashImagePath(label) {
  const normalized = normalizeTrashLabel(label);
  const match = trashMap.find((item) => normalizeTrashLabel(item.label) === normalized);
  if (!match) {
    return '';
  }

  return `/dashboard-food/src/${encodeURIComponent(match.file)}`;
}

function updateQuadrant(quadrant, fish) {
  const fishNumber = Number(fish?.fish ?? quadrant.dataset.fish ?? 0);
  const trash = typeof fish?.trash === 'string' ? fish.trash.trim() : '';
  const label = trash && trash !== 'none' ? trash : '';
  const hasTrash = Boolean(label);
  const img = quadrant.querySelector('.trash-image');
  const labelEl = quadrant.querySelector('.trash-label');

  if (!hasTrash) {
    img.removeAttribute('src');
    img.setAttribute('alt', '');
    labelEl.textContent = '';
    return;
  }

  const imagePath = getTrashImagePath(label);
  if (imagePath) {
    img.setAttribute('src', imagePath);
  }
  img.setAttribute('alt', label);
  labelEl.textContent = `Fish ${fishNumber}: ${label}`;
}

function setFoodState(fishState) {
  quadrantEls.forEach((quadrant) => {
    const fishNumber = Number(quadrant.dataset.fish || 0);
    const fish = fishState.find((entry) => Number(entry.fish) === fishNumber)
      || { fish: fishNumber, trash: 'none' };

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
    setFoodState(Array.isArray(fishState) ? fishState : []);
  } catch (error) {
    console.error('Food dashboard refresh failed:', error);
    setFoodState([]);
  }
}

refreshState();
setInterval(refreshState, 250);
