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
		
		var i,itemCatalog,name,id,price,item,categories=[];
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
			return this.items;

	};
	InventoryItems.prototype.getItemById=function(id){

		var item,category;
		
		for(var i in Object.keys(this.items)){
			var keyname=Object.keys(this.items)[i],
			object=this.items[keyname];
			for(var j in object){
				
	
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

		var inventoryObject=new InventoryItems(),
		items=inventoryObject,i,
		itemlist=items.getAllItems(),
		categoryOptions=[],
		createOptions=core.getLib("createOptions");

		categoryOptions.push({name:"Select Category"});
		
		for(i in Object.keys(itemlist)){

			categoryOptions.push({name:Object.keys(itemlist)[i]});
		}

		var onChangeEvent={

			change:PopulateItems
		};
    						
    	createOptions.createElement("category",categoryOptions,onChangeEvent);
    					
    	var itemList=document.getElementById('items');

		function PopulateItems(){
					
			var itemOptions=[],
			category=document.getElementById('category').value,
			object=itemlist[category];
			createOptions.removeElement('items');
			if(category!='Select Category'){
				for(var j in object){
					
					itemOptions.push({id:object[j].getId(),name:object[j].getName()});

				}
				createOptions.createElement("items",itemOptions);
			}
		
			
					
			

					
		}

                		
	}
    		
    

	var registerApi=function(){

		var KEY =core.getKeys("ronojit");
		core.setLib(KEY, "InventoryItems", InventoryItems);
		core.setLib(KEY,"grocery",grocery);
		core.setLib(KEY,"beverages",beverages);
	};

	//Calling Register Api which is registering all the class references
	registerApi();
	PopulateList();
})();
