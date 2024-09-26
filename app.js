const hora = document.querySelector(".manecilla#horas");
const minuto = document.querySelector(".manecilla#minutos");
const segundo = document.querySelector(".manecilla#segundos")

const reloj = document.getElementById("clock");
const contenedorNumeros = document.getElementById("numeros");
const punto = document.querySelector(".punto");

const body = document.getElementById("body");

function posicionarNumeros(num, index){
    let angulo = (Math.PI / 180) * (90 - (index * 30));
    let diametro = reloj.clientWidth * 0.8;

    let x = Math.cos(angulo) * (diametro / 2);
    let y = Math.sin(angulo) * (diametro / 2);

    num.style.transform = `translate( calc(-50% - ${-x}px), calc(-50% - ${y}px) )`;
}

for (let index = 1; index <= 12; index++) {
    let numero = document.createElement("span");

    posicionarNumeros(numero, index);

    numero.textContent = index;
    contenedorNumeros.appendChild(numero);
}

window.onresize =  function () {
    contenedorNumeros.childNodes.forEach(element => {
        posicionarNumeros(element, parseInt(element.textContent));
    });
}

function modoOscuro(){
    body.classList.toggle("modo-oscuro");
    localStorage.setItem("modo-oscuro", body.classList.contains("modo-oscuro") ? "1" : "0");
}

punto.addEventListener('click', modoOscuro)
if (localStorage.getItem("modo-oscuro") == "1") {
    body.classList.add("modo-oscuro")
}

function actualizarManecillas(){
    const date = new Date();

    const segundos = date.getSeconds();
    const minutos = date.getMinutes();
    const horas = date.getHours();

    const anguloSegundos = (segundos * 6) + 180;
    const anguloMinutos = (minutos * 6) + (segundos / 10) + 180;
    const anguloHoras = (horas * 30) + (minutos / 2) + 180;

    segundo.style.transform = `rotate(${anguloSegundos}deg)`
    minuto.style.transform = `rotate(${anguloMinutos}deg)`
    hora.style.transform = `rotate(${anguloHoras}deg)`
}

actualizarManecillas()
setInterval(actualizarManecillas, 500)