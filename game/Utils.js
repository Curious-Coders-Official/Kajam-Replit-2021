class Utils {
  static anglePointToPoint(x1, y1, x2, y2) {
    let deltaX = x2 - x1;
    let deltaY = y2 - y1;
    let ThetaRadians = Math.atan2(deltaY, deltaX);
    return (ThetaRadians * 180) / Math.PI;
  }

  static VelToAngle(angle){
    return {x:-20, y:-20}
  }
}

module.exports = Utils;
