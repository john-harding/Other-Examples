// this is the OO javascript used to create a simple to-do list


function toDoList()
{
	this.num = 0; // number of items in list
}

toDoList.prototype.addItem = function() {
	var input = document.getElementById("input-add");
	var val = input.value;
	if(val == "")
	{
  // console.log("false");
  	input.focus();
		return false;
	}
	var list = document.getElementById("to-do-list");

	// create new list item
	var newItem = document.createElement("li");
	newItem.innerHTML = val;
	list.appendChild(newItem); // add new li to list
  
  // create new button
  var newBtn = document.createElement("button");
  
  var _this = this; // create variable to hold reference to this
  newBtn.onclick = function() {
  	var parentElem = this.parentElement;
    parentElem.parentElement.removeChild(parentElem);
    _this.num--; // subtract from 
		console.log(_this.num);
  }
  newBtn.innerHTML = "Remove";
  newItem.appendChild(newBtn); // add "remove" button to list
	
  input.value = ""; // reset input
  input.focus();
  
  this.num++;
  console.log(this.num);
}

var initialize = new toDoList();

document.getElementById("btn-add").onclick = function() {
  // console.log("click");
  initialize.addItem();
}
