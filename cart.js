(function() {

	function Cart()	{
		this.final1=0;
		this.final2=0;
		this.flag=false;
	}
	
	var grocery=core.getLib("grocery");
	var beverages=core.getLib("beverages");

	var gtax=new grocery();
	var btax=new beverages();

	Cart.prototype= {

		addBagInCart : function() {

			var a=core.getLib("cartTemplate");
			var ob1=core.getLib("obj");
			
			if (!this.flag)	{
				this.flag=true;
				a.renderTemplate();
				//{click:function(){ return function(){ getCart(ob1);};}}
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
						totalG=totalG+((ob1[key][subkey].price)*(ob1[key][subkey].quantity));
					}
				}
				if(key=="bev" && ob1[key]!==null) {

					for(subkey in ob1[key])	{

						a.beverageItemDetails(ob1[key][subkey].id,ob1[key][subkey].name,ob1[key][subkey].price,ob1[key][subkey].quantity,(ob1[key][subkey].price)*(ob1[key][subkey].quantity));
						totalB=totalB+((ob1[key][subkey].price)*(ob1[key][subkey].quantity));
					}
				}				
				}//end of for loop
				
				var disPrice;

				disPrice=totalG-((5/100)*totalG);
				this.final1=Math.round(disPrice+((gtax.getVat()/100)*disPrice));
				a.groceryTextboxes(5,gtax.getVat(), this.final1);

				disPrice=totalB-((5/100)*totalB);
				this.final2=Math.round(disPrice+((btax.getVat()/100)*disPrice));
				this.final2=Math.round(this.final2+((btax.getAdditionalVat()/100)*this.final2));
				a.beverageTextboxes(5, btax.getVat(), btax.getAdditionalVat(), this.final2);
			},

			calculateAmount : function() {

				var a=core.getLib("cartTemplate");
				var ob1=core.getLib("obj");
				var reinit=core.getLib("reinitialize");
				a.grandTotal(this.final1+this.final2);
				var listener=core.getLib("AddDataEventLister");
				var getCart=core.getLib("getCart");
				listener("checkoutButton",{click:function() { 
					getCart(ob1); 
					a.cartContainerClear();
					reinit.emptybags();
				}
			});
			}
			
	};//end of proto

	var  c= new Cart();
	var KEY = "";			
	KEY = core.getKeys("arnab");
	core.setLib(KEY, "cart", c);

})();//end of wrapper