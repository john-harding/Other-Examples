// the problem: sort an array of strings that contain either only numbers or only text
//  - keep the numbers and text in their respective place after sorting
//  - example:

//     input:  ['5', '1', 'z', 'a', '3']

//     output: ['1', '3', 'a', 'z', '5']


// Here is the solution (you can copy and paste it into the console):


// I decided to use insertion sort (since it sorts in place), and when the two value types are not the same type it continues to the next (technically, the previous item) item in the array


function sorter(arr)
{
	var value_i,value_j,

	track_j; // track_j will be used to keep track of the current j location (since it skips values that are different types, we need to keep track of the now broken in place sort)

	for(var i = 1; i < arr.length; i++)
	{
		// change the value to integer if it is an integer
		value_i = (isNaN(parseInt(arr[i]))) ? arr[i] : parseInt(arr[i]);

		innerloop: // label this loop to make the continue and break easier to understand
		for(var j = i, track_j = i; j > 0; j--)
		{
			// again, change the value to integer if it is an integer
			value_j = (isNaN(parseInt(arr[j-1]))) ? arr[j-1] : parseInt(arr[j-1]);

//console.log(value_j + " :: " + (typeof value_j));

			// compare the types
			if(typeof value_i !== typeof value_j)
			{
				// if they aren't the same data type, continue
				continue innerloop;
			}

			// normal insertion sort comparison
			if(value_i < value_j)
			{
				arr[track_j] = arr[j-1]; // switch the values
			} else {
				break innerloop; // if it's in order at this point (j), break the innerloop
			}
			track_j = j - 1; // update track_j to the new current j location
		}
		arr[track_j] = String(value_i); // turn value_i back into a string and put it back into the array
	}

	return arr;
}

var arr = ['123','500','cc','300','cb','aa','1'];
console.log(sorter(arr));