const dotsSize = 5;
const borderDotSize = 2;
let positions = [];

document.addEventListener('DOMContentLoaded', function() {
    let blockContainers = document.querySelectorAll('.blockAnimsContainer');
    blockContainers.forEach(blockContainer => {
        positions[Array.from(blockContainers).indexOf(blockContainer)] = 0;
    });
    updateAnimBlocks();

    update();
});

document.addEventListener('click', updateAnimBlocks);
window.addEventListener('resize', updateAnimBlocks);

function updateAnimBlocks(){

    // Eliminar los contadores existentes
    let existingSteps = document.querySelectorAll('.stepsElements');
    existingSteps.forEach(step => {
        step.parentElement.removeChild(step);
    });

    // Seleccionar todos los elementos con clase "blockContainer"
    let blockContainers = document.querySelectorAll('.blockAnimsContainer');

    // Recorrer cada contenedor
    blockContainers.forEach(container => {
        let childCount = container.children.length;

        let elementWidth = container.children[0].offsetWidth;
        let containerWidth = container.offsetWidth;
        let contentWidth = container.scrollWidth;
        let scrollStep = (contentWidth - elementWidth) / (childCount - 1);

        if (container.scrollWidth > container.clientWidth) {

            let extraSpaceBeginning = document.createElement('div');
            extraSpaceBeginning.className = 'stepsElements';
            extraSpaceBeginning.style.minWidth = `${contentWidth}px`;
            extraSpaceBeginning.style.margin = `0px`;
            container.prepend(extraSpaceBeginning);

            let extraSpaceAfter = document.createElement('div');
            extraSpaceAfter.className = 'stepsElements';
            extraSpaceAfter.style.minWidth = `${contentWidth}px`;
            extraSpaceAfter.style.margin = `0px`;
            container.append(extraSpaceAfter);

            let steps = document.createElement('div');
            steps.className = 'stepsElements';

            steps.style.position = 'relative';
            steps.style.alignSelf = 'center';
            steps.style.marginBottom = '10px';

            steps.style.display = 'flex';
            steps.style.flexDirection = 'row';

            // Crear un elemento para mostrar el contador
            for (let i = 0; i < childCount; i++) {
                const step = document.createElement('div');

                if (i == positions.at(Array.from(blockContainers).indexOf(container))) drawCircleFill(step)
                else drawCircle(step);

                step.onclick = function () {
                    positions[Array.from(blockContainers).indexOf(container)] = i;
                    container.scrollLeft = contentWidth + (elementWidth/2) - (containerWidth/2)  + (scrollStep * i);

                    for (let j = 0; j < childCount; j++) {
                        if (j == i) drawCircleFill(steps.children[j]);
                        else drawCircle(steps.children[j]);
                    }
                }

                // Añadir el contador al contenedor
                steps.appendChild(step);
            }

            container.parentElement.appendChild(steps);
            container.style.justifyContent = 'flex-start';

            container.scrollLeft = contentWidth + (elementWidth/2) - (containerWidth/2) +
                (scrollStep * positions.at(Array.from(blockContainers).indexOf(container)));
        }
        else container.style.justifyContent = 'center';
    });
}

function drawCircleFill(div){
    div.style.alignSelf = 'center';
    div.style.justifySelf = 'center';

    div.style.margin = '0 5px';
    div.style.width = `${dotsSize}px`;
    div.style.height = `${dotsSize}px`;
    div.style.border = `${borderDotSize}px solid var(--tertiary-color)`;

    div.style.borderRadius = '50%';
    div.style.background = 'var(--tertiary-color)';
}

function drawCircle(div){
    div.style.alignSelf = 'center';
    div.style.justifySelf = 'center';

    div.style.margin = '0 5px';
    div.style.width = `${dotsSize}px`;
    div.style.height = `${dotsSize}px`;
    div.style.border = `${borderDotSize}px solid var(--tertiary-color)`;

    div.style.borderRadius = '50%';
    div.style.background = 'var(--secondary-color)';
}

/*

JODE LOS BOTONES

let updateInterval = 100;
function update(){
    updateAnimBlocks();
    if (updateInterval > 0) setTimeout(update, updateInterval);
}

function setUpdateTimeout(val){
    updateInterval = val;
}

*/


