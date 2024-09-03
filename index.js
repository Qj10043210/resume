import elevator from "./elevator.js";
import screen from "./screen.js";
import div from "./Div.js";
const jsonPath1 = "./skill.json";
const jsonPath2 = "./prj.json";
let skills = null;
let prjs = null;
let ourList = ["Info", "Skills", "Projects", "Contact"];
let ourInfo = ["https://github.com/Qj10043210","01064040446","jincode1004@gmail.com","./file/resume.pdf"]
let canvas = document.getElementById("lkjside_right_canvas");
let mains = document.getElementById("lkjall");
let screens = document.querySelectorAll(".lkjside_middle");
let isScrolling = false;
let isScrollUP = false;
let imgsource = [];
let elvator_button_boxes = document.querySelectorAll(
    ".lkjside_left_box_body_buttons"
);
let elvator_buttons = document.querySelectorAll(
    ".lkjside_left_box_body_buttons_button"
);
let prj_buttons = null;
let prj_view_length = 0;
let prj_view=0;
elvator_buttons[0].style.color = "rgb(255,251,0)";
elvator_buttons[0].style.border = "outset";
imgsource.push({
    name: "ele",
    url: "./img/girl2.png",
});
let Elevator = new elevator(ourList, canvas, mains, imgsource);
let Screen = new screen(screens);
let DivMainInfoMsg = new div(
    document.getElementById("lkjside_middle_info_msg")
);
document.addEventListener("DOMContentLoaded", function () {
    actionDefault();
    Elevator.eledraw(0);
    fetchJSONFile(jsonPath1)
        .then((data) => {
            skills = data.skills;
            actionInsertSkills(skills);
        })
        .catch((error) => {
            console.error(error);
        });
    fetchJSONFile(jsonPath2)
        .then((data) => {
            prjs = data.prjs;
            actionInsertPrjs(prjs);
        })
        .catch((error) => {
            console.error(error);
        });
});
window.addEventListener("resize", () => {
    actionDefault();
});
window.addEventListener(
    "wheel",
    async (event) => {
        event.preventDefault();
        if (!isScrolling) {
            isScrolling = true;
            actionSidebar(false);
            let temp = 0;
            if (event.deltaY > 0) {
                temp = Screen.screenNext();
            } else {
                temp = Screen.screenPrev();
            }
            document.getElementById("lkjside_right_canvas_msg").innerText =
                ourList[temp];
            elvator_buttons.forEach((btn, idx) => {
                if (idx === temp) {
                    btn.style.color = "rgb(255,251,0)";
                    btn.style.border = "outset";
                } else {
                    btn.style.color = "rgb(82,82,82)";
                    btn.style.border = "outset";
                }
            });
            await Elevator.eledraw(temp);
            actionCheckLevel(temp);
            isScrolling = false;
        }
    },
    { passive: false }
);
window.addEventListener(
    "touchstart",
    (event) => {
        temp = Screen.touchStart(event);
    },
    false
);
window.addEventListener(
    "touchmove",
    async (event) => {
        event.preventDefault();
        if (!isScrolling) {
            isScrolling = true;
            actionSidebar(false);
            let temp = Screen.touchMouve(event);
            document.getElementById("lkjside_right_canvas_msg").innerText =
                ourList[temp];
            await Elevator.eledraw(temp);
            actionCheckLevel(temp);
            isScrolling = false;
        }
    },
    false
);


//test
elvator_button_boxes.forEach((button, index) => {
    button.addEventListener("click", async () => {
        if (!isScrolling) {
            elvator_buttons.forEach((btn, idx) => {
                if (idx === index) {
                    btn.style.color = "rgb(223, 222, 193)";
                    btn.style.border = "inset";
                } else {
                    btn.style.color = "rgb(82,82,82)";
                    btn.style.border = "outset";
                }
            });
            isScrolling = true;
            Screen.screenScroll(index);
            document.getElementById("lkjside_right_canvas_msg").innerText =
                ourList[index];
            await Elevator.eledraw(index);
            actionCheckLevel(index);
            elvator_buttons.forEach((btn, idx) => {
                if (idx === index) {
                    btn.style.color = "rgb(255,251,0)";
                    btn.style.border = "outset";
                }
            });
            isScrolling = false;
        }
    });
});
document
    .getElementById("lkjside_right_canvas")
    .addEventListener("click", async (event) => {
        let tempResult = Elevator.clickChar(event);
        if (tempResult >= 9) {
            let targetLevel = tempResult - 10;
            if (targetLevel == 4) {
                targetLevel = 3;
            }
            if (targetLevel == -1) {
                targetLevel = 0;
            }
            actionMove(targetLevel, false);
        }
    });
document
    .getElementById("lkjside_left_box_bottom")
    .addEventListener("click", () => {
        let nowWidth = window.innerWidth;
        if (nowWidth >= 700) {
            let temp = document.getElementById("lkjside_left_box_in").clientHeight;
            if (!isScrollUP) {
                document.getElementById("lkjside_left_box").style.top = `-${temp}px`;
                document.getElementById("lkjside_left_box_bottom").style.clipPath =
                    "polygon(15% 20%, 48% 80%, 85% 20%)";
            } else {
                document.getElementById("lkjside_left_box").style.top = `0px`;
                document.getElementById("lkjside_left_box_bottom").style.clipPath =
                    "polygon(15% 80%, 48% 20%, 85% 80%)";
            }
            isScrollUP = !isScrollUP;
        } else {
            let temp = document.getElementById("lkjside_left_box_in").clientWidth;
            if (!isScrollUP) {
                document.getElementById("lkjside_left_box").style.left = `-${temp}px`;
                document.getElementById("lkjside_left_box_bottom").style.clipPath =
                    "polygon(3% 5%, 95% 50%, 3% 95%)";
            } else {
                document.getElementById("lkjside_left_box").style.left = `0px`;
                document.getElementById("lkjside_left_box_bottom").style.clipPath =
                    "polygon(3% 50%, 95% 5%, 95% 95%)";
            }
            isScrollUP = !isScrollUP;
        }
    });
document.getElementById('lkjside_middle_prj').addEventListener('click',async (event)=>{
    if(event.target.classList.contains('lkjside_middle_prj_box_in_info_button_img')){
        if(event.target.dataset.url != ""){
            window.open(event.target.dataset.url)
            return;
        }
        return;
    }
    if(event.target.classList.contains('lkjside_middle_prj_box_in_info_button_git')){
        if(event.target.dataset.git != ""){
            window.open(event.target.dataset.git)
            return;
        }
        return;
    }
    if(event.target.classList.contains('lkjside_middle_prj_box_more')){
        if(prj_view==0){
            prj_view++;                        
            document.getElementById(`lkjside_middle_prj_box_ex_${prj_view}`).classList.remove('off')
            await Elevator.sleep(150)
            document.getElementById(`lkjside_middle_prj_box`).style.transform='translate(-150%,0% )'            
            document.getElementById(`lkjside_middle_prj_box_ex_${prj_view}`).style.transform='translate(0%,0%)'
            document.getElementById('prjNav').classList.remove('off')
            document.getElementById('prjNavCurrent').innerText = prj_view;
        }
    }
    if(event.target.id=="prjNavPrev"){
        if(prj_view==1){
            document.getElementById('prjNav').classList.add('off')
            document.getElementById(`lkjside_middle_prj_box`).style.transform='translate(0%,0% )'            
            document.getElementById(`lkjside_middle_prj_box_ex_${prj_view}`).style.transform='translate(150%,0%)'
            await Elevator.sleep(550)
            document.getElementById(`lkjside_middle_prj_box_ex_${prj_view}`).classList.add('off')
            prj_view--;
        }else{
            prj_view--;   
            document.getElementById('prjNavCurrent').innerText = prj_view;         
            document.getElementById(`lkjside_middle_prj_box_ex_${prj_view}`).classList.remove('off')
            document.getElementById(`lkjside_middle_prj_box_ex_${prj_view}`).style.transform='translate(-150%,0%)'
            await Elevator.sleep(150)
            document.getElementById(`lkjside_middle_prj_box_ex_${prj_view+1}`).style.transform='translate(150%,0%)'
            document.getElementById(`lkjside_middle_prj_box_ex_${prj_view}`).style.transform='translate(0%,0%)'
            await Elevator.sleep(550)
            document.getElementById(`lkjside_middle_prj_box_ex_${prj_view+1}`).classList.add('off')
            
        }
        return;
    }
    if(event.target.id=="prjNavNext"){
        if(prj_view<prj_view_length){
            prj_view++;                
            document.getElementById('prjNavCurrent').innerText = prj_view;        
            document.getElementById(`lkjside_middle_prj_box_ex_${prj_view}`).classList.remove('off')
            await Elevator.sleep(150)
            document.getElementById(`lkjside_middle_prj_box_ex_${prj_view-1}`).style.transform='translate(-150%,0%)'
            document.getElementById(`lkjside_middle_prj_box_ex_${prj_view}`).style.transform='translate(0%,0%)'
            await Elevator.sleep(550)
            document.getElementById(`lkjside_middle_prj_box_ex_${prj_view-1}`).classList.add('off')
            
        }
        return
    }

})
document.getElementById('lkjside_middle_contact_box').addEventListener('click',(event)=>{
    if(event.target.classList.contains('contact_git')){
        window.open(ourInfo[0]);
    }else if(event.target.classList.contains('contact_phone')){

        navigator.clipboard.writeText(ourInfo[1]).then(function(){
            alert("클립보드에 복사되었습니다.")
        }, function(err){
            return;
        })
        return;
    }else if(event.target.classList.contains('contact_email')){
        navigator.clipboard.writeText(ourInfo[2]).then(function(){
            alert("클립보드에 복사되었습니다.")
        }, function(err){
            return;
        })
        return;
    }else if(event.target.classList.contains('contact_resume')){
        window.open(ourInfo[3], '_blank');
    }else if(event.target.classList.contains('contact_resume_down')){
        let link = document.createElement('a');
        link.href = ourInfo[3];
        link.download = '이력서';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    
})



function actionDefault(def = 0) {
    Elevator.updateSize(mains);
    Screen.screenScroll(def);
    document.getElementById("lkjside_right_canvas_msg").innerText = ourList[def];
    elvator_buttons.forEach((btn, idx) => {
        if (idx === def) {
            btn.style.color = "rgb(255,251,0)";
            btn.style.border = "outset";
        } else {
            btn.style.color = "rgb(82,82,82)";
            btn.style.border = "outset";
        }
    });
    // if (DivMainInfoMsg.checkScroll()) {
    //     document
    //         .getElementById("lkjside_middle_info_msg_buttons")
    //         .classList.add("on");
    // } else {
    //     document
    //         .getElementById("lkjside_middle_info_msg_buttons")
    //         .classList.remove("on");
    // }
    actionCheckLevel(def);
    actionSidebar();
}

function actionSidebar(force = true) {
    let nowWidth = window.innerWidth;
    force ? (isScrollUP = isScrollUP) : (isScrollUP = true);
    if (nowWidth >= 700) {
        let temp = document.getElementById("lkjside_left_box_in").clientHeight;
        if (isScrollUP) {
            document.getElementById("lkjside_left_box").style.top = `-${temp}px`;
            document.getElementById("lkjside_left_box").style.left =
                "calc((var(--custom-box-head-size) / 2) - 20px)";
            document.getElementById("lkjside_left_box_bottom").style.clipPath =
                "polygon(15% 20%, 48% 80%, 85% 20%)";
        } else {
            document.getElementById("lkjside_left_box").style.top = `0px`;
            document.getElementById("lkjside_left_box").style.left =
                "calc((var(--custom-box-head-size) / 2) - 20px)";
            document.getElementById("lkjside_left_box_bottom").style.clipPath =
                "polygon(15% 80%, 48% 20%, 85% 80%)";
        }
    } else {
        let temp = document.getElementById("lkjside_left_box_in").clientWidth;
        console.log(temp);
        if (isScrollUP) {
            document.getElementById("lkjside_left_box").style.top =
                "calc((var(--custom-box-head-size) / 2) - 20px)";
            document.getElementById("lkjside_left_box").style.left = `-${temp}px`;
            document.getElementById("lkjside_left_box_bottom").style.clipPath =
                "polygon(3% 5%, 95% 50%, 3% 95%)";
        } else {
            document.getElementById("lkjside_left_box").style.top =
                "calc((var(--custom-box-head-size) / 2) - 20px)";
            document.getElementById("lkjside_left_box").style.left = `0px`;
            document.getElementById("lkjside_left_box_bottom").style.clipPath =
                "polygon(3% 50%, 95% 5%, 95% 95%)";
        }
    }
}
function actionInsertPrjs(prjs) {
    if (prjs.length == 0) {
        return;
    }
    document.getElementById("lkjside_middle_prj").innerHTML = "";
    let newBox = document.createElement('div');
    newBox.id="lkjside_middle_prj_box"
    document.getElementById("lkjside_middle_prj").appendChild(newBox)
    document.getElementById("lkjside_middle_prj_box").innerHTML = "";
    let prjLength = prjs.length;
    for (let prj of prjs) {
        if (prj.lang.includes("prj")) {            
            let lkjside_middle_prj_box_in_info_lang = "";
            for (let ess of prj.arg.ess) {
                lkjside_middle_prj_box_in_info_lang += `<span class="lkjside_middle_prj_box_in_info_lang">${ess}</span>`;
            }
            let newDiv = document.createElement("div");
            newDiv.className = "lkjside_middle_prj_box_in";
            newDiv.innerHTML = `
             
                    <div class="lkjside_middle_prj_box_in_img">
                        <div class="lkjside_middle_prj_box_in_img_back back_${prj.name
                }"></div>
                        <div class="lkjside_middle_prj_box_in_img_back_in back_${prj.name
                }"></div>                           
                    </div>
                    <div class="lkjside_middle_prj_box_in_info">
                        <div class="lkjside_middle_prj_box_in_info_title">
                            <span class="lkjside_middle_prj_box_in_info_title_name">@</span>
                            ${prj.name}
                            <span class="lkjside_middle_prj_box_in_info_title_check ${prj.done ? "done" : "notyet"
                }"></span>
                        </div>
                        <div class="lkjside_middle_prj_box_in_info_langs">
                            <span>주요 언어 : </span>
                            ${lkjside_middle_prj_box_in_info_lang}
                        </div>
                        <div class="lkjside_middle_prj_box_in_info_msg">
                            <span>상세 설명 : </span>
                            ${prj.cmt}
                        </div>
                        <div class="lkjside_middle_prj_box_in_info_buttons">                        
                            <p class="lkjside_middle_prj_box_in_info_button ${prj.arg.type == "img" ? "no" : ""
                } ${prj.arg.type == "img" ? "" : "lkjside_middle_prj_box_in_info_button_img"
                }" 
                            data-url="${prj.arg.url}"
                            >
                                사이트 이동                                
                                <span class="textoverlap lkjside_middle_prj_box_in_info_button_img" data-url="${prj.arg.url
                }">↗</span>
                            </p>
                            <p class="lkjside_middle_prj_box_in_info_button lkjside_middle_prj_box_in_info_button_git"
                            data-git="${prj.arg.git}">
                                코드 확인
                                <span class="textoverlap lkjside_middle_prj_box_in_info_button_git" data-git="${prj.arg.git
                }">↗</span>
                            </p>                            
                        </div>
                    </div>
                
        `;
            document.getElementById("lkjside_middle_prj_box").appendChild(newDiv);
            let temps = document.querySelectorAll(`.back_${prj.name}`);
            for (let temp of temps) {
                let imagePath = `./img/sites/${prj.name}.png`;
                let img = new Image();
                img.onload = function () {
                    temp.style.backgroundImage = `url("${imagePath}")`;
                };
                img.onerror = function () {
                    console.error("Image not fond :", imagePath);
                };
                img.src = imagePath;
            }
        }
    }
    let lastDiv = document.createElement('div');
    lastDiv.className='lkjside_middle_prj_box_more'
    lastDiv.innerHTML=`<span class="lkjside_middle_prj_box_more">more projects →</span>`
    document.getElementById("lkjside_middle_prj_box").appendChild(lastDiv);
    prj_buttons = document.querySelectorAll('lkjside_middle_prj_box_in_info_button');
    actionInsertAdditonal(prjLength, prjs,4)
}
function actionInsertAdditonal(length, prjs,nums){
    let indexes = Math.floor(length / nums) + 1;
    prj_view_length = indexes;
    let newArray = new Array(indexes).fill().map(() => []);
    let newPrjs = Array.from(prjs)
    for(let i =0; i<indexes; i++){
        for(let j=0; j<nums;j++){
            if(newPrjs.length>0){
                let temp = newPrjs.pop()
                newArray[i].push(temp)    
            }
        }
    }
    let newNavDiv = document.createElement('div');
    newNavDiv.id="prjNav"
    newNavDiv.className="off"
    newNavDiv.innerHTML=`
        <span id="prjNavPrev">◀</span><span id="prjNavCurrent"></span><span id="prjNavNext">▶</span>
    `
    for(let [index, arrs] of newArray.entries()){
        let newMsgDiv = document.createElement('div');
        let indexs = index+1;
        newMsgDiv.className='lkjside_middle_prj_box_ex';
        newMsgDiv.classList.add('off')
        newMsgDiv.id=`lkjside_middle_prj_box_ex_${indexs}`;
        document.getElementById('lkjside_middle_prj').appendChild(newMsgDiv);
        

        for(let prj of arrs){
            let lkjside_middle_prj_box_in_info_lang = "";
            for (let ess of prj.arg.ess) {
                lkjside_middle_prj_box_in_info_lang += `<span class="lkjside_middle_prj_box_in_info_lang">${ess}</span>`;
            }
            let newDiv = document.createElement("div");
            newDiv.className = "lkjside_middle_prj_box_in";
            newDiv.innerHTML = `
             
                    <div class="lkjside_middle_prj_box_in_img">
                        <div class="lkjside_middle_prj_box_in_img_back back_${prj.name
                }"></div>
                        <div class="lkjside_middle_prj_box_in_img_back_in back_${prj.name
                }"></div>                           
                    </div>
                    <div class="lkjside_middle_prj_box_in_info">
                        <div class="lkjside_middle_prj_box_in_info_title">
                            <span class="lkjside_middle_prj_box_in_info_title_name">@</span>
                            ${prj.name}
                            <span class="lkjside_middle_prj_box_in_info_title_check ${prj.done ? "done" : "notyet"
                }"></span>
                        </div>
                        <div class="lkjside_middle_prj_box_in_info_langs">
                            <span>주요 언어 : </span>
                            ${lkjside_middle_prj_box_in_info_lang}
                        </div>
                        <div class="lkjside_middle_prj_box_in_info_msg">
                            <span>상세 설명 : </span>
                            ${prj.cmt}
                        </div>
                        <div class="lkjside_middle_prj_box_in_info_buttons">                        
                            <p class="lkjside_middle_prj_box_in_info_button ${prj.arg.type == "img" ? "no" : ""
                } ${prj.arg.type == "img" ? "" : "lkjside_middle_prj_box_in_info_button_img"
                }" 
                            data-url="${prj.arg.url}"
                            >
                                사이트 이동                                
                                <span class="textoverlap lkjside_middle_prj_box_in_info_button_img" data-url="${prj.arg.url
                }">↗</span>
                            </p>
                            <p class="lkjside_middle_prj_box_in_info_button lkjside_middle_prj_box_in_info_button_git"
                            data-git="${prj.arg.git}">
                                코드 확인
                                <span class="textoverlap lkjside_middle_prj_box_in_info_button_git" data-git="${prj.arg.git
                }">↗</span>
                            </p>                            
                        </div>
                    </div>
                
        `;
            document.getElementById(`lkjside_middle_prj_box_ex_${indexs}`).appendChild(newDiv);
            document.getElementById(`lkjside_middle_prj_box_ex_${indexs}`).style.transition='transform 1s'
            let temps = document.querySelectorAll(`.back_${prj.name}`);
            for (let temp of temps) {
                let imagePath = `./img/sites/${prj.name}.png`;
                let img = new Image();
                img.onload = function () {
                    temp.style.backgroundImage = `url("${imagePath}")`;
                };
                img.onerror = function () {
                    console.error("Image not fond :", imagePath);
                };
                img.src = imagePath;
            }
        }

    }
    document.getElementById('lkjside_middle_prj').appendChild(newNavDiv)
}
function actionInsertSkills(skills) {
    if (skills.length == 0) {
        return;
    }
    document.getElementById("lkjside_middle_skill_box").innerHTML = "";
    for (let skill of skills) {
        let newDiv = document.createElement("div");
        newDiv.className = "lkjside_middle_skill_box_in";
        newDiv.innerHTML = `
            <div class="lkjside_middle_skill_box_in_skill">
                        <span>${skill.lang}</span>
                    </div>
                    <div class="lkjside_middle_skill_box_in_progress">
                        <progress value="${skill.progress}" max="100" data-prg="${skill.progress}"></progress><span></span>
                    </div>
        `;
        document.getElementById("lkjside_middle_skill_box").appendChild(newDiv);
    }
}
function actionCheckLevel(level) {
    switch (level) {
        case 0:
            break;
        case 1:
            let skills = document.querySelectorAll(
                ".lkjside_middle_skill_box_in_progress"
            );
            for (let skill of skills) {
                let prg = skill.children[0];
                prg.classList.remove("up");
                prg.value = 0;
            }

            setTimeout(() => {
                for (let skill of skills) {
                    let prg = skill.children[0];
                    prg.classList.add("up");
                    prg.value = prg.dataset.prg;
                }
            }, 450);
            break;
        case 0:
            break;
        case 0:
            break;
        default:
            break;
    }
}
function fetchJSONFile(path) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", path, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(JSON.parse(xhr.responseText));
                } else {
                    reject(`Failed to fetch JSON (${xhr.status}): ${xhr.statusText}`);
                }
            }
        };
        xhr.send();
    });
}

async function actionMove(level, force = true) {
    Screen.screenScroll(level);
    await Elevator.eledraw(level);
    elvator_buttons.forEach((btn, idx) => {
        if (idx === level) {
            btn.style.color = "rgb(255,251,0)";
            btn.style.border = "outset";
        } else {
            btn.style.color = "rgb(82,82,82)";
            btn.style.border = "outset";
        }
    });
    document.getElementById("lkjside_right_canvas_msg").innerText =
        ourList[level];
    actionSidebar(force);
    actionCheckLevel(level);
}
