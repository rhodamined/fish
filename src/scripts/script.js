// Update fish state to server
window.updateFish = async function(fishNum, status, size, location) {
  console.log('script.js updateFish');
  console.log(fishNum + status + size + location);
  let endpoint = `/update/${fishNum}/${status}/${size}/${location}`;

  await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    // body: JSON.stringify(obj)
  });
  console.log('window.updateFish: fishnum: ' + fishNum + ' status: ' + status + ' size: ' + size + ' location: ' + location);
  
};