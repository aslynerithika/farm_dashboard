const fetchLandPlotsData = () => {
  console.log("once");
  return new Promise((success, fail) => {
    fetch('https://sampledata.elancoapps.com/data')
    .then((response) => response.json())
    .then((data) => {
      success(data[0]);
    })
    .catch((err) => {
      console.log(err.message);
      fail("FAILURE");
    });
  });
}

export default fetchLandPlotsData();
