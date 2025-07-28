const typedText = document.getElementById("typed-text");
const text = "I am a Cricketer, Leader, and Inspiration.";
let index = 0;

function type() {
  if (index < text.length) {
    typedText.innerHTML += text.charAt(index);
    index++;
    setTimeout(type, 80);
  }
}

document.addEventListener("DOMContentLoaded", type);
