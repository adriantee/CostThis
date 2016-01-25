// shut ie up
var alertFallback = true;
 if (typeof console === "undefined" || typeof console.log === "undefined") {
   console = {};
   if (alertFallback) {
       console.log = function(msg) {
            // alert(msg);
       };
   } else {
       console.log = function() {};
   }
 }
   
if(typeof String.prototype.trim !== 'function') {
 String.prototype.trim = function() {
   return this.replace(/^\s+|\s+$/g, ''); 
 };
}