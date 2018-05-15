var canvas = new fabric.Canvas('canvas');
const rotateAngleDegree = 315;
const X_ORIGIN = 400;
const Y_ORIGIN = 400;
const CELL_NO_ROW = 4;
const CELL_NO_COL = 2;
const CELL_WIDTH = 100;
const CELL_HEIGHT = 40;

function DGR2RAD(a){
  return a * Math.PI / 180;
}
const rotateAngleGradian = DGR2RAD(rotateAngleDegree);

generatePosition();

// var blob = new Blob([JSON.stringify(result)], {type: "text/plain;charset=utf-8"});
// saveAs(blob, "case3.txt");

function generatePosition() {
  const result = {
    arr: [[]]
  };
  generatePoint(result);

  var rect = new fabric.Rect({
    left: X_ORIGIN,
    top: Y_ORIGIN,
    stroke: 'red',
    strokeWidth: 1,
    opacity: 0.8,
    fill: "blue",
    width: CELL_WIDTH,
    height: CELL_HEIGHT,
    angle: rotateAngleDegree
  });

  var rect2 = new fabric.Rect({
    left: X_ORIGIN,
    top: Y_ORIGIN,
    stroke: 'red',
    strokeWidth: 1,
    opacity: 0.8,
    fill: "red",
    width: 2,
    height: 2,
    angle: 0
  });
  canvas.add(rect);
  canvas.add(rect2);

  for (var i = 0; i < result.arr.length; ++i) {
    var x = result.arr[i][0];
    var y = result.arr[i][1];

    var rect = new fabric.Rect({
      left: x,
      top: y,
      stroke: 'black',
      strokeWidth: 1,
      opacity: 0.8,
      fill: "black",
      width: 3,
      height: 3,
      angle: 0,
    });
    canvas.add(rect);
  }
  canvas.renderAll();
  console.log(result);
}


function generatePoint(result) {
  var diagonal = Math.sqrt(CELL_WIDTH * CELL_WIDTH + CELL_HEIGHT * CELL_HEIGHT);
  var OrAng = Math.acos(CELL_WIDTH/diagonal);
  var convertOrAngToDgr = 180 * OrAng / Math.PI;

  var halfOfDiagonal = diagonal / 2;
  var Xcenter = X_ORIGIN + halfOfDiagonal * Math.cos(DGR2RAD(rotateAngleDegree + convertOrAngToDgr));
  var Ycenter = Y_ORIGIN + halfOfDiagonal * Math.sin(DGR2RAD(rotateAngleDegree + convertOrAngToDgr));
  // result.arr.push([Xcenter,Ycenter]);

  var widthProject = CELL_WIDTH * Math.sin(DGR2RAD(rotateAngleDegree));
  var heightProject = CELL_HEIGHT * Math.cos(DGR2RAD(rotateAngleDegree));
  if(rotateAngleDegree >=0 && rotateAngleDegree <= 90){
    var Y_Shift = widthProject + heightProject;
    Ycenter = Ycenter - Y_Shift/2;
  }
  if(rotateAngleDegree >90 && rotateAngleDegree <= 180){
    var Y_Shift = Math.abs(widthProject) + Math.abs(heightProject);
    Ycenter = Ycenter - Y_Shift/2;
  }
  if(rotateAngleDegree > 180 && rotateAngleDegree <= 270 ){
    var Y_Shift = widthProject + heightProject;
    Ycenter = Ycenter + Y_Shift/2;
  }
  if(rotateAngleDegree >270 && rotateAngleDegree <= 360){
    var Y_Shift = Math.abs(widthProject) + Math.abs(heightProject);
    Ycenter = Ycenter - Y_Shift/2;
  }



  result.arr.push([Xcenter,Ycenter]);


}


