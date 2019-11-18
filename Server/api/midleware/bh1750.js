var BH1750 = require('bh1750');
var light = new BH1750({
     address: 0x23,
    device: '/dev/i2c-1',
    command: 0x10,
    length: 2
});

console.log("BH1750");
 setInterval(function lightRead() {
light.readLight(function(err, value){
    if (err) {
        console.log("light error: " + err);
        throw err;
    } else {
        console.log("light value is: ", value, "lx");
    }
});
}, 15000);
module.exports.lightRead = lightRead;