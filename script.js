// ===============================
// InAmigos Foundation - Advanced Script
// ===============================


// ===============================
// 1. SMOOTH SCROLL (improved)
// ===============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            window.scrollTo({
                top: target.offsetTop - 70, // navbar offset
                behavior: "smooth"
            });
        }
    });
});


// ===============================
// 2. ACTIVE NAV (INTERSECTION OBSERVER - FAST)
// ===============================
const sections = document.querySelectorAll("section, header");
const navLinks = document.querySelectorAll(".nav-links a");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");

            navLinks.forEach(link => {
                link.classList.remove("active");
                if (link.getAttribute("href") === "#" + id) {
                    link.classList.add("active");
                }
            });
        }
    });
}, {
    threshold: 0.4
});

sections.forEach(sec => observer.observe(sec));


// ===============================
// 3. NAVBAR SCROLL EFFECT
// ===============================
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});


// ===============================
// 4. SCROLL PROGRESS BAR (NEW)
// ===============================
const progressBar = document.createElement("div");
progressBar.style.position = "fixed";
progressBar.style.top = "0";
progressBar.style.left = "0";
progressBar.style.height = "3px";
progressBar.style.background = "#4CAF50";
progressBar.style.zIndex = "9999";
progressBar.style.width = "0%";
document.body.appendChild(progressBar);

window.addEventListener("scroll", () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    const scrolled = (scrollTop / scrollHeight) * 100;
    progressBar.style.width = scrolled + "%";
});


// ===============================
// 5. ANIMATED COUNTERS (IMPACT SECTION)
// ===============================
const counters = document.querySelectorAll(".stat h3");

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const targetValue = parseInt(el.innerText.replace(/\D/g, ""));
            let current = 0;

            const increment = targetValue / 80;

            const updateCounter = () => {
                current += increment;

                if (current < targetValue) {
                    el.innerText = Math.floor(current) + "+";
                    requestAnimationFrame(updateCounter);
                } else {
                    el.innerText = targetValue + "+";
                }
            };

            updateCounter();
            counterObserver.unobserve(el);
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));


// ===============================
// 6. BUTTON CLICK MICRO INTERACTION
// ===============================
document.querySelectorAll(".btn").forEach(btn => {
    btn.addEventListener("click", () => {
        btn.classList.add("clicked");

        setTimeout(() => {
            btn.classList.remove("clicked");
        }, 150);
    });
});


// ===============================
// 7. BACK TO TOP BUTTON (NEW)
// ===============================
const topBtn = document.createElement("button");
topBtn.innerText = "↑";
topBtn.style.position = "fixed";
topBtn.style.bottom = "20px";
topBtn.style.right = "20px";
topBtn.style.padding = "10px 14px";
topBtn.style.borderRadius = "50%";
topBtn.style.border = "none";
topBtn.style.background = "#4CAF50";
topBtn.style.color = "white";
topBtn.style.cursor = "pointer";
topBtn.style.display = "none";
topBtn.style.zIndex = "9999";

document.body.appendChild(topBtn);

topBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }
});


// ===============================
// 8. MOBILE MENU TOGGLE (READY)
// ===============================
const nav = document.querySelector(".nav-links");

const menuBtn = document.createElement("button");
menuBtn.innerText = "☰";
menuBtn.style.position = "absolute";
menuBtn.style.right = "20px";
menuBtn.style.top = "15px";
menuBtn.style.fontSize = "22px";
menuBtn.style.background = "transparent";
menuBtn.style.border = "none";
menuBtn.style.cursor = "pointer";
menuBtn.style.display = "none";

document.querySelector(".navbar").appendChild(menuBtn);

menuBtn.addEventListener("click", () => {
    nav.classList.toggle("show");
});

// show menu button on small screens
window.addEventListener("resize", () => {
    if (window.innerWidth < 768) {
        menuBtn.style.display = "block";
    } else {
        menuBtn.style.display = "none";
        nav.classList.remove("show");
    }
});


// ===============================
// 9. GSAP HERO TIMELINE (ADVANCED)
// ===============================
if (typeof gsap !== "undefined") {

    const tl = gsap.timeline();

    tl.from(".tagline", { opacity: 0, y: 20, duration: 0.8 })
      .from(".hero-content h1", { opacity: 0, y: 40, duration: 1 }, "-=0.4")
      .from(".hero-content p", { opacity: 0, y: 30, duration: 1 }, "-=0.6")
      .from(".hero-buttons", { opacity: 0, y: 20, duration: 0.8 }, "-=0.5");
}


// ===============================
// 10. CONSOLE BRANDING
// ===============================
console.log("%c InAmigos Foundation - Advanced UI Loaded 🚀", 
"color: #4CAF50; font-size: 14px; font-weight: bold;");
// ================= DONATION SYSTEM =================

const donateBtn = document.getElementById("donateBtn");
const modal = document.getElementById("donationModal");
const overlay = document.getElementById("donationOverlay");
const closeBtn = document.getElementById("closeDonation");
const proceedBtn = document.getElementById("proceedDonation");
const customAmount = document.getElementById("customAmount");
const amountButtons = document.querySelectorAll(".amount");

let selectedAmount = 0;

// OPEN MODAL
donateBtn.addEventListener("click", (e) => {
    e.preventDefault();
    modal.style.display = "block";
    overlay.style.display = "block";
});

// CLOSE MODAL
function closeModal(){
    modal.style.display = "none";
    overlay.style.display = "none";
}

closeBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

// SELECT PRESET AMOUNT
amountButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        selectedAmount = btn.dataset.value;
        customAmount.value = "";
    });
});

// CUSTOM AMOUNT OVERRIDE
customAmount.addEventListener("input", () => {
    selectedAmount = customAmount.value;
});

// PROCEED (HOOK FOR PAYMENT)
proceedBtn.addEventListener("click", () => {

    if(!selectedAmount || selectedAmount <= 0){
        alert("Please select or enter a valid amount");
        return;
    }

    // TEMP ACTION (replace with Razorpay later)
    alert(`Proceeding with donation of ₹${selectedAmount}`);

    // Example redirect (future integration)
    // window.location.href = `/payment?amount=${selectedAmount}`;

    closeModal();
});
