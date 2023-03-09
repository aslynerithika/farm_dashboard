import { useEffect, useState } from "react";
const useFetchLandPlotsData = () => {
  const [landPlotsData, setlandPlotsData] = useState([]);
  useEffect(() => {
    fetch('https://sampledata.elancoapps.com/data')
    .then((response) => response.json())
    .then((data) => {
      setlandPlotsData(data);
    })
    .catch((err) => {
      console.log(err.message);
    });
  }, []);
  return landPlotsData;
}

export default useFetchLandPlotsData;
