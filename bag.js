(function WrapBags(){
	//"use strict";
	// var Inventory = core.getLib("InventoryItems");
	var inventory = core.getLib("InventoryItems"),
	elementEnableDisable = core.getLib("elementEnableDisable"),
	Inventory = new inventory(),
	productOptionData =	core.getLib("productOptionData"),
	AddDataEventLister = core.getLib("AddDataEventLister"),
	selectedElement = core.getLib("selectedElement"),
	groceryBag = new Bag(),
	beverageBag = new Bag(),
	obj= {
		"grocery": groceryBag.selectedData,
		"bev" : beverageBag.selectedData
	},
	selectedData = [];




	
	//First time creation of the template design with blank input textboxes.
	productOptionData.renderProductDetails();

	var add_Button = new elementEnableDisable('add'),
	plus_Button = new elementEnableDisable('increment'),
	minus_Button = new elementEnableDisable('decrement');

	//Disabling all the buttons
	add_Button.disable();
	plus_Button.disable();
	minus_Button.disable();

	/*function AddDataEventLister(tagId, addFucnctionReferece, event)
	{
		var add=document.getElementById(tagId);
		add.addEventListener(event, addFucnctionReferece);
	}
	*/	
	
	/*{change: function (){console.log('test');}}*/

	//Adding an event Listener to trigger when the first dropdown gets changed.
	AddDataEventLister("category",{change: changeSelection} );

	/*function selectedElement(id){
		return document.getElementById(id).options[document.getElementById(id).selectedIndex];
	}*/

	/*function update(name,price,quantity){
		if(quantity !== "undefined"){
			document.getElementById("qty").value = quantity;	
		}
		if(name !== "undefined"){
			document.getElementById("name").value = name;	
		}
		if(price !== "undefined"){
			document.getElementById("price").value = price;	
		}
		
	}*/

	// function productOptionData(name,price,quantity){
	// 	if(typeof quantity === "undefined"){
	// 		quantity = 0;
	// 	}
	// 	document.getElementById("name").value = name;
	// 	document.getElementById("price").value = price;
	// 	document.getElementById("qty").value = quantity;
	// }

	//Listened to when selection of a dropdown is changed.
	function changeSelection(){
		if(selectedElement("category").value === "Select Category"){
			//If "Select Category is selected in the dropdown, then the input boxes gets blank."
			productOptionData.productInputSet("","","");
			//Disabling all the buttons
			add_Button.disable();
			plus_Button.disable();
			minus_Button.disable();
			return true;
		}
		var id = selectedElement("items").id,
		quantity = 1,
		name = Inventory.getItemById(id).getName(),
		price = Inventory.getItemById(id).getPrice(),
		selectedData = [];

		add_Button.enable();
		plus_Button.enable();
		minus_Button.enable();

		/*if(flag === 0){
			productOptionData(name,price,quantity);
			flag=1;
		}
		else
			update(name,price,quantity);	
		*/

		//The input text boxes are filled with name of the item selected and displays its corresponding price and a default falue of 1. 
		productOptionData.productInputSet(name,price,quantity);

		//Event Listeners are attached according to the selection of categories.
		if(selectedElement("category").value == "grocery"){
			// AddDataEventLister("items",groceryBag.change,"change");
			AddDataEventLister("items",{change: groceryBag.change });
			//AddDataEventLister("add",groceryBag.add,"click");
			AddDataEventLister("add",{click : groceryBag.add});
			selectedData = obj.grocery;
		}
		else{
			//AddDataEventLister("items",beverageBag.change,"change");
			AddDataEventLister("items",{change: beverageBag.change });
			// AddDataEventLister("add",beverageBag.add,"click");
			AddDataEventLister("add",{click : beverageBag.add});
			selectedData = obj.bev;
		}
		//Iteration is done to check for the recurrence of the selection made.If any, updates are made.
		for(var keys in selectedData)
		{
			if(selectedData[keys].id == id)
			{
				quantity = selectedData[keys].quantity;
				//update(name,price,quantity);
				productOptionData.productInputSet(name,price,quantity);
				//break;
			}
		}

		//productOptionData(name,price,quantity);
	}

	function Bag()
	{
		this.selectedData = []; 

		var cart=core.getLib("cart");

		//Function to be listened when the Add button is pressed
		this.add= function()
		{
			//var upperLimit, lowerLimit;
			if(selectedElement("category").value === "grocery"){
				selectedData = obj.grocery;
				// upperLimit = 6;
				// lowerLimit = 2;
			}
			else{
				selectedData = obj.bev;
				// upperLimit = 4;
				// lowerLimit = 2;
			}
			var flag=0;
			var id = selectedElement("items").id;
			for(var keys in selectedData)
			{
				if(selectedData[keys].id == id)
				{
					// total = document.getElementById("qty").value + this.calculate_total_item(selectedData);
					// if(total >= lowerLimit && total <= upperLimit){
						
					//Obtain the values in the input boxes. productsInputGetIds() returns an object that contains all the required values.
					selectedData[keys].quantity = productOptionData.productsInputGetIds().qty; 
					flag=1;	
					//}
					/*else{
						alert("Sorry your bag is already filled! Please empty some of your cart before checkout");
					}*/
					
				}
			}
			//flag is used to check if the data selected is not chosen before.
			if(flag === 0)
			{
				var newData = {};
				newData.name = Inventory.getItemById(id).getName();
				newData.id = id;
				newData.price = Inventory.getItemById(id).getPrice();
				newData.quantity = productOptionData.productsInputGetIds().qty;
				
				if(typeof selectedData === "undefined")
					selectedData = [];
				//NewData is pushed to the selected Data array.
				selectedData.push(newData);
			}
			//console.log(obj);
			cart.addBagInCart();
			cart.calculateAmount();
		};

		//Triggered when the second dropdown value gets changed.
		this.change = function()
		{
			var id = selectedElement("items").id,
			name = Inventory.getItemById(id).getName(),
			price = Inventory.getItemById(id).getPrice(),
			quantity=1;

			if(selectedElement("category").value === "grocery"){
				selectedData = obj.grocery;
			}
			else{
				selectedData = obj.bev;
			}

			for(var keys in selectedData)
			{
				if(selectedData[keys].id == id)
				{
					quantity = selectedData[keys].quantity; 
					
				}
			}
			
			productOptionData.productInputSet(name,price,quantity);

			/*var id = document.getElementById("items").options[document.getElementById("items").selectedIndex].id;
			
			/*name = Inventory.getItemById(id).getName();
			price = Inventory.getItemById(id).getPrice();
			// productOptionData(name,price,quantity);
			*/
		};

		/*this.calculate_total_item = function(selectedData){
			var total = 0;
			for(var keys in selectedData){
				total = total + selectedData.quantity;
			}
			alert(total);
			return total;
		}*/
	}
	function Reinitialize(){

	}
	Reinitialize.prototype= {
		emptybags : function(){
			obj = {};
		}
	}
	var reinit = new Reinitialize();
	// var productOptionData = new product();
	// var  carttemplate= new cartTemplate();
	var KEY = "";
	(function()
	{
	KEY = core.getKeys("ayan"); 
	core.setLib(KEY, "obj", obj);
	core.setLib(KEY, "reinitialize", reinit);
	//console.log(out+"ayan");
	})();	
	
})();
