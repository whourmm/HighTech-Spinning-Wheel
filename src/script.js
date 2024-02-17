 /**
 * Prize data will space out evenly on the deal wheel based on the amount of items available.
 * @param text [string] name of the prize
 * @param color [string] background color of the prize
 * @param reaction ['resting' | 'dancing' | 'laughing' | 'shocked'] Sets the reaper's animated reaction
 */
 const prizes = [
  {
    id: 0,
    question: "Question 1",
    text: "&#128196",
    color: "hsl(48, 98%, 46%)",
    description : "พัฒนาระบบเพื่อส่งเสริมการขายของธุรกิจกองทุนรวม"
  
  },
  { 
    id: 1,
    question: "Question 2",
    text: "&#128196",
    color: "hsl(40, 98%, 46%)",
    description : "พัฒนาระบบแคมเปญหรือระบบโปรโมชั่นของธุรกิจกองทุนรวม"
   
  },
  { 
    id: 2,
    question: "Question 3",
    text: "&#128196",
    color: "hsl(31, 98%, 46%)",
    description : "วิเคราะห์ข้อมูลการออกกองทุนรวมตามประเภทในอุตสาหกรรม เช่น นโยบายกองทุน ค่าธรรมเนียม ผลการดำเนินงาน เป็นต้น"
    
  },
  {
    id: 3,
    question: "Question 4",
    text: "&#128196",
    color: "hsl(21, 98%, 46%)",
    description : "วางแผนการลงทุนที่เหมาะสมให้กับลูกค้า"
    
  },
  {
    id: 4,
    question: "Question 5",
    text: "&#128196",
    color: "hsl(17, 98%, 46%)",
    description : "พัฒนาระบบ ITSM เพื่อติดต่อและติดตามลูกค้า"
  
  },{
    id: 5,
    question: "Question 1",
    text: "&#128196",
    color: "hsl(48, 98%, 46%)",
    description : "พัฒนาระบบเพื่อส่งเสริมการขายของธุรกิจกองทุนรวม"
  
  },
  { 
    id: 6,
    question: "Question 2",
    text: "&#128196",
    color: "hsl(40, 98%, 46%)",
    description : "พัฒนาระบบแคมเปญหรือระบบโปรโมชั่นของธุรกิจกองทุนรวม"
   
  },
  { 
    id: 7,
    question: "Question 3",
    text: "&#128196",
    color: "hsl(31, 98%, 46%)",
    description : "วิเคราะห์ข้อมูลการออกกองทุนรวมตามประเภทในอุตสาหกรรม เช่น นโยบายกองทุน ค่าธรรมเนียม ผลการดำเนินงาน เป็นต้น"
    
  },
  {
    id: 8,
    question: "Question 4",
    text: "&#128196",
    color: "hsl(21, 98%, 46%)",
    description : "วางแผนการลงทุนที่เหมาะสมให้กับลูกค้า"
    
  },
  {
    id: 9,
    question: "Question 5",
    text: "&#128196",
    color: "hsl(17, 98%, 46%)",
    description : "พัฒนาระบบ ITSM เพื่อติดต่อและติดตามลูกค้า"
  
  },
  
];

const wheel = document.querySelector(".deal-wheel");
const spinner = wheel.querySelector(".spinner");
const trigger = wheel.querySelector(".btn-spin");
const ticker = wheel.querySelector(".ticker");


var prizeSlice;
var prizeOffset = Math.floor(180 / prizes.length);
const spinClass = "is-spinning";
const selectedClass = "selected";
const spinnerStyles = window.getComputedStyle(spinner);
let tickerAnim;
let rotation = 0;
let currentSlice = 0;
let prizeNodes;

const createPrizeNodes = () => {
  spinner.innerHTML = "";
  console.log("length: ", prizes.length)
  prizes.forEach(({ text, color}, i) => {
    prizeSlice = 360 / prizes.length;
    const rotation = ((prizeSlice * i) * -1) - prizeOffset;
    
    const prizeText = text ? `<span class="text">${text}</span>` : ""; // Check if text is available

    spinner.insertAdjacentHTML(
      "beforeend",
      `<li class="prize"  style="--rotate: ${rotation}deg">
        <span class="text" style="font-size:60px">${text}</span>
      </li>`
    );
  });
};

const createConicGradient = () => {
  spinner.setAttribute(
    "style",
    `background: conic-gradient(
      from -90deg,
      ${prizes
        .map(({ color }, i) => `${color} 0 ${(100 / prizes.length) * (prizes.length - i)}%`)
        .reverse()
      }
    );`
  );
};


const setupWheel = () => {
  createConicGradient();
  createPrizeNodes();
  prizeNodes = wheel.querySelectorAll(".prize");
};

const spinertia = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const audio2 = new Audio("./Tada.mp3");
const array = [];

const selectPrize = () => {
  var check = -1;
  
  const selected = Math.floor(rotation / prizeSlice);
  prizeNodes[selected].classList.add(selectedClass);
  
  check = selected;
  
  if(check != -1 && prizes.length > 0) {
    
    const removedPrize = prizes.splice(selected, 1)[0];
    console.log(prizes)
    setupWheel();
    audio2.volume = 0.09;
    audio2.play();
    popup.style.display = 'block';
    if (removedPrize.question) {
      document.getElementById("question").innerHTML = removedPrize.question;
      document.getElementById("description").innerHTML = removedPrize.description;
    } else {
      document.getElementById("description").innerHTML = "Try another Once";
    }
  } else {
    console.log("No more prizes left");
  }
    
  };
  


const audio = new Audio("./audio.wav");


trigger.addEventListener("click", () => {
  audio.currentTime = 7;
  audio.play();
  trigger.disabled = true;
  rotation = Math.floor(Math.random() * 360 + spinertia(2000, 5000));
  prizeNodes.forEach((prize) => prize.classList.remove(selectedClass));
  wheel.classList.add(spinClass);
  spinner.style.setProperty("--rotate", rotation);
  ticker.style.animation = "ticker-spin 1s infinite linear";
  
});

spinner.addEventListener("transitionend", () => {
  cancelAnimationFrame(tickerAnim);
  trigger.disabled = false;
  trigger.focus();
  rotation %= 360;
  selectPrize();
  wheel.classList.remove(spinClass);
  spinner.style.setProperty("--rotate", rotation);
});


setupWheel();



const popup = document.getElementById("popup");
const closeBtn = document.getElementById("closeBtn");


closeBtn.addEventListener('click', ()=>{
    popup.style.display = 'none';
});
popup.addEventListener('click', ()=>{
    popup.style.display = 'none';
});
