//declare variables and consts
let penColor =  '#000000';
const colorPicker = document.querySelector('#color-picker');
const clearButton = document.querySelector('#clear');
const gridPicker = document.querySelector('#change-grid');
const colorGraber = document.querySelector('#graber');
let isMouseDown = false;
const randomColorbtn = document.querySelector('#random-color');
const toggleLinesBtn = document.querySelector('#toggle-lines');


// declare functions
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
  if (randomColorbtn.classList.contains('active'))
    randomColorbtn.click();
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

function findColor(e){
  penColor = e.target.style.backgroundColor;
  colorPicker.value = rgbToHex(penColor);
  colorGraber.click();
}
function setGraberMode(e){
  if (randomColorbtn.classList.contains('active'))
    randomColorbtn.click();
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
