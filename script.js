window.onload = ()=>{
    let pop = document.querySelector('.modal');
    let score = document.querySelector('#score');
    const playarea = document.getElementById('playarea');
    const video = document.querySelector('video');
    const fish = document.getElementById('player');
    const fish_b = getComputedStyle(fish).getPropertyValue('bottom');
    const fish_w = getComputedStyle(fish).getPropertyValue('width');
    const sand = document.getElementById('sand');
    sand.style.animationPlayState = 'paused';
    let flag =0;
    let jumping = false;
    let gameover = false;
    let score_val = 0;
    document.addEventListener('keydown',e=>{
        //console.log(e.key)
        if(e.key==="ArrowUp"){
            if(!jumping){
                jumping = true;
                sand.style.animationPlayState = 'running';
                video.play();
                up()
            }
        }
    })

    let position = 0;
    function up(){
        if(flag==0){
            flag=1
            setTimeout(enemy,5000);
        }
        let jump = setInterval(() => {
            if(position>=(window.innerHeight*37)/100){
                clearInterval(jump);
                down();
            }
            //position+=30;
            position += Math.floor((window.innerHeight*5)/100);
            fish.style.transform = "rotate(-14deg)";
            fish.style.bottom=position+"px";
        }, 50);
    }

    function down(){
        let re = setInterval(() => {
            if(position<=parseFloat(fish_b)){
                clearInterval(re);
                jumping = false;
                fish.style.bottom=30+"px";
            }
            //position-=20;
            if(jumping && !gameover){
                position -= Math.floor((window.innerHeight*2.2)/100);
                fish.style.transform = "rotate(0deg)";
                fish.style.bottom=position+"px";
            }
        }, 50);
    }

    function enemy(){
        let right = 0;
        let obstical = document.createElement('div');
        obstical.classList.add('thorn');
        obstical.innerHTML = "<img src='assets/t.png' class='t'>";
        playarea.appendChild(obstical);
        let obs_css = getComputedStyle(obstical);
        console.log("attack started");
        let randTime = Math.floor(Math.random()*1500+2000);
        console.log(randTime,"time");
        score_val++;
        let enm = setInterval(() => {
            if(gameover) return 0;
            score.innerHTML = score_val;
            if(right>=window.innerWidth){
                clearInterval(enm);
                console.log("attack stoped");
                playarea.removeChild(obstical);
            }
            //collection detection
            if(right+parseInt(obs_css.getPropertyValue('width')) >= window.innerWidth-parseInt(fish_w)-5
            && parseInt(getComputedStyle(fish).getPropertyValue('bottom')) <= parseInt(obs_css.getPropertyValue('height'))){
                 gameover = true;
                sand.style.animationPlayState = 'paused';
                video.pause();
                clearInterval(enm);
                console.log("collided");
                pop.showModal();
            }
            if(!gameover){
                right+=20;
                obstical.style.right = right+"px";
            }
        }, 50);
        if(!gameover)
        {
            setTimeout(enemy,randTime);
        } 
    }
}