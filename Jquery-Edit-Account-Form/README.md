GoButler - Edit Account Information HTML widget

This app works as described here:

1 - loads the page with the form hidden, and a visible spinning gear icon 
indicating that the page is loading

2 - information is loaded via ajax and form appears using CSS transitions

3 - User can change information and add as many emails as he/she wants

4 - On submit of the form, all of the data is loaded into an object and 
then PUT to the json url given in the problem.

5 - If the ajax request succeeds, the submit button will turn green and 
will show a check mark symbol temporarily.  If it fails, the button will 
turn red and will show an "x" symbol temporarily.


To get into the specifics of what is happening behind the scenes, view the 
JS file as I commented all of the actions to give you a good understanding 
of my thought process.


External Resources Used:

- jQuery
- BootStrap
- Font Awesome
- HTML5 Shiv for IE8 and previous