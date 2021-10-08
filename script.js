function createGridDivs(num) {
    containerDiv.innerHTML = "";
    containerDiv.style.gridTemplateColumns = `repeat(${num}, ${600/num}px)`;
    containerDiv.style.gridTemplateRows = `repeat(${num}, ${600/num}px)`;
    for (let i = 1; i <= num*num; i++) {
        const newDiv = document.createElement("div");
        newDiv.classList = "grid";
        containerDiv.appendChild(newDiv);
    }
}

function submitSize(event) {
    let newSize = Number(sizeInput.value);
    createGridDivs(newSize);
}

const containerDiv = document.querySelector(".container-grid");
const sizeInput = document.querySelector('.sizeInput');
const sizeSubmit = document.querySelector('.sizeSubmit');
window.onload = createGridDivs(16);

sizeSubmit.addEventListener('click', submitSize);