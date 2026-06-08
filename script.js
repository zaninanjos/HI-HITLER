// Referências dos elementos do HTML
const speedDisplay = document.getElementById('speed');
const driftDisplay = document.getElementById('driftPoints');
const carSelect = document.getElementById('carSelect');

// Configuração do Canvas (onde a mágica visual vai acontecer)
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Estado do Jogo
let speed = 0;
let driftPoints = 0;
let selectedCar = "0";
const keys = {};

// Monitoramento do teclado
window.addEventListener('keydown', (e) => keys[e.key.toLowerCase()] = true);
window.addEventListener('keyup', (e) => keys[e.key.toLowerCase()] = false);

// Troca de carro
carSelect.addEventListener('change', (e) => {
    selectedCar = e.target.value;
    console.log(`Carro alterado para o ID: ${selectedCar}`);
    // Aqui você pode mudar a física ou o sprite do carro no futuro
});

// Loop principal do jogo
function gameLoop() {
    // Limpar a tela
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Lógica simples de aceleração para testar a UI
    if (keys['w'] || keys['arrowup']) {
        if (speed < 180) speed += 1.5; // Acelera até 180 km/h
    } else {
        if (speed > 0) speed -= 0.8; // Desacelera sozinho
    }

    // Simulação rudimentar de drift ao curvar rápido em alta velocidade
    if ((keys['a'] || keys['arrowleft'] || keys['d'] || keys['arrowright']) && speed > 80) {
        driftPoints += Math.floor(speed / 20);
    }

    // Atualiza a telemetria na tela
    speedDisplay.textContent = Math.floor(speed);
    driftDisplay.textContent = `DRIFT: ${driftPoints}`;

    // Desenha um fundo de pista temporário
    ctx.fillStyle = '#222';
    ctx.fillRect(0, canvas.height / 2, canvas.width, canvas.height / 2);

    requestAnimationFrame(gameLoop);
}

// Inicia o jogo
gameLoop();
