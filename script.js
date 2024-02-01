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
  // colorPicker.value = e.target.style.backgroundColor;
  penColor = e.target.style.backgroundColor;
  console.log(penColor);
}
function setGraberMode(e){
  setActiveClass(e);
  if(e.target.classList.contains('active')){
    document.querySelectorAll('#grid div').forEach(div => {
      div.removeEventListener('mouseover', draw);
      div.addEventListener('click', findColor);
    });
  }
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






