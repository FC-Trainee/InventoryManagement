(function() {

	//setInterval(function () {alert("Hello");}, 3000);

	function Cart()	{
		this.final1=0;
		this.final2=0;
		this.flag=false;
		this.gdisc=Math.floor((Math.random() * 20) + 5);
		this.bdisc=Math.floor((Math.random() * 25) + 10);
	}
	
	var grocery=core.getLib("grocery");
	var beverages=core.getLib("beverages");

	var gtax=new grocery();
	var btax=new beverages();

	Cart.prototype.addBagInCart = function() {

			var a=core.getLib("cartTemplate");
			var ob1=core.getLib("obj");
			
			if (!this.flag)	{
				this.flag=true;
				a.renderTemplate();
			}
			else {
				a.cartContainerClear();
			}			
			
			var totalG=0;
			var totalB=0;
			var subkey;

			for(var key in ob1)	{

				if(key=="grocery" && ob1[key]!==null) {

					for(subkey in ob1[key])	{

						a.groceryItemDetails(ob1[key][subkey].id,ob1[key][subkey].name,ob1[key][subkey].price,ob1[key][subkey].quantity,(ob1[key][subkey].price)*(ob1[key][subkey].quantity));
					}
				}
				if(key=="bev" && ob1[key]!==null) {

					for(subkey in ob1[key])	{

						a.beverageItemDetails(ob1[key][subkey].id,ob1[key][subkey].name,ob1[key][subkey].price,ob1[key][subkey].quantity,(ob1[key][subkey].price)*(ob1[key][subkey].quantity));
					}
				}				
			}//end of for loop
	};

	Cart.prototype.discount = function(g, b) {

		this.gdisc=g;
		this.bdisc=b;
	};



	Cart.prototype.calculateAmount = function() {

		var a=core.getLib("cartTemplate");
		var ob1=core.getLib("obj");
		var reinit=core.getLib("reinitialize");
		var listener=core.getLib("AddDataEventLister");
		var getCart=core.getLib("getCart");

		var totalG=0;
		var totalB=0;
		var subkey;

		for(var key in ob1)	{

			if(key=="grocery" && ob1[key]!==null) {

				for(subkey in ob1[key])	{

					totalG=totalG+((ob1[key][subkey].price)*(ob1[key][subkey].quantity));
				}
			}
			if(key=="bev" && ob1[key]!==null) {

				for(subkey in ob1[key])	{

					totalB=totalB+((ob1[key][subkey].price)*(ob1[key][subkey].quantity));
				}
			}				
		}

		var disPrice;

		disPrice=totalG-((this.gdisc/100)*totalG);
		this.final1=Math.round(disPrice+((gtax.getVat()/100)*disPrice));
		a.groceryTextboxes(this.gdisc,gtax.getVat(), this.final1);

		disPrice=totalB-((this.bdisc/100)*totalB);
		this.final2=Math.round(disPrice+((btax.getVat()/100)*disPrice));
		this.final2=Math.round(this.final2+((btax.getAdditionalVat()/100)*this.final2));
		a.beverageTextboxes(this.bdisc, btax.getVat(), btax.getAdditionalVat(), this.final2);

		a.grandTotal(this.final1+this.final2);

		listener("checkoutButton",{click:function() { 
			getCart(ob1); 
			a.cartContainerClear();
			reinit.emptybags();
			}
		});
	};
			
	var z = core.getLib("cartTemplate");
	var  c= new Cart();
	z.init(c);

	var KEY = "";			
	KEY = core.getKeys("arnab");
	core.setLib(KEY, "cart", c);

})();//end of wrapper