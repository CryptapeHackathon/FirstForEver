function baseb64Encode (text) {
  return Base64.encode(text);
}

function baseb64Decode (text) {
  return Base64.decode(text);
}

// http://forums.devshed.com/javascript-development-115/convert-string-hex-674138.html
function strToHex(str) {
  var hex = '';
  for(var i=0;i<str.length;i++) {
    hex += ''+str.charCodeAt(i).toString(16);
  }
  return hex;
}

function hexToString (hex) {
    var string = '';
    for (var i = 0; i < hex.length; i += 2) {
      string += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    }
    return string;
}

// convert json object to hex
function jsonToHex (json) {
  var str = JSON.stringify(json);
  return strToHex(str);
}

function hexToJson(hex) {
  var str = hexToString(hex);
  var json = JSON.parse(str);
  return json;
}


/**
 * Convert a byte array to a hex string
 *
 * Note: Implementation from crypto-js
 *
 * @method bytesToHex
 * @param {Array} bytes
 * @return {String} the hex string
 */
function bytesToHex(bytes) {
    for (var hex = [], i = 0; i < bytes.length; i++) {
        /* jshint ignore:start */
        hex.push((bytes[i] >>> 4).toString(16));
        hex.push((bytes[i] & 0xF).toString(16));
        /* jshint ignore:end */
    }
    return '0x'+ hex.join("");
}
