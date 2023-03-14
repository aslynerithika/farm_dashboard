import { useEffect, useState } from "react";
const fetchLandPlotsData = () => {
  //const [landPlotsData, setlandPlotsData] = useState([]);
  console.log("once");
  return new Promise((success, fail) => {
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then((response) => response.json())
    .then((data) => {
      //setlandPlotsData(data);
      success(data); //       success(data[0]); WITH elanco data
    })
    .catch((err) => {
      console.log(err.message);
      fail("FAILURE");
    });
  });
  //return landPlotsData;
}

export default fetchLandPlotsData();
