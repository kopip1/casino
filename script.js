const prizes = [
    { name: "ZONK", weight: 99 },
    { name: "Netflix Premium", weight: 0.25 },
    { name: "Disney Premium", weight: 0.25 },
    { name: "CapCut Pro", weight: 0.25 },
    { name: "Alight Motion", weight: 0.25 }
];

let gachaCount = 0;
const maxGacha = 7;

const button = document.getElementById("gachaBtn");
const result = document.getElementById("result");
const chance = document.getElementById("chance");

// SOUND
const soundClick = document.getElementById("soundClick");
const soundSpin = document.getElementById("soundSpin");
const soundWin = document.getElementById("soundWin");
const soundZonk = document.getElementById("soundZonk");

chance.innerText = `Sisa Gacha: ${maxGacha - gachaCount}`;

button.addEventListener("click", () => {
    if (gachaCount >= maxGacha) return;

    // Click sound
    soundClick.currentTime = 0;
    soundClick.play();

    gachaCount++;
    chance.innerText = `Sisa Gacha: ${maxGacha - gachaCount}`;

    button.classList.add("shake");
    result.innerText = "🎲 Mengocok...";
    result.style.color = "white";

    // Spin sound
    soundSpin.currentTime = 0;
    soundSpin.play();

    setTimeout(() => {
        button.classList.remove("shake");
        soundSpin.pause();

        const random = Math.random() * 100;
        let total = 0;
        let selectedPrize = "ZONK";

        for (let prize of prizes) {
            total += prize.weight;
            if (random <= total) {
                selectedPrize = prize.name;
                break;
            }
        }

        if (selectedPrize === "ZONK") {
            result.innerText = "💀 ZONK!";
            result.style.color = "red";
            soundZonk.currentTime = 0;
            soundZonk.play();
        } else {
            result.innerText = `🎉 SELAMAT! Anda mendapat ${selectedPrize}`;
            result.style.color = "gold";
            soundWin.currentTime = 0;
            soundWin.play();
        }

        if (gachaCount === maxGacha) {
            button.disabled = true;
            chance.innerText = "🚫 Gacha Habis";
        }
    }, 900);
});
