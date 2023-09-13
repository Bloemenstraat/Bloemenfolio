function setClipboard(text) {
    const type = "text/plain";
    const blob = new Blob([text], { type });
    const data = [new ClipboardItem({ [type]: blob })];
  
    navigator.clipboard.write(data).then(
      () => {
       
      },
      () => {
        
      },
    );
  }

function capitalize(str) {
    if (str == 'C-C++') return str;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

async function displaySkills(arr) {
    let list = document.querySelector('.skills-content > .list');  
    let skillList = [];

    arr.map((elem) => {

        let skill = document.createElement('div');
        skill.className = 'skill-card';

        let skillIcon = document.createElement('img');
        skillIcon.src = `./media/skills/${elem}.svg`;

        let skillText = document.createElement('p');
        skillText.textContent = elem;

        skill.appendChild(skillIcon);
        skill.appendChild(skillText);
        skillList.push(skill);
    });

    list.replaceChildren(...skillList);

    // Animate skills 
    gsap.from('.skill-card', {
        opacity: 0,
        scale: .3,
        stagger: 0.1,
        duration: 0.2
    });

    // TODO : Bug with the web dev height animation
    if (firstLoad) {
        await new Promise(r => setTimeout(r, 2000));
        firstLoad = false;
    
        // Calculate and set the new height
        const content = document.getElementsByClassName('skills-content')[0]
        const container = document.getElementById('skills')

        const computedStyle = getComputedStyle(content);

        // Calculate the total height including padding and margin
        const totalHeight = 
        parseFloat(computedStyle.height) +
        parseFloat(computedStyle.paddingTop) +
        parseFloat(computedStyle.paddingBottom) +
        parseFloat(computedStyle.marginTop) +
        parseFloat(computedStyle.marginBottom);

        container.style.height = `${totalHeight}px`;

        // Trigger a reflow to apply the new height smoothly
        container.offsetHeight;
        container.classList.add("expanded");
    }

}

function switchSkills (event) {

    switch (event.target.id) {
        case 'dev':
            displaySkills(webdev);
            document.getElementById('eln').className = '';
            document.getElementById('ml').className = '';
            document.getElementById('dev').className = 'selected';
            break;
        case 'ml':
            displaySkills(ml);
            document.getElementById('eln').className = '';
            document.getElementById('dev').className = '';
            document.getElementById('ml').className = 'selected';
            break;
        case 'eln':
            displaySkills(eln);
            document.getElementById('dev').className = '';
            document.getElementById('ml').className = '';
            document.getElementById('eln').className = 'selected';
            break;
        default:
            break;
            
    }
}

const webdev = ['Javascript', 'Typescript', 'React', 'NodeJS', 
'Express', 'MongoDB', 'Docker', 'Git'];

const ml = ['Python', 'Tensorflow', 'OpenCV', 'Numpy'];

const eln = ['C-C++', 'STM32', 'Raspberry Pi', 'KiCad'];

let firstLoad = true;
displaySkills(webdev);


// Handle the "Go back up" button
const goup = document.getElementById('goup');

goup.addEventListener('click', () => {
    window.scrollTo({ top: 0 });
});

// Email copy
// TODO : mobile
const copymail = document.getElementById('copymail');
const copied = document.getElementById('copied');
copymail.addEventListener('click', async () => {
    setClipboard('riad.regguem@gmail.com');
    copied.style.display = 'block';
    await new Promise(r => setTimeout(r, 2000));
    copied.style.display = 'none';
});

//###############################
/*----     ANIMATIONS --------*/
//##############################

//------  GO UP -----------//
gsap.to('#goup', {
    scrollTrigger: {
        trigger: '.about',
        start: "top 50",  // Start the animation when the element is 80% in view
        end: "top 0",    // End the animation when the element is 50% in view
        scrub: true  
    },
    opacity: 1,
    ease:Linear.easeNone
})

//----- HERO -------//
gsap.from(".hero .content .photo", {
    x: 15,
    y: 5,
    duration: 1,
    opacity: 0,         
});

gsap.from(".hero .content .info", {
    x: 5,
    y: 50,
    duration: 1,
    opacity: 0,       
});

// ----- ABOUT ---------- //

gsap.from('.about', {
    scrollTrigger: {
        trigger: '.about',
        start: "top 50%",  // Start the animation when the element is 80% in view
        end: "top 0",    // End the animation when the element is 50% in view
        scrub: true  
    },
    opacity: 0,
})

gsap.from('.about .content .photo', {
    scrollTrigger: {
        trigger: '.about',
        start: "top 50%",  // Start the animation when the element is 80% in view
        end: "top 0",    // End the animation when the element is 50% in view
        scrub: true  
    },
    opacity: 0,
    x: -20,
    y: 20,
})

gsap.from('.about .content .info', {
    scrollTrigger: {
        trigger: '.about',
        start: "top 50%",  // Start the animation when the element is 80% in view
        end: "top 0",    // End the animation when the element is 50% in view
        scrub: true  
    },
    opacity: 0,
    x: 0,
    y: 80,
});

// ----- WORK ---------- //
const workards = Array.from(document.getElementsByClassName('workard'));
workards.map((card, i) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: `top 80%`,  // Start the animation when the element is 80% in view
            end: `top 30%`,    // End the animation when the element is 50% in view
            scrub: true  
        },
        opacity: 0,
        x: (i%2 == 0) ? 500 : -500,
    });    
});

// -------- CONTACT --------//
gsap.from('.contact .content', {
    scrollTrigger: {
        trigger: '.contact',
        start: "top 70%",  
        end: "bottom 90%",    
        scrub: true  
    },
    opacity: 0,
    x: 0,
    y: 80,
});