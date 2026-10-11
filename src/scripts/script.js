// Update fish state to server
window.updateFish = async function(fishNum, status, size, location, trash = 'none') {
  console.log('script.js updateFish');
  console.log(fishNum + status + size + location + trash);

  const encodedTrash = trash && trash !== 'none' ? `/${encodeURIComponent(trash)}` : '';
  const endpoint = `/update/${fishNum}/${status}/${size}/${encodeURIComponent(location)}${encodedTrash}`;

  await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  console.log('window.updateFish: fishnum: ' + fishNum + ' status: ' + status + ' size: ' + size + ' location: ' + location + ' trash: ' + trash);
};