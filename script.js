//declare variables and consts
let penColor =  '#000000';
const colorPicker = document.querySelector('#color-picker');
const clearButton = document.querySelector('#clear');
const gridPicker = document.querySelector('#change-grid');
const colorGraber = document.querySelector('#graber');
let isMouseDown = false;
const randomColorbtn = document.querySelector('#random-color');
const toggleLinesBtn = document.querySelector('#toggle-lines');
const brightenBtn = document.querySelector('#brighten');
const darkenBtn = document.querySelector('#darken');

// declare functions

//This function is called each time the gridPicker get's an input, n is the desired value
function createGrid(n){;
  const grid = document.querySelector('#grid');
  grid.innerHTML = '';
  for (let i = 1; i <= n * n; i++){
    let div = document.createElement('div');
    div.style.boxSizing = 'border-box';
    div.style.width = `${37.2 / n}rem`;
    div.style.height = `${37.2 / n}rem`;
    div.addEventListener('mouseover', draw);
    grid.appendChild(div);
  }
}

function draw(e){
  if (isMouseDown){
      e.target.style.backgroundColor = penColor;
  }
}
function changePenColor(e){

  // these if's make sure there aren't more functions (incompatible with each other) active at the same time
  // I repeated this if's a few times, but this comments will only be here
  if (randomColorbtn.classList.contains('active'))
    randomColorbtn.click();
  if (brightenBtn.classList.contains('active'))
    brightenBtn.click();
  if (darkenBtn.classList.contains('active'))
    darkenBtn.click();
  if (colorGraber.classList.contains('active'))
    colorGraber.click();
  penColor = e.target.value;
}


function changeGridSize(e){
  createGrid(e.target.value);
  document.querySelector('#grid-size').textContent = `${e.target.value} x ${e.target.value}`;
}

function clear(){
  document.querySelectorAll('#grid div').forEach(div => {
    div.style.backgroundColor = 'white';
});
}

function setActiveClass(e){
  const btn = e.target;
  if (btn.classList.contains('active'))
    btn.classList.remove('active');
  else
    btn.classList.add('active');
}

//I had to convert from rgb to Hex because i could only change the color picker input
//  if i had a hex value
function findColor(e){
  penColor = e.target.style.backgroundColor;
  colorPicker.value = rgbToHex(penColor);
  colorGraber.click();
}
function setGraberMode(e){
  if (randomColorbtn.classList.contains('active'))
    randomColorbtn.click();
  if (brightenBtn.classList.contains('active'))
    brightenBtn.click();
  if (darkenBtn.classList.contains('active'))
    darkenBtn.click();
  setActiveClass(e);
  if(e.target.classList.contains('active')){
    document.querySelectorAll('#grid div').forEach(div => {
      div.removeEventListener('mouseover', draw);
      div.addEventListener('click', findColor);
     
    });
  } else {
    document.querySelectorAll('#grid div').forEach(div => {
      div.removeEventListener('click', findColor);
      div.addEventListener('mouseover', draw);
    });
    
  }
}
function rgbToHex(value){
  value = value.split(',');

  let r = componentToHex(value[0].slice(4));
 
  
  let g = componentToHex(value[1].slice(1));
    
  let b = componentToHex(value[2].split(')')[0].slice(1));
  return `#${r}${g}${b}`;
  }
   function componentToHex(c){
    let c1, c2
  if (c < 10){
    c1 = 0;
    c2 = c;
  } else if (c >= 10 && c < 16){
    c1 = numToHex(c);
    c2 = '';
  }
    
  else{
    c1 = Math.floor(c / 16);

     c2 = c - c1 * 16;
  
    c1 = numToHex(c1);
    c2 = numToHex(c2);  
   
  }
  c = `${c1}${c2}`;
  return c;
   }
   function numToHex(n){
    if (n === 10)
      return 'A';
    else if (n === 11)
      return 'B';
    else if (n === 12)
    return 'C';
    else if (n === 13)
    return 'D';
    else if (n === 14)
    return 'E';
    else if (n === 15)
    return 'F';
    return n;   
  }
  
  function getRandomColor(){
    let values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
    penColor = `#${values[Math.floor(Math.random() * 16)]}${values[Math.floor(Math.random() * 16)]}${values[Math.floor(Math.random() * 16)]}${values[Math.floor(Math.random() * 16)]}${values[Math.floor(Math.random() * 16)]}${values[Math.floor(Math.random() * 16)]}`;

  }

  function randomColorDraw(e){
    getRandomColor();
    if (isMouseDown)
    e.target.style.backgroundColor = penColor;
  }
  function doRandomColor(e){
  if (brightenBtn.classList.contains('active'))
    brightenBtn.click();
  if (darkenBtn.classList.contains('active'))
    darkenBtn.click();
  if (colorGraber.classList.contains('active'))
    colorGraber.click();
    setActiveClass(e);
    if(e.target.classList.contains('active')){
      document.querySelectorAll('#grid div').forEach(div => {
        div.removeEventListener('mouseover', draw);
        div.addEventListener('mouseover', randomColorDraw);
      });
    } else {
      document.querySelectorAll('#grid div').forEach(div => {
        div.removeEventListener('mouseover', randomColorDraw);
        div.addEventListener('mouseover', draw);
        penColor = colorPicker.value;
      });
    }
  }

  function toggleLines(e){
    setActiveClass(e);
    if (toggleLinesBtn.classList.contains('active')){
      let n = gridPicker.value;
    document.querySelectorAll('#grid div').forEach((div, i) => {
      if( i + 1 >= n && (i + 1) % n == 0 && i + 1 !== n * n)
        div.style.borderBottom = '1px solid black';
      else if(i + 1 < n * (n - 1)){
        div.style.borderBottom = '1px solid black';
        div.style.borderRight = '1px solid black';
      } else if (i !== n * n)
      div.style.borderRight = '1px solid black';

      
  });
    } else{
        document.querySelectorAll('#grid div').forEach(div => {
          div.style.border = 'none';
        });
    }
    
    
  }

  

  function lighten(e){
    if (isMouseDown){
      let value = e.target.style.backgroundColor;
      if (value === '')
        return 0;
          
      value = value.split(',');  
      let r = +value[0].slice(4);
      let g = +value[1].slice(1);
      let b = +value[2].split(')')[0].slice(1);
      if (r + 20 > 255)
        r = 255;
      else  
        r += 20;

      if (g + 20 > 255)
        g = 255;
      else  
        g += 20;  
      
      if (b + 20 > 255)
        b = 255;
      else  
        b += 20;
      e.target.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    } 

    
  }
  function doBrightenBtn(e){
    if (randomColorbtn.classList.contains('active'))
      randomColorbtn.click();
    if (darkenBtn.classList.contains('active'))
      darkenBtn.click();
    if (colorGraber.classList.contains('active'))
      colorGraber.click();
    setActiveClass(e);
    if (e.target.classList.contains('active')){
     
      document.querySelectorAll('#grid div').forEach(div => {
        
        div.removeEventListener('mouseover', draw);
        div.addEventListener('mouseover', lighten);
      });
    } else{
      document.querySelectorAll('#grid div').forEach(div => {
      
        div.removeEventListener('mouseover', lighten);
        div.addEventListener('mouseover', draw);
      });
    }
  }

  function doDarken(e){
    if (randomColorbtn.classList.contains('active'))
    randomColorbtn.click();
    if (brightenBtn.classList.contains('active'))
      brightenBtn.click();
    if (colorGraber.classList.contains('active'))
      colorGraber.click();
    setActiveClass(e);
    if (e.target.classList.contains('active')){
     
      document.querySelectorAll('#grid div').forEach(div => {
        
        div.removeEventListener('mouseover', draw);
        div.addEventListener('mouseover', darken);
      });
    } else{
      document.querySelectorAll('#grid div').forEach(div => {
      
        div.removeEventListener('mouseover', darken);
        div.addEventListener('mouseover', draw);
      });
    }
  }
  
  function darken(e){
    if (isMouseDown){
      let value = e.target.style.backgroundColor;
      if (value === '')
        value = 'rgb(255, 255, 255)';
          
      value = value.split(',');  
      let r = +value[0].slice(4);
      let g = +value[1].slice(1);
      let b = +value[2].split(')')[0].slice(1);
      if (r - 20 < 0)
        r = 0;
      else  
        r -= 20;

      if (g - 20 < 0)
        g = 0;
      else  
        g -= 20;  
      
      if (b - 20 < 0)
        b = 0;
      else  
        b -= 20;
      e.target.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    } 

  }




//changes the isMouseDown variable
document.addEventListener('mousedown', e =>{ 
  if (e.target != document.querySelector('#change-grid'))
  e.preventDefault();
  isMouseDown = true;
});
document.addEventListener('mouseup', () => {isMouseDown = false;});




// generates the first grid
createGrid(gridPicker.value);



//adds the necessary event listeners
colorPicker.addEventListener('input',changePenColor);
gridPicker.addEventListener('input',changeGridSize);
clearButton.addEventListener('click',clear);
colorGraber.addEventListener('click',setGraberMode);
randomColorbtn.addEventListener('click', doRandomColor);
toggleLinesBtn.addEventListener('click', toggleLines);
brightenBtn.addEventListener('click', doBrightenBtn);
darkenBtn.addEventListener('click', doDarken);



