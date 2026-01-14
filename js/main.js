

/*---------------about section tabs------------*/
(() =>{
    const aboutSection = document.querySelector(".about-section"),
    tabsContainer = document.querySelector(".about-tabs");

    tabsContainer.addEventListener("click", (event) =>{
      if(event.target.classList.contains("tab-items") &&
      !event.target.classList.contains("active")) {
      const target = event.target.getAttribute("data-target");
      tabsContainer.querySelector(".active").classList.remove("outer-shadow" , "active");
      event.target.classList.add("active" , "outer-shadow");
      aboutSection.querySelector(".tab-content.active").classList.remove("active");
      aboutSection.querySelector(target).classList.add("active");
           }
    })
})();
/*-----------------------hide all section except active------------------------*/
(()=>{
  const section = document.querySelectorAll(".section");
  section.forEach((section) => {
    if(!section.classList.contains("active")){
      section.classList.add("hide");
    }
  });

})();


/*---------------aside------------*/

const nav = document.querySelector(".nav"),
navList = nav.querySelectorAll("li"),
totalNavList = navList.length,
allSection = document.querySelectorAll(".section"),
totalSection = allSection.length;
for(let i=0; i<totalNavList; i++)
{
   const a = navList[i].querySelector("a");
   a.addEventListener("click", function()
   {
    for(let j=0; j<totalNavList; j++)
    {
      navList[j].querySelector("a").classList.remove("active");
    }
    this.classList.add("active")
    showSection(this);
    if(window.innerWidth < 1200)
    {
      asideSectionTogglerBtn();
    }
   })
}
function showSection(element)
{
  for(let i=0; i<totalSection; i++){
    allSection[i].classList.remove("active");
  }
  const target = element.getAttribute("href").split("#")[1];
  document.querySelector("#" + target).classList.add("active");
}
const navTogglerBtn = document.querySelector(".nav-toggler"),
aside = document. querySelector(".aside");
navTogglerBtn.addEventListener("click", () =>
{
asideSectionTogglerBtn();
})
function asideSectionTogglerBtn()
{
  aside.classList.toggle("open");
  navTogglerBtn.classList.toggle("open");
  for (let i=0; i<totalSection; i++ )
    allSection[i]. classList.toggle("open");
}
document.addEventListener("DOMContentLoaded", function () {
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  window.scrollTo(0, 0);
});

/*---------------typin  animation-----------*/
var typed = new Typed(".typing",{
  strings:["","Web Designer","web Developer","WordPress Developer"],
  typeSpeed:100,
  BackSpeed:60,
  loop:true
})


  const scrollBtn = document.getElementById("scrollTopBtn");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollBtn.style.display = "flex";
    } else {
      scrollBtn.style.display = "none";
    }
  });

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
/*---------------------  portfolio project preview ----------------*/



const preview = document.getElementById('projectPreview');
const frame = document.getElementById('previewFrame');

document.querySelectorAll('.view-project').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();

    frame.src = btn.dataset.url;
    preview.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

document.querySelector('.close-preview').addEventListener('click', () => {
  preview.classList.remove('active');
  frame.src = '';
  document.body.style.overflow = '';
});


/*============================ service rain ================*/

document.addEventListener("DOMContentLoaded", () => {

  const globalRain = document.getElementById("global-rain");
  let rainInterval = null;

  document.querySelectorAll(".Service-items-inner").forEach(card => {
    const icon = card.querySelector(".icon i");
    if (!icon) return;

    const iconClass = icon.className;

    card.addEventListener("mouseenter", () => {
      if (rainInterval) return;

      rainInterval = setInterval(() => {
        const drop = document.createElement("i");
        drop.className = iconClass + " global-rain-icon";

        drop.style.left = Math.random() * 100 + "vw";
        drop.style.animationDuration = (3 + Math.random() * 2) + "s";

        globalRain.appendChild(drop);

        setTimeout(() => drop.remove(), 3500);
      }, 120);
    });

    card.addEventListener("mouseleave", () => {
      clearInterval(rainInterval);
      rainInterval = null;
    });
  });

});


// document.addEventListener("DOMContentLoaded", () => {

//   const thunder = new Audio("/Elwan-portfolio-main/assets/sound/thunder.mp3");
//   thunder.volume = 0.2;

//   let thunderPlayed = false;
//   let soundUnlocked = false;

//   // أول تفاعل يفتح إذن الصوت
//   document.body.addEventListener("click", () => {
//     thunder.play().then(() => {
//       thunder.pause();
//       thunder.currentTime = 0;
//       soundUnlocked = true;
//     });
//   }, { once: true });

//   document.querySelectorAll(".Service-items-inner").forEach(card => {

//     card.addEventListener("mouseenter", () => {
//       if (!thunderPlayed && soundUnlocked) {
//         thunder.currentTime = 0;
//         thunder.play();
//         thunderPlayed = true;
//       }
//     });

//   });

// });

/*===========================scroll active nav menue li================*/

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav a");

let isClickScrolling = false;

// عند الضغط على لينك
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    isClickScrolling = true;

    navLinks.forEach(l => l.classList.remove("active"));
    link.classList.add("active");

    setTimeout(() => {
      isClickScrolling = false;
    }, 800); // مدة الـ scroll
  });
});

// عند الـ scroll
window.addEventListener("scroll", () => {

  if (isClickScrolling) return;

  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 150;
    const sectionHeight = section.offsetHeight;

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });

});







// const items = document.querySelectorAll(".service-item");
// const previews = document.querySelectorAll(".preview");

// function activate(id) {
//   items.forEach(i => i.classList.remove("active"));
//   previews.forEach(p => p.classList.remove("active"));

//   document.querySelector(`[data-service="${id}"]`).classList.add("active");
//   document.getElementById(id).classList.add("active");
// }

// items.forEach(item => {
//   const id = item.dataset.service;

//   item.addEventListener("mouseenter", () => {
//     if (window.innerWidth > 768) activate(id);
//   });

//   item.addEventListener("click", () => {
//     if (window.innerWidth <= 768) activate(id);
//   });
// });














