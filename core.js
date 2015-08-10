function core() 
{
	var i=0,lib={};
	//attaching immutable properties to core
	Object.defineProperty(core, 'getKeys', 
		{
  			value: getKeys,
		});
	Object.defineProperty(core, 'setLib', 
		{
  			value: setLib,
		});
	Object.defineProperty(core, 'getLib', 
		{
  			value: getLib,
  			
		});

	//function for genrating unique key
	function getKeys(name) {
	
			return (function(x)
				{
					return x+name;
				})(new Date().getTime()+i++);
		}
	//function for registering attributes from various modules
	function setLib(key,name,value) {
			if(typeof lib[name]=='undefined')
				{
						lib[name]=[key,value];
						return "attachment successful";
				}
			else if(typeof lib[name]=="object" && lib[name][0]==key)
				{

				lib[name]=[key,value];
						return "attachment successful";
				}
			else if(typeof lib[name]=="object" && lib[name][0]!=key)
				{

				return "password error/attribute name exists";
				}
			
	}
	//function for getting values of various attributes
	function getLib(name) {
		if(typeof lib[name]=='undefined')
				{
						return "attribute not found";
				}
		else return lib[name][1];

	}
}

core();