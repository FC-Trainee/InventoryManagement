(function(){

	//item function to create items
	function Item(name,id,price){

		this.name=name;
		this.id=id;
		this.price=price;

	}

	Item.prototype.getName=function(){

		return this.name;
	};			

	Item.prototype.getId=function(){

		return this.id;
		
	};	
	Item.prototype.getPrice=function(){

		return this.price;

	};					

	//Inventory items function
	var InventoryItems=function(){
		
		var i,itemCatalog,name,id,price,item;
		var categories=[];
		this.items={};
		//storing the item catalog to a variable
		itemCatalog=catalogData;
		for(i in itemCatalog){
		
			for(var j in itemCatalog[i]){
			
				name=itemCatalog[i][j].name;
				id=itemCatalog[i][j].id;
				price=itemCatalog[i][j].price;
				item=new Item(name,id,price);
				categories.push(item);
			
		
			}

			this.items[i]=categories;
		categories=[];
		}

	};

	InventoryItems.prototype.getAllItems=function(){
		var j=0;
		//console.log(items);
		return this.items;
	};

	InventoryItems.prototype.getItemById=function(id){

		var item,j,category;
		j=0;
		
		for(var i in Object.keys(this.items))
		{
			var keyname=Object.keys(this.items)[i];
			var object=this.items[keyname];
			for(j in object){
				
			//	console.log(object[j].getId());
				if(object[j].getId()==id){
					return object[j];
				}

			}
		

		}

	};	

	function grocery(){

		var tax=12.5;

		this.getVat=function(){
		return tax;
		};
	}

	grocery.prototype=Object.create(InventoryItems);
    
	function beverages(){

		var tax=11.5,additonaltax=2.5;

		this.getVat=function(){
									
			return tax;

		};

		this.getAdditionalVat=function(){
									
			return additonaltax;

		};
	}

	beverages.prototype=Object.create(InventoryItems);

    function PopulateList(){

		var i,items,itemlist,categoryOptions;
		items=inventoryObject;

		itemlist=items.getAllItems();
		categoryOptions=[];
		categoryOptions.push({name:"Select Category"});
		
		for(i in Object.keys(itemlist)){

			categoryOptions.push({name:Object.keys(itemlist)[i]});
		}

		var onChangeEvent={

			change:PopulateItems

		};



    							
    	var createOptions=core.getLib("createOptions");
    						//console.log(categoryOptions[0].name);
    	createOptions("category",categoryOptions,onChangeEvent);
    						// createOptions("items","select");
    	var itemList=document.getElementById('items');

		function PopulateItems(){
					
			var itemOptions=[];

			if(document.getElementById('items'))
				document.getElementById('items').remove();
			
			var category=document.getElementById('category').value;

			var object=itemlist[category];
			for(var j in object){
				
				itemOptions.push({id:object[j].getId(),name:object[j].getName()});

			}
			// console.log(itemOptions[0]);
			
					
			createOptions("items",itemOptions);

					
		}

                		
	}
    		
    var inventoryObject=new InventoryItems();
    var groceryObject=new grocery();
    var beverageObject=new beverages();
    //console.log(inventoryObject.getItemById('r1').getPrice());
	var registerApi=function(){

		var KEY = "";
		KEY = core.getKeys("ronojit");
		
		var out=core.setLib(KEY, "InventoryItems", InventoryItems);
		core.setLib(KEY,"grocery",grocery);
		core.setLib(KEY,"beverages",beverages);
		PopulateList();

	};

	//Calling Register Api which is registering all the class references
	registerApi();

})();
