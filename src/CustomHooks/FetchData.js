import { useEffect, useState } from "react";
const useFetchLandPlotsData = () => {
  //const [landPlotsData, setlandPlotsData] = useState([]);
  return new Promise((success, fail) => {
    fetch('https://sampledata.elancoapps.com/data')
    .then((response) => response.json())
    .then((data) => {
      //setlandPlotsData(data);
      success(data[0]);
    })
    .catch((err) => {
      console.log(err.message);
      fail("FAILURE");
    });
  });
  //return landPlotsData;
}

export default useFetchLandPlotsData;
