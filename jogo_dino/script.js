const dino = document.querySelector('.dino')
const fundo =document.querySelector('.fundo')
let isJumping =false
let position =0


function pular(event){
    if(event.keyCode === 32){  // 32 é igual a tecla de espaço
       if(!isJumping){
        jump()
       }  
    }
}

function jump(){ 
 isJumping=true
    
    let upInterval = setInterval(() => {
        if(position>=150){
            clearInterval(upInterval)

            //descendo
            let dowInterval =setInterval(() => {
                if(position<=0){
                    clearInterval(dowInterval)
                    isJumping=false
                }else{
                    position-=20
                    dino.style.botton =position+"px";
                }
               
            }, 20);
        }else{
            //subindo
            position+=20

        dino.style.botton =position+"px";
        }
    }, 20);
}

function creatCactus(){
    const cactus = document.createElement('div')
    let cactusPosition =1000
    let randomTime =Math.random()*6000

    cactus.classList.add('cactus')
    cactus.style.left=cactusPosition+"px"
    fundo.appendChild(cactus);
    
    let leftInterval = setInterval(() => {
       
        if(cactusPosition<60){
            clearInterval(leftInterval)
            fundo.removeChild(cactus)
        } else if(cactusPosition>0 && cactusPosition<60  && position<60){
           //game over
           clearInterval(leftInterval)
           document.body.innerHTML = '<h1 class="game-over">fim de jogo</h1>'
    
        }
        else{
            cactusPosition -=10
        cactus.style.left=cactusPosition+'px';
        }
        
        
    }, 20);

    setTimeout(creatCactus, randomTime) //recursividade, imita a função

}
creatCactus()
document.addEventListener('keyup',pular);  //evento de pulo



