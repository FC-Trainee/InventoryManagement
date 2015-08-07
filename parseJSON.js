//Dummy Data for the main cart
/*var data = {
	"grocery":[{
			"id":"r1",
			"name":"rice",
			"price":"60",
			"quantity":"4"
		},
		{
			"id":"o1",
			"name":"oil",
			"price":"100",
			"quantity":"2"
		}], 
		
	"beverage":[{
			"id":"p1",
			"name":"pepsi",
			"price":"25",
			"quantity":"1"
		},
		{
			"id":"t1",
			"name":"tropicana",
			"price":"80",
			"quantity":"3"
		}]
};*/

// getCart(data);

(function() {

	var productInfoTemp = core.getLib("productInfoTemp");
	function getCart(obj) {
		// console.log(obj);
		productInfoTemp.template();
		for (var i in obj.grocery) {
			// console.log(obj.grocery[i]);
			productInfoTemp.groceryDetails(obj.grocery[i].id,obj.grocery[i].name,obj.grocery[i].price,obj.grocery[i].quantity,5);
		}
		for (var i in obj.bev) {
			// console.log(obj.bev[i]);
			productInfoTemp.beverageDetails(obj.bev[i].id,obj.bev[i].name,obj.bev[i].price,obj.bev[i].quantity,10);
		}
	};
	/*this.appendCart = function (dataString) {
		for (var i in dataString.grocery.items){
			data.grocery.items.push(dataString.grocery.items[i]);
		}
		for (var j in dataString.beverage.items){
			data.beverage.items.push(dataString.beverage.items[j]);
		}
		for (var type in dataString) {
			data[type].discount = dataString[type].discount;
		}
		console.log(JSON.stringify(data));
	}*/
	var KEY = "";			
	KEY = core.getKeys("subhasis");
	core.setLib(KEY, "getCart", getCart);

})();


//Dummy data for appending each time
/*var data1 = {
	"grocery":{
		"items":[{
			"id":"s1",
			"name":"soyabean",
			"price":"40",
			"quantity":"2"
		}], 
		"discount":"15%"
	},
	"beverage":{
		"items":[{
			"id":"s1",
			"name":"sprite",
			"price":"25",
			"quantity":"1"
		},
		{
			"id":"f1",
			"name":"frooti",
			"price":"15",
			"quantity":"3"
		}], 
		"discount":"20%"
	}
};
*/
// var obj = new ProcessCartItems();
// obj.appendCart(data1);