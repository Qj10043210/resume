const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

ctx.strokeStyle = '#804000';
ctx.lineWidth = 2;

const drawM = (x, y) => {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y - 30);
    ctx.lineTo(x + 10, y - 15);
    ctx.lineTo(x + 20, y - 30);
    ctx.lineTo(x + 20, y);
    ctx.stroke();
};

const drawA = (x, y) => {
    ctx.beginPath();
    ctx.moveTo(x + 5, y);
    ctx.lineTo(x + 10, y - 30);
    ctx.lineTo(x + 15, y);
    ctx.moveTo(x + 7, y - 15);
    ctx.lineTo(x + 13, y - 15);
    ctx.stroke();
};

const drawI = (x, y) => {
    ctx.beginPath();
    ctx.moveTo(x + 10, y);
    ctx.lineTo(x + 10, y - 30);
    ctx.stroke();
};

const drawN = (x, y) => {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y - 30);
    ctx.lineTo(x + 20, y);
    ctx.lineTo(x + 20, y - 30);
    ctx.stroke();
};

const drawH = (x, y) => {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y - 30);
    ctx.moveTo(x + 20, y);
    ctx.lineTo(x + 20, y - 30);
    ctx.moveTo(x, y - 15);
    ctx.lineTo(x + 20, y - 15);
    ctx.stroke();
};

const drawU = (x, y) => {
    ctx.beginPath();
    ctx.moveTo(x, y - 30);
    ctx.lineTo(x, y - 10);
    ctx.quadraticCurveTo(x + 10, y, x + 20, y - 10);
    ctx.lineTo(x + 20, y - 30);
    ctx.stroke();
};

const drawB = (x, y) => {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y - 30);
    ctx.moveTo(x, y);
    ctx.quadraticCurveTo(x + 10, y - 5, x, y - 15);
    ctx.moveTo(x, y - 15);
    ctx.quadraticCurveTo(x + 10, y - 20, x, y - 30);
    ctx.stroke();
};

const drawO = (x, y) => {
    ctx.beginPath();
    ctx.arc(x + 10, y - 15, 10, 0, 2 * Math.PI);
    ctx.stroke();
};

const drawF = (x, y) => {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y - 30);
    ctx.moveTo(x, y - 30);
    ctx.lineTo(x + 15, y - 30);
    ctx.moveTo(x, y - 15);
    ctx.lineTo(x + 10, y - 15);
    ctx.stroke();
};

const drawL = (x, y) => {
    ctx.beginPath();
    ctx.moveTo(x, y - 30);
    ctx.lineTo(x, y);
    ctx.lineTo(x + 10, y);
    ctx.stroke();
};

const drawE = (x, y) => {
    ctx.beginPath();
    ctx.moveTo(x, y - 30);
    ctx.lineTo(x, y);
    ctx.moveTo(x, y - 30);
    ctx.lineTo(x + 15, y - 30);
    ctx.moveTo(x, y - 15);
    ctx.lineTo(x + 10, y - 15);
    ctx.moveTo(x, y);
    ctx.lineTo(x + 15, y);
    ctx.stroke();
};

const drawK = (x, y) => {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y - 30);
    ctx.moveTo(x, y - 15);
    ctx.lineTo(x + 15, y - 30);
    ctx.moveTo(x, y - 15);
    ctx.lineTo(x + 15, y);
    ctx.stroke();
};

const drawY = (x, y) => {
    ctx.beginPath();
    ctx.moveTo(x, y - 30);
    ctx.lineTo(x + 7, y - 15);
    ctx.lineTo(x + 15, y - 30);
    ctx.moveTo(x + 7, y - 15);
    ctx.lineTo(x + 7, y);
    ctx.stroke();
};

const drawG = (x, y) => {
    ctx.beginPath();
    ctx.arc(x + 10, y - 15, 10, 0, 2 * Math.PI);
    ctx.moveTo(x + 20, y - 15);
    ctx.lineTo(x + 10, y - 15);
    ctx.lineTo(x + 10, y - 20);
    ctx.stroke();
};

const drawJ = (x, y) => {
    ctx.beginPath();
    ctx.moveTo(x + 10, y - 30);
    ctx.lineTo(x + 10, y - 10);
    ctx.quadraticCurveTo(x + 10, y, x, y);
    ctx.lineTo(x - 10, y - 10);
    ctx.stroke();
};

const drawCharacter = (char, x, y) => {
    switch (char) {
        case 'M': drawM(x, y); break;
        case 'a': drawA(x, y); break;
        case 'i': drawI(x, y); break;
        case 'n': drawN(x, y); break;
        case 'H': drawH(x, y); break;
        case 'U': drawU(x, y); break;
        case 'B': drawB(x, y); break;
        case 'O': drawO(x, y); break;
        case 'F': drawF(x, y); break;
        case 'L': drawL(x, y); break;
        case 'E': drawE(x, y); break;
        case 'K': drawK(x, y); break;
        case 'Y': drawY(x, y); break;
        case 'G': drawG(x, y); break;
        case 'J': drawJ(x, y); break;
    }
};

const drawTextStepByStep = (text, x, y, interval) => {
    const chars = text.split('');
    chars.forEach((char, index) => {
        setTimeout(() => {
            drawCharacter(char, x + index * 30, y);
        }, index * interval);
    });
};

drawTextStepByStep('Main', 20, 60, 500);
drawTextStepByStep('Hub of', 20, 120, 500);
drawTextStepByStep('Lee Kyung Jin', 20, 180, 500);
