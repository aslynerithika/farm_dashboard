const API_SOIL_VARS = {
  1:"AVG_Humidity__",
  2:"PH", 
  3:"AVG_Light__", 
  4:"Temp_C"
};

function getPlotData(fetchedData, selectedLandPlot){
  var plotData = [];
  for(var i = 0; i < fetchedData.length; i++){
    if(fetchedData[i]["Plot"] == "plot"+selectedLandPlot){
      plotData.push(fetchedData[i]);
    }
  }
  return plotData;
}

function getSoilVarsAvg(plotData){
  var soilVarsTotal = {
    1 : 0,
    2 : 0,
    3 : 0,
    4 : 0
  }
  for(var i = 0; i < plotData.length; i++){
    for(var j = 1; j <= 4; j++){
      soilVarsTotal[j] += plotData[i][API_SOIL_VARS[j]];
    }
  }
  for(let i = 1; i <= 4; i++){
    soilVarsTotal[i] = (soilVarsTotal[i]/plotData.length);
    if(i != 2){
      soilVarsTotal[i] = Math.trunc(soilVarsTotal[i]);
    }else{
      soilVarsTotal[i] = soilVarsTotal[i].toFixed(1);
    }
  }
  return soilVarsTotal;
}

function getMonthDataFromPlot(data, selectedDate){
  var plotMonthData = [];
  for(var i = 0; i < data.length; i++){
    var month = data[i]["Date"].value.split("-")[1];
    if(month == selectedDate){
      plotMonthData.push(data[i]);
    }
  }
  return plotMonthData;
}

function getMaxAndMinValues(successData){
  var soilVariablesList = {
    1 : {min : null, max : null},
    2 : {min : null, max : null},
    3 : {min : null, max : null},
    4 : {min : null, max : null}
  };
  for(var i = 0; i < successData.length; i++){
    for(var j = 1; j <= Object.keys(soilVariablesList).length; j++){
      if(soilVariablesList[j].max == null || successData[i][API_SOIL_VARS[j]] > soilVariablesList[j].max){
        soilVariablesList[j].max = successData[i][API_SOIL_VARS[j]];
      }
      if(soilVariablesList[j].min == null || successData[i][API_SOIL_VARS[j]] < soilVariablesList[j].min){
        soilVariablesList[j].min = successData[i][API_SOIL_VARS[j]];
      }
    }
  }
  return soilVariablesList;
}

export {getPlotData, getMonthDataFromPlot, getSoilVarsAvg, getMaxAndMinValues};