
function f1()
{

}
var pass=core.getKeys("kb");
console.log(pass);
var output =core.setLib(pass,"a",f1);
console.log(output);
console.log(core.getLib("a"));
var output =core.setLib(pass,"a","B");
console.log(output);
console.log(core.getLib("a"));
var output =core.setLib("xx","a","B");
console.log(output);
console.log(core.getLib("a"));