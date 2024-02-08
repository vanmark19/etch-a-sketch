//declare variables and consts
let penColor =  '#000000';
const colorPicker = document.querySelector('#color-picker');
const clearButton = document.querySelector('#clear');
const gridPicker = document.querySelector('#change-grid');
const colorGraber = document.querySelector('#graber');
let isMouseDown = false;



// declare functions
function createGrid(n){;
  const grid = document.querySelector('#grid');
  grid.innerHTML = '';
  for (let i = 1; i <= n * n; i++){
    let div = document.createElement('div');
    div.style.width = `${37.2 / n}rem`;
    div.style.height = `${37.2 / n}rem`;
    div.addEventListener('mouseover', draw);
    grid.appendChild(div);
  }
}

function draw(e){
  if (isMouseDown)
      e.target.style.backgroundColor = penColor;
}
function changePenColor(e){
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
  // console.log(penColor);
}
function setGraberMode(e){
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
  console.log(`#${r}${g}${b}`);
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

//changes the isMouseDown variable
document.addEventListener('mousedown', e =>{ 
  if (e.target != document.querySelector('#change-grid'))
  e.preventDefault();
  isMouseDown = true;

});
document.addEventListener('mouseup', () => {isMouseDown = false});




// generates the first grid
createGrid(16);



//adds the necessary event listeners
colorPicker.addEventListener('input',changePenColor);
gridPicker.addEventListener('input',changeGridSize);
clearButton.addEventListener('click',clear);
colorGraber.addEventListener('click',setGraberMode);






