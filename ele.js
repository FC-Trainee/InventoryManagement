(function ()
{
		var timer;
		var count = 0;
		var gdisc=Math.floor((Math.random() * 20) + 5);
		var bdisc=Math.floor((Math.random() * 25) + 10);

		
		/*
			This a method which helps to create individual html elements.
			it takes as input parameter 
			1. html Tag name like div or span or input or others, 
			2. parent element name,
			3. attribute object like id, value, type, style.
			4. event handler object like click or change or others.

		*/

		function createElement(tagName, parent, attributeObj, eventObj)
		{		
			var element=document.createElement(tagName);
			for(var key in attributeObj) 
			{
				if(key=="label")
					element.appendChild(document.createTextNode(attributeObj[key]));	

				element.setAttribute(key, attributeObj[key]);
			}

			if(eventObj!==null) {
				for(var eventName in eventObj)
				{
					if (eventObj.hasOwnProperty(eventName)) 
						element.addEventListener(eventName, eventObj[eventName]);	
				}
			}

			parent.appendChild(element);
			return element;
		}



		/*
			creating a body object and others wrapper div.
		*/

		var body=document.body;
		var mainContainer = createElement("div", body, {id:"mainContainer", style:"border:0px solid; padding:2%"});
		var block = createElement("div", mainContainer, {id:"block", style:"width:100%; height:auto; border:0px solid"} );
		var cart = createElement("div", mainContainer,{id:"cart", style:"margin-Left:60%; width:40%; height:auto; border:0px solid"} );
		var cartContainer = createElement("div", cart, {id:"cartContainer"});
		var boughtItems = createElement("div", mainContainer, {id:"boughtItems", style:"margin-top:15%;width:50%; height:auto;"});
		var productInfo = createElement("div", boughtItems, {id:"productInfo"});
	


		/*
			starting a timer to generate random discount on grocery and beverage items.
		*/
		setInterval(function(){ gdisc=Math.floor((Math.random() * 20) + 5);}, 2000);
		setInterval(function(){ bdisc=Math.floor((Math.random() * 25) + 10);}, 3000);



		/*
			this template helps to create a dropdown list 
		
		*/

		function createOptions()
		{
			this.ele="";
		}

		createOptions.prototype.createElement = function(selectTagId, optionObj, selectTagEventObj){

			var select = createElement("select", block, {id:selectTagId}, selectTagEventObj);


			if(optionObj!==null)
			{	
				for(var attrName in optionObj)
				{
					if (optionObj.hasOwnProperty(attrName))
						this.ele =  createElement("option", select, {value:optionObj[attrName].name, id:optionObj[attrName].id, label:optionObj[attrName].name} );

				}
			}
		};

		createOptions.prototype.removeElement = function(id) {
		if(document.getElementById(id))	
		document.getElementById(id).remove();
		};





		function selectedElement(id){
			return document.getElementById(id).options[document.getElementById(id).selectedIndex];
		}



		// A template which shows the product details beside the dropdown list.
		// this template populate data when the dropdown list item is change.

		function product(name, price, qty) 
		{	
			this.div1 = createElement("div",  block, {style:"margin-Left:10%"} );
			this.div2 = createElement("div",  block, {style:"margin-Left:10%"} );
			this.input1="";
			this.input2="";
			this.input3="";


		}

		product.prototype.renderProductDetails = function() {
			createElement("span", this.div1, {style:"color:red; margin-Left:5%", label:"Name"});
			createElement("span", this.div1, {style:"color:red; margin-Left:5%", label:"Price"});
			createElement("span", this.div1, {style:"color:red; margin-Left:5%", label:"Operation"});
			createElement("span", this.div1, {style:"color:red; margin-Left:5%", label:"QTY"});

			createElement("input", this.div2, {type:"text", readOnly:"true",  id:"name", style:"margin-Left:5%; width:4em"});
			createElement("input", this.div2, {type:"text", readOnly:"true",  id:"price", style:"margin-Left:3%; width:4em"});
			createElement("input", this.div2, {type:"submit", id:"increment", value:"+", style:"margin-Left:3%; width:2em"}, {click:addQty});
			createElement("input", this.div2, {type:"submit", id:"decrement", value:"-", style:"margin-Left:1%; width:2em"}, {click:subQty});
			createElement("input", this.div2, {type:"text", readOnly:"true",  id:"qty", style:"margin-Left:4.5%; width:3em"});
			createElement("input", this.div2, {type:"submit", value:"Add", id:"add", style:"margin-Left:1%; width:5em"});

		};

		product.prototype.productInputSet = function(name, price, qty) {
			document.getElementById("name").value=name;
			document.getElementById("price").value=price;
			document.getElementById("qty").value=qty;
		};



		product.prototype.productsInputGetIds = function() {
			this.input1 = document.getElementById("name").value;
			this.input2 = document.getElementById("price").value;
			this.input3 = document.getElementById("qty").value;

			return {name:this.input1, price:this.input2, qty:this.input3};
		};	



		function elementEnableDisable(id)
		{

			this.id=id;
		}										

		elementEnableDisable.prototype.enable = function() {
												//console.log("enable");	
												document.getElementById(this.id).disabled=false;
											}; 		

											elementEnableDisable.prototype.disable = function() {
												//console.log("disable");	
												document.getElementById(this.id).disabled=true;	
											};																									


											function addQty()
											{
												var qty = document.getElementById('qty').value ;
												if(qty<=5)
												document.getElementById('qty').value = parseInt(qty) + 1;

											}

											function subQty()
											{
												var qty = document.getElementById('qty').value ;
												if(qty>0)
													document.getElementById('qty').value = parseInt(qty) - 1;
											}

				// add the event against the tagId.							
				//{event_Name: function_reference
				function AddDataEventLister(tagId, eventObj)
				{
					var add=document.getElementById(tagId);
					if(eventObj!==null)
					{
						for(var eventName in eventObj)
						{
							if (eventObj.hasOwnProperty(eventName)) 
								add.addEventListener(eventName, eventObj[eventName]);	
						}
					}
				}


				/*function test()
				{
					console.log("hello");
				}


				var testData1=[
				{
					name:"grocery"
				},
				{
					name:"beverages"
				}];


				var testData2=[
				{
				id:1,
				name:"rice"
				},
				{
				id:2,
				name:"veges"
				}];


				createOptions(1,testData1,{change: function (){console.log('Items');}});
				createOptions(2,testData2,{change: function (){console.log('test');}}); 
				*/

				//var p = new product();
				//p.renderProductDetails();
				//p.productInputSet("rice",200,4);
				//var t = p.productsInputGetId();
				//console.log(t);

				//var e = new elementEnableDisable('add');
				//e.disable();
				//e.enable();


				// its a cart Template

				function cartTemplate()
				{

					this.groceryData="";
					this.beverageData="";	
					this.gtotal = "";
					this.lstnr;
				}

				cartTemplate.prototype = {


					renderTemplate : function(){

						groceryData	= createElement("div", cartContainer, {id:"g1", style:"border-Bottom:1px solid;"});
						createElement("div", groceryData, {class:"cart-Grocery-Heading",label:"Grocery"});
						var gLabel1 = createElement("div", groceryData, { class:"cart-Grocery-Heading", style: "border-Bottom:2px solid"});
						createElement("span", gLabel1,  {style:"margin-Left:12%", label:"Id"});
						createElement("span", gLabel1,  {style:"margin-Left:8%",  label:"Name"});
						createElement("span", gLabel1,  {style:"margin-Left:8%",  label:"Price"});
						createElement("span", gLabel1,  {style:"margin-Left:8%",  label:"QTY"});
						createElement("span", gLabel1,  {style:"margin-Left:8%",  label:"Amount"});


						beverageData	= createElement("div", cartContainer, {id:"g2"} );

						createElement("div", beverageData, {class:"cart-beverage-Heading", label:"Beverage"});
						var gLabel2= createElement("div", beverageData, {class:"cart-beverage-Heading", style:"border-Bottom:2px solid"});
						createElement("span", gLabel2, {style:"margin-Left:12%", label:"Id"});
						createElement("span", gLabel2, {style:"margin-Left:8%",  label:"Name"});
						createElement("span", gLabel2, {style:"margin-Left:8%",  label:"Price"});
						createElement("span", gLabel2, {style:"margin-Left:8%",  label:"QTY"});
						createElement("span", gLabel2, {style:"margin-Left:8%",  label:"Amount"});
						gtotal = createElement("div", cartContainer, {id:"gtotal"});

					},


					cartContainerClear : function() {

						document.getElementById('g1').innerHTML="";
						createElement("div", groceryData, {class:"cart-Grocery-Heading",label:"Grocery"});
						var gLabel1 = createElement("div", groceryData, {class:"cart-Grocery-Heading",style: "border-Bottom:2px solid"});
						createElement("span", gLabel1,  {style:"margin-Left:12%", label:"Id"});
						createElement("span", gLabel1,  {style:"margin-Left:8%",  label:"Name"});
						createElement("span", gLabel1,  {style:"margin-Left:8%",  label:"Price"});
						createElement("span", gLabel1,  {style:"margin-Left:8%",  label:"QTY"});
						createElement("span", gLabel1,  {style:"margin-Left:8%",  label:"Amount"});

						document.getElementById('g2').innerHTML="";
						createElement("div", beverageData, {class:"cart-beverage-Heading", label:"Beverage"});
						var gLabel2= createElement("div", beverageData, {class:"cart-beverage-Heading", style:"border-Bottom:2px solid"});
						createElement("span", gLabel2, {style:"margin-Left:12%", label:"Id"});
						createElement("span", gLabel2, {style:"margin-Left:8%",  label:"Name"});
						createElement("span", gLabel2, {style:"margin-Left:8%",  label:"Price"});
						createElement("span", gLabel2, {style:"margin-Left:8%",  label:"QTY"});
						createElement("span", gLabel2, {style:"margin-Left:8%",  label:"Amount"});

						document.getElementById("gtotal").innerHTML="";
					},



					groceryItemDetails : function(Id, Name, Price, Qty, Amount) {

						var gdata= createElement("div", groceryData, {class:"cart-item-row"});
						createElement("span", gdata,  {style:"margin-Left:12%", label: Id });
						createElement("span", gdata,  {style:"margin-Left:10%", label: Name });
						createElement("span", gdata,  {style:"margin-Left:10%", label: Price });
						createElement("span", gdata,  {style:"margin-Left:12%", label: Qty });
						createElement("span", gdata,  {style:"margin-Left:12%", label: Amount });
					},


					groceryTextboxes : function(discount, tax, totalAmount){

						createElement("span", groceryData, {label:"Discount(%)"} );	
						createElement("input", groceryData,{id:"grocdis",type:"text", readOnly:"true", value:discount, style:"width:4em"});

						createElement("span", groceryData, {label:"Tax(%)" });
						createElement("input", groceryData, {type:"text", readOnly:"true", value:tax, style:"width:4em"} );

						createElement("span", groceryData, {label:"Amount(Rs.)" });
						createElement("input", groceryData, {type:"text", readOnly:"true", value:totalAmount, style:"width:4em"} );		

						var grocdis = document.getElementById('grocdis');
						
					},



					beverageItemDetails : function(Id, Name, Price, Qty, Amount) {

						var bdata= createElement("div", beverageData, {class:"cart-item-row"});
						createElement("span", bdata,  {style:"margin-Left:12%", label:Id} );
						createElement("span", bdata,  {style:"margin-Left:10%", label:Name} );
						createElement("span", bdata,  {style:"margin-Left:10%", label:Price });
						createElement("span", bdata,  {style:"margin-Left:12%", label: Qty } );
						createElement("span", bdata,  {style:"margin-Left:12%", label: Amount });
					}, 


					beverageTextboxes : function(discount, tax, addTax ,totalAmount) {

						createElement("span", beverageData, {label:"Discount(%)"} );	
						createElement("input", beverageData,{id:"bevdis", type:"text", readOnly:"true", value:discount, style:"width:4em"});

						createElement("span", beverageData, {label:"Tax(%)" });
						createElement("input", beverageData, {type:"text", readOnly:"true", value:tax, style:"width:4em"} );

						createElement("span", beverageData, {label:"Add. Tax(%)"} );
						createElement("input", beverageData, {type:"text", readOnly:"true", value:addTax, style:"width:2em"}, {} );

						createElement("span", beverageData, {label:"Amount(Rs.)" });
						createElement("input", beverageData, {type:"text", readOnly:"true", value:totalAmount, style:"width:4em"} );		
					},


					grandTotal : function(allTotal) {
						
						createElement("input", gtotal, {type:"text", readOnly:"true", value:allTotal, style:"float:right"});
						createElement("span", gtotal, {style:"float:right; marginRight:2%;", label:"Grand Total"});
						createElement("input", gtotal, {type:"submit", value:"Check Out", id:"checkoutButton", style:"float:left"} );	
					},									

					init : function(fn){
						var i = 0;
						timer = setInterval(function(){fn.addBagInCart(); fn.discount(gdisc, bdisc); fn.calculateAmount();}, 2000);
					}

				};



				//its a product Export details Template

				function productInfoTemp()
				{

					this.productGroceryData="";
					this.productBeverageData="";
					this.exportButton="";


				}	


				productInfoTemp.prototype.template = function(){
					count++;
					var exportJson=core.getLib("exportJson");

					productGroceryData	= createElement("div", productInfo, {id:"pg1", style:"border-Bottom:1px solid;"});

					createElement("div", productGroceryData, {class:"cart-Grocery-Heading", label:"Grocery"});
					var pgLabel1 = createElement("div", productGroceryData, {style: "border-Bottom:2px solid"});
					createElement("span", pgLabel1,  {style:"margin-Left:12%", label:"Id"});
					createElement("span", pgLabel1,  {style:"margin-Left:8%",  label:"Name"});
					createElement("span", pgLabel1,  {style:"margin-Left:8%",  label:"Price"});
					createElement("span", pgLabel1,  {style:"margin-Left:8%",  label:"QTY"});
					createElement("span", pgLabel1,  {style:"margin-Left:8%",  label:"Discount(%)"});
					createElement("span", pgLabel1,  {id:"gdiscount", style:"margin-Left:2%"  });

					productBeverageData	= createElement("div", productInfo, {id:"pg2"} );

					createElement("div", productBeverageData, {class:"cart-beverage-Heading", label:"Beverage"});
					var pgLabel2= createElement("div", productBeverageData, {style:"border-Bottom:2px solid"}, {});
					createElement("span", pgLabel2, {style:"margin-Left:12%", label:"Id"});
					createElement("span", pgLabel2, {style:"margin-Left:8%",  label:"Name"});
					createElement("span", pgLabel2, {style:"margin-Left:8%",  label:"Price"});
					createElement("span", pgLabel2, {style:"margin-Left:8%",  label:"QTY"});
					createElement("span", pgLabel2,  {style:"margin-Left:8%",  label:"Discount(%)"});
					createElement("span", pgLabel2,  {id:"bdiscount", style:"margin-Left:2%"  });

					exportButton = createElement("input", productInfo, {type: "button", id: "xp"+count, value: "Export"}, {click: (function(a){ return function(){exportJson(a);};})(count)});
				};	

				
				productInfoTemp.prototype.groceryDetails = function(Id, Name, Price, Qty, discount) {

					var productgdata= createElement("div", productGroceryData, {class:"cart-item-row"});
					createElement("span", productgdata,  {style:"margin-Left:12%", label: Id });
					createElement("span", productgdata,  {style:"margin-Left:10%", label: Name });
					createElement("span", productgdata,  {style:"margin-Left:10%", label: Price });
					createElement("span", productgdata,  {style:"margin-Left:12%", label: Qty });
					document.getElementById("gdiscount").innerHTML=discount;
				};

				productInfoTemp.prototype.beverageDetails = function(Id, Name, Price, Qty,  discount) {

					var productbdata= createElement("div", productBeverageData, {class:"cart-item-row"});
					createElement("span", productbdata,  {style:"margin-Left:12%", label:Id} );
					createElement("span", productbdata,  {style:"margin-Left:10%", label:Name} );
					createElement("span", productbdata,  {style:"margin-Left:10%", label:Price });
					createElement("span", productbdata,  {style:"margin-Left:12%", label: Qty } );
					document.getElementById("bdiscount").innerHTML=discount;
				};

				productInfoTemp.prototype.exportBtn = function()
				{

					createElement("input", boughtItems, {type: "button", id: "xp", value: "Export All"});
				};



				/*var p = new productInfoTemp();
				p.template();						
				p.groceryDetails(1,"rice",200,5,500,7);
				p.beverageDetails(2,"Tea",50,2,100,10);*/
					/*
						var  a = new cartTemplate();

						a.renderTemplate();

						a.groceryItemDetails(1,"rice",100,5,500);
						a.groceryItemDetails(2,"vages",20,5,100);
						a.groceryItemDetails(2,"vages",20,5,100);
						a.groceryTextboxes(5,2, 700);

						//a.cartContainerClear();

						a.beverageItemDetails(1,"rice",500,5,2500);
						a.beverageItemDetails(2,"vages",70,5,350);
						a.beverageItemDetails(2,"vages",60,5,300);
						a.beverageTextboxes(5,2,1 ,700);

						a.grandTotal(100);
						*/


						var productOptionData = new product();
						var  carttemplate = new cartTemplate();
						var productinfotemp = new productInfoTemp();
						var createoptions = new createOptions();
						var KEY = "";
						(function()
						{
							KEY = core.getKeys("suvradip"); 
							var out = core.setLib(KEY, "createElement", createElement);
							core.setLib(KEY, "createOptions", createoptions);
							core.setLib(KEY, "selectedElement", selectedElement);
							core.setLib(KEY, "productOptionData", productOptionData);
							core.setLib(KEY, "elementEnableDisable", elementEnableDisable);		
							core.setLib(KEY, "AddDataEventLister", AddDataEventLister);
							core.setLib(KEY, "cartTemplate", carttemplate);	
							core.setLib(KEY, "productInfoTemp", productinfotemp);
					//console.log(out);
				})();






})();//end


