class Utils {
  static anglePointToPoint(x1,y1,x2,y2){
    let x = x2-x1;
    let y = y2-y1;
    return Math.atan2(y,x) * 180/Math.PI;
  }
}

module.exports = Utils;