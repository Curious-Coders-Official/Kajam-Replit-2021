class Utils {
  static anglePointToPoint(x1,y1,x2,y2){
    let deltaX = x2 - x1;
    let deltaY = y2 - y1;
    let ThetaRadians = Math.atan2(deltaY, deltaX);
    return ThetaRadians * 180/Math.PI
  }
}

module.exports = Utils;