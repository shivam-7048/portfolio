// ---------------- XP SYSTEM ----------------
let xp = localStorage.getItem("xp") || 0;
let level = localStorage.getItem("level") || 1;

function updateXP(){
  document.getElementById("level").innerText = level;
  document.getElementById("xp-fill").style.width = xp + "%";
}
updateXP();

function gainXP(val){
  xp = parseInt(xp) + val;
  if(xp >= 100){
    level++;
    xp = 0;
    alert("LEVEL UP 🚀");
  }
  localStorage.setItem("xp", xp);
  localStorage.setItem("level", level);
  updateXP();
}

// ---------------- TYPING EFFECT ----------------
let text = "Hi, I'm Shivam Sharma 🚀";
let i = 0;
function type(){
  if(i < text.length){
    document.getElementById("typing").innerHTML += text.charAt(i);
    i++;
    setTimeout(type,50);
  }
}
type();

// ---------------- SKILLS ANIMATION ----------------
window.addEventListener("scroll", ()=>{
  document.querySelectorAll(".skill").forEach(skill=>{
    if(skill.getBoundingClientRect().top < window.innerHeight){
      skill.querySelector(".fill").style.width = skill.dataset.level + "%";
      gainXP(2);
    }
  });
});

// ---------------- MINI GAME ----------------
function startGame(){
  let game = document.getElementById("game");
  game.classList.remove("hidden");

  let orb = document.getElementById("orb");

  setInterval(()=>{
    orb.style.top = Math.random()*300 + "px";
    orb.style.left = Math.random()*300 + "px";
  },1000);

  orb.onclick = ()=>{
    gainXP(10);
  };
}

// ---------------- CHATBOT ----------------
document.getElementById("chatInput").addEventListener("keypress", function(e){
  if(e.key === "Enter"){
    let input = this.value.toLowerCase();
    let reply = "🤖 Hmm...";

    if(input.includes("skills")) reply = "HTML, JS, C++, Python, IoT";
    if(input.includes("iot")) reply = "Arduino + Pi Pico expert 🔥";

    document.getElementById("chatbox").innerHTML += `<p>${input}</p><p>${reply}</p>`;
    this.value="";
  }
});

// ---------------- GITHUB API ----------------
fetch("https://api.github.com/users/YOUR_USERNAME/repos")
.then(res=>res.json())
.then(data=>{
  let reposDiv = document.getElementById("repos");
  data.slice(0,5).forEach(repo=>{
    reposDiv.innerHTML += `<div>${repo.name}</div>`;
  });
});

// ---------------- THREE JS BACKGROUND ----------------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, innerWidth/innerHeight,0.1,1000);
const renderer = new THREE.WebGLRenderer({canvas:document.getElementById("bg")});

renderer.setSize(innerWidth,innerHeight);
camera.position.z = 5;

const geometry = new THREE.BufferGeometry();
const vertices = [];

for(let i=0;i<5000;i++){
  vertices.push(
    Math.random()*100-50,
    Math.random()*100-50,
    Math.random()*100-50
  );
}

geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices,3));
const material = new THREE.PointsMaterial({color:0x00ffff});
const points = new THREE.Points(geometry,material);

scene.add(points);

function animate(){
  requestAnimationFrame(animate);
  points.rotation.y += 0.0005;
  renderer.render(scene,camera);
}
animate();