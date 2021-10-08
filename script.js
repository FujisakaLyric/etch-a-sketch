function createGridDivs(num) {
    currentSize = num;
    containerDiv.innerHTML = "";
    containerDiv.style.gridTemplateColumns = `repeat(${num}, ${600/num}px)`;
    containerDiv.style.gridTemplateRows = `repeat(${num}, ${600/num}px)`;
    for (let i = 1; i <= num*num; i++) {
        const newDiv = document.createElement("div");
        newDiv.classList = "grid";
        newDiv.addEventListener("mouseover", changeColor);
        containerDiv.appendChild(newDiv);
    }
}

function changeColor(event) {
    if (currentMode === "rainbow") {
        const randomR = Math.floor(Math.random() * 256);
        const randomG = Math.floor(Math.random() * 256);
        const randomB = Math.floor(Math.random() * 256);
        event.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
    } 
    else if (currentMode === "black") {
        event.target.style.backgroundColor = "black";
    } 
    else if (currentMode === "eraser") {
        event.target.style.backgroundColor = "white";
    }
    else if (currentMode === "incremental") {
        if (event.target.style.backgroundColor === "") {
            event.target.style.backgroundColor = `rgb(${255*0.9}, ${255*0.9}, ${255*0.9})`;
        }
        else if (event.target.style.backgroundColor === "rgb(0, 0, 0)") { return; }
        else {
            let currR = event.target.style.backgroundColor.replace(/^(rgb|rgba)\(/,'').replace(/\)$/,'').replace(/\s/g,'').split(',')[0];
            event.target.style.backgroundColor = `rgb(${currR - 25.5}, ${currR - 25.5}, ${currR - 25.5})`;
        }
    }
}

function submitSize() {
    let newSize = Number(sizeInput.value);
    createGridDivs(newSize);
}

function toggleGrid() {
    let gridContainer = document.querySelectorAll(".grid");
    gridContainer.forEach(grid => {
        grid.classList.toggle("transparent");
    });
}

function selectButton(event) {
    if (this.id === currentMode) { return; }
    let oldMode = document.getElementById(currentMode);
    oldMode.classList.toggle("selected");
    this.classList.toggle("selected");
    currentMode = this.id;
}

function resetGrid() {
    let gridContainer = document.querySelectorAll(".grid");
    gridContainer.forEach(grid => {
        grid.style.backgroundColor = "white";
    });
}

const containerDiv = document.querySelector(".container-grid");
const sizeInput = document.querySelector(".sizeInput");
const sizeSubmit = document.querySelector(".sizeSubmit");
const gridToggle = document.querySelector(".toggle-grid");
const reset = document.querySelector(".reset");
const colorSettings = document.querySelectorAll(".button-selectable");
let currentSize = 16;
let currentMode = "black";
window.onload = createGridDivs(currentSize);

sizeSubmit.addEventListener("click", submitSize);
gridToggle.addEventListener("click", toggleGrid);
colorSettings.forEach(mode => mode.addEventListener("click", selectButton));
reset.addEventListener("click", resetGrid);