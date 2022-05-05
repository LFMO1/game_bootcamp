let order =[]
let clickedOrder = []
let score=0

const blue =document.querySelector('.blue')
const red =document.querySelector('.red')
const green =document.querySelector('.green')
const yellow =document.querySelector('.yellow')

function shuffleOrder(){
    let colorOrder = Math.floor(Math.random()*4)
    order[order.length]=colorOrder
    clickedOrder=[]

    //acender o numero sorteado
    for(let i in order){
        let elementColor=createColorElement(order[i])
        lightColor(elementColor, Number(i)+1)
    }
}

function lightColor(element, number){
    number+=500
    setTimeout(() => {
        element.classList.add('selected')
    }, number-250);

    setTimeout(() => {
        element.classList.remove('selected')
    }, );

}

function checkOrder(){
    for(let i in clickedOrder){
        if(clickedOrder[i]!=order[i]){
            gameOver()
            break
        }
       
    }
    if(clickedOrder.length==order.length){
        alert('Potuação: '+score+"\n voce acertou! inicial proximo nivel")
        nextlevel()
    }
}

//função click

function click(color){
    clickedOrder[clickedOrder.length]=color
    createColorElement(color).classList.add('selected')

    setTimeout(() => {
        createColorElement(color).classList.remove('selected')
        checkOrder() //comparando se foi o q o jogo pediu
    }, 250);

    

}

//retorna a cor
function createColorElement(color){
    if(color==0){
        return green
    }
    if(color==1){
        return red
    }
    if(color==2){
        return yellow
    }
    if(color==3){
        return blue
    }

}

//proximo level
function nextlevel(){
    score++
    shuffleOrder()
}

// game over
function gameOver(){
    alert('potuação: '+score+ "\n você perdeu o jogo \n clique em ok para iniciar um novo jogo")
    order=[]
    clickedOrder=[]
    

    playGame()
}

function playGame(){
    alert('bem vindo ao genesis! Iniciando um novo jogo')
    
    score=0
    
    nextlevel()
    
}

green.addEventListener('click',click[0]) //adiciona um evento de click
red.addEventListener('click',click[1])
yellow.addEventListener('click',click[2])
blue.addEventListener('click',click[3])

green.onclick = ()=>click(0)
red.onclick= ()=>click(1)
blue.onclick= ()=>click(2)
yellow.onclick= ()=>click(3)

//inicio do jogo
playGame()