const inquirer = require('inquirer');
const fs = require('fs');
const {Circle, Square, Triangle} = require("./lib/shapes");

class Svg{
    constructor(){
        this.textElement = ''
        this.shapeElement = ''
    }
    render(){

        return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="300" height="200">${this.shapeElement}${this.textElement}</svg>`
    }
    setTextElement(text,color){
        this.textElement = `<text x="150" y="125" font-size="60" text-anchor="middle" fill="${color}">${text}</text>`
    }
    setShapeElement(shape){
        this.shapeElement = shape.render()

    }
    
}

const questions = [{
    type: 'input',
    name: 'text',
    message: 'Enter up to three characters'
},
{
    type:'input',
    name:'text-color',
    message: 'Enter text color (keyword or hexadecimal number)'
},

{
    type: 'input',
    name: 'shape-color',
    message: 'Enter shape color (keyword or hexadecimal number)'
},
{
    type: 'list',
    name: 'shape',
    message: 'Enter circle, square or triangle',
    choices: ['Circle', 'Square', 'Triangle']
},
];

function writeToFile(fileName, data) {
    console.log('Writing ['+ data +'] to file ['+ fileName +']')
    fs.writeFile(fileName, data, function (err){
        if (err) {
            return console.log(err);
        }
        console.log('Success! You have created a logo.svg!')
    });
}

async function init() {
    var svgString = '';
    var svg_file = 'logo.svg';

    const answers = await inquirer.prompt(questions);

	//user text
	var user_text = "";
	if (answers.text.length > 0 && answers.text.length < 4) {
		// 1-3 chars, valid entry
		user_text = answers.text;
	} else {
	
		console.log("Invalid! Please enter 1-3 Characters");
        return;
	}
	console.log("User text: [" + user_text + "]");
	//font color
	user_font_color = answers["text-color"];
	console.log("User font color: [" + user_font_color + "]");
	//shape color
	user_shape_color = answers['shape-color'];
	console.log("User shape color: [" + user_shape_color + "]");
	//shape type
	user_shape_type = answers.shape;
	console.log("User entered shape = [" + user_shape_type + "]");
	
    //shape
    let user_shape;
	if (user_shape_type === "Square" || user_shape_type === "square") {
		user_shape = new Square();
		console.log("User selected Square shape");
	}
	else if (user_shape_type === "Circle" || user_shape_type === "circle") {
		user_shape = new Circle();
		console.log("User selected Circle shape");
	}
	else if (user_shape_type === "Triangle" || user_shape_type === "triangle") {
		user_shape = new Triangle();
		console.log("User selected Triangle shape");
	}
	else {
		console.log("Invalid shape!");
	}
	user_shape.setColor(user_shape_color);
// Create a new Svg instance 
var svg = new Svg();
svg.setTextElement(user_text, user_font_color);
svg.setShapeElement(user_shape);
svgString = svg.render();

//Print shape to log
console.log("Displaying shape:\n\n" + svgString);


console.log("Shape generation complete!");
console.log("Writing shape to file...");
writeToFile(svg_file, svgString); 
    
}
//call function to initialize app
init();
