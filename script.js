function createGrid(n){;
  const grid = document.querySelector('#grid');
  grid.innerHTML = '';
  for (let i = 1; i <= n * n; i++){
    let div = document.createElement('div');
    div.style.width = `${37.2 / n}rem`
    div.style.height = `${37.2 / n}rem`
    grid.appendChild(div);
  }
}

createGrid(16);
let penColor =  '#000000';
const colorPicker = document.querySelector('#color-picker');
colorPicker.addEventListener('input', function(e){
  penColor = e.target.value;
});


const gridPicker = document.querySelector('#change-grid');
gridPicker.addEventListener('input', function(e){
  createGrid(e.target.value);
  document.querySelector('#grid-size').textContent = `${e.target.value} x ${e.target.value}`;
});
let isMouseDown = false;
document.addEventListener('mousedown', () =>{ isMouseDown = true;
  console.log(isMouseDown);
});
document.addEventListener('mouseup', () => {isMouseDown = false
  console.log(isMouseDown);});
document.querySelectorAll('.grid div').forEach(div => {
  div.addEventListener('mouseenter', e => {
    console.log('entered');
    if (isMouseDown)
    e.target.style.backgroundColor = penColor;
  });
});




