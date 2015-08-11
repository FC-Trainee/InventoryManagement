
(function() {
	var flag = false;
	var data = {grocery:[], bev:[]};
	var item = [];
	var productInfoTemp = core.getLib("productInfoTemp");
	var AddDataEventLister = core.getLib("AddDataEventLister");
	
	function getCart(obj) {

		productInfoTemp.template();

		if(!flag) {		
			productInfoTemp.exportBtn();
			AddDataEventLister("xp", {click : exportAll});	
			flag = true;
		}
		for (var i in obj.grocery) {

			productInfoTemp.groceryDetails(obj.grocery[i].id,obj.grocery[i].name,obj.grocery[i].price,obj.grocery[i].quantity,5);
			data.grocery.push(obj.grocery[i]);
		}
		for (var j in obj.bev) {

			productInfoTemp.beverageDetails(obj.bev[j].id,obj.bev[j].name,obj.bev[j].price,obj.bev[j].quantity,10);
			data.bev.push(obj.bev[j]);
		}
		item.push(JSON.stringify(obj,null,4));

	}

	function exportJson(id) {
		console.log(item[id-1]);
	}
	function exportAll() {
		console.log(JSON.stringify(data,null,4));
	}

	var KEY = "";			
	KEY = core.getKeys("subhasis");
	core.setLib(KEY, "getCart", getCart);
	core.setLib(KEY, "exportJson", exportJson);
	core.setLib(KEY, "exportAll", exportAll);
})();
