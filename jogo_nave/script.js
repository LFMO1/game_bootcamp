function start(){ // incia o jogo

    $("#inicio").hide(); // esse tipo de sintaxe só é possivel usando o jquary
    // comando hide oculta o que esta dentro do enunciado. Que no caso é a div inicio

    $("#fundoGame").append("<div id='jogador' class='anima1'></div>"); // assim você esta criando div dentro de div
    $("#fundoGame").append("<div id='inimigo1' class='anima2'></div>");
    $("#fundoGame").append("<div id='inimigo2' ></div>");
    $("#fundoGame").append("<div id='amigo' class='anima3'></div>");
    $("#fundoGame").append("<div id='placar'></div>");
    $("#fundoGame").append("<div id='energia'></div>");

    //principais variavies do jogo 

    var somDisparo =document.getElementById("somDisparo")
    var somExplosao =document.getElementById("somExplosao")
    var musica =document.getElementById("musica")
    var somGameover =document.getElementById("somGameover")
    var somPerdido =document.getElementById("somPerdido")
    var somResgate =document.getElementById("somResgate")




    var jogo={}
    var velocidade=5
    var posicaoY = parseInt(Math.random() * 334)
    var TECLA ={
        W: 87, 
        S: 83,
        D: 68
    }
    var podeAtirar=true
    var fimdejogo=false
    var pontos=0
    var salvos=0
    var perdidos=0
    var energiaAtual=3

    jogo.pressionou=[]


    musica.addEventListener("ended", function(){musica.currentTime =0; musica.play();},false) //addeventlistener adiciona um evento
    musica.play()
    //verifica se o usuario pressionou alguma tecla

    $(document).keydown(function(e){   //keydown: usuario precionou alguma tecla
        jogo.pressionou[e.which]=true
    })

    $(document).keyup(function(e){  //keyup: usuario não pressionou nenhuma tecla
        jogo.pressionou[e.which]=false  //lebrando que keyup e keydown são funções e não metodos
    })
    // GAme loop

    jogo.timer=setInterval(loop,30);   //setinterval é um comando de tempo (temporizador)


    function loop(){
        movefundo();
        movejogador()
        moveinimigo1()
        moveinimigo2()
        moveamigo()
        colisao()
        placar()
        energia()
       
    }

    function movefundo(){
        esquerda= parseInt($("#fundoGame").css("background-position"))
    $("#fundoGame").css("background-position",esquerda-1)  // esse menos 1 é a velocidade do loop
    }

    function movejogador(){
        if (jogo.pressionou[TECLA.W]){  // se jogo.pressionou for true. ele vai analisar qual tecla foi clicada nesse caso é o W. se tecla precionada for W(lembrando a da variavel criada)
            var topo =parseInt($("#jogador").css("top"))
            $("#jogador").css("top",topo-10)

            if(topo<=0){
                $("#jogador").css("top",topo+10)
            }
        }

        if (jogo.pressionou[TECLA.S]){
            var topo =parseInt($("#jogador").css("top"))
            $("#jogador").css("top",topo+10)

            if(topo>=434){
                $("jogador").css("top",topo-10)
            }
        }

        if(jogo.pressionou[TECLA.D]){
           disparo()
        }
    }

    function moveinimigo1(){
        posicaoX = parseInt($("#inimigo1").css("left"))
        $("#inimigo1").css("left",posicaoX-velocidade)
        $("#inimigo1").css("top",posicaoY)

        if(posicaoX<=0){ //quando chega a 0 o loop reinicia
            posicaoY=parseInt(Math.random() * 334) //recria variavel
            $("#inimigo1").css("left",694)
            $("#inimigo1").css("top",posicaoY)
        }
    }

    function moveinimigo2(){
        posicaoX= parseInt($("#inimigo2").css("left")) //cria uma variavel no eixo x que faz o inimigo andar para a direita até alcançar o numero 0
        $("#inimigo2").css("left",posicaoX-3) // aqui é loop dele

        if(posicaoX<=0){
            $("#inimigo2").css("left",775)  //reposicionar o inimigo 2
        }
        
    }

    function moveamigo(){
        posicaoX=parseInt($("#amigo").css("left"))
        $("#amigo").css("left",posicaoX+1)

        if(posicaoX>906){
            $("#amigo").css("left",0)
        }
    }

    function disparo(){
       
        if(podeAtirar==true){
            somDisparo.play()
            
            podeAtirar=false //n pode executar o tiro

            topo=parseInt($("#jogador").css("top")) //topo do jogaodor
            posicaoX=parseInt($("#jogador").css("left")) //esquerda do jogador, assim vc sabe a localização do jogador 
            tiroX=posicaoX+190 // local onde o tiro vai sair do tpo
            topoTiro=topo+37 // local onde vai sair a partir da esquerda
            $("#fundoGame").append("<div id='disparo'></div"); // criando uma div dentro do fundo game
            $("#disparo").css("top",topoTiro)
            $("#disparo").css("left",tiroX)

            var tempoDisparo=window.setInterval(executaDisparo,30) // setInterval cria uma função de tempo

        }

        function executaDisparo(){
            posicaoX =parseInt($("#disparo").css("left"))
            $("#disparo").css("left",posicaoX+15) // velocidade do tiro

                    if(posicaoX>900){ //final da tela
                        window.clearInterval(tempoDisparo) //tira a função de tempo
                        tempoDisparo=null //zerando
                        $("#disparo").remove() //removendo disparo
                        podeAtirar=true //permitindo que o usuario atire
                    }
        }

    }

    function colisao(){
        var colisao1 =($("#jogador").collision($("#inimigo1"))) // collision é do jquary. É uma função que ve a colisão de duas entidades, no caso o jogador e o inimigo um
        var colisao2 =($("#jogador").collision($("#inimigo2")))
        var colisao3 =($("#disparo").collision($("#inimigo1")))
        var colisao4 =($("#disparo").collision($("#inimigo2")))
        var colisao5 =($("#jogador").collision($("#amigo")))
        var colisao6 =($("#inimigo2").collision($("#amigo")))




        if(colisao1.length>0){ // analisa se a variavel esta preenchida.   colisão do jogador 1 com o inimigo1
            energiaAtual--;
            inimigo1X =parseInt($("#inimigo1").css("left")) // explosão do inimigo  1
            inimigo1Y=parseInt($("#inimigo1").css("top"))
            explosao1(inimigo1X,inimigo1Y) //valores para crar a explosão

            posicaoY=parseInt(Math.random()*334) // reposicionar o inimigo 1 em um valor randomico
            $("#inimigo1").css("left",694)
            $("#inimigo1").css("top",posicaoY)
        }

        if(colisao2.length>0){ //analisa a colisão com o inimigo 2, se for maior que zero ele volta para o local inicial
            energiaAtual--;
            inimigo2X= parseInt($("#inimigo2").css("left"))
            inimigo2Y= parseInt($("#inimigo2").css("top"))
            explosao2(inimigo2X,inimigo2Y)

            $("#inimigo2").remove()

            reposicionaInimigo2()

        }

        if(colisao3.length>0){ //analisa a colisaão da bala com o inimigo 1
            pontos+=100
            velocidade+=0.3
            inimigo1X=parseInt($("#inimigo1").css("left"))
            inimigo1Y=parseInt($("#inimigo1").css("top")) // atribui valor a variavel a partir do q esta no css, nesse caso essa variavel recebe o valor de 253

            explosao1(inimigo1X,inimigo1Y)
            $("#disparo").css("left",950) // reposicionando disparo

            posicaoY= parseInt(Math.random()*334) 
            $("#inimigo1").css("left",694)
            $("#inimigo1").css("top",posicaoY)
        }

        if(colisao4.length>0){ // analisa o disparo contra o inimigo dois 
            pontos+=50
            inimigo2X =parseInt($("#inimigo2").css("left"))
            inimigo2Y =parseInt($("#inimigo2").css("top"))
            $("#inimigo2").remove()

            explosao2(inimigo2X,inimigo2Y)
            $("#disparo").css("left",950)

            reposicionaInimigo2()

        }
        if(colisao5.length>0){
            salvos++;
            reposicionaAmigo()
            somResgate.play()
            $("#amigo").remove()
        }
        if(colisao6.length>0){
            perdidos++;
            amigoX =parseInt($("#amigo").css("left"))
            amigoY =parseInt($("#amigo").css("top"))
            explosao3(amigoX,amigoY)
            $("#amigo").remove()

            reposicionaAmigo()
        }


    } //fim da função colisão

    function explosao1(inimigo1X,inimigo1Y){
        somExplosao.play()
        $("#fundoGame").append("<div id='explosao1'></div>"); //criando uma div
        $("#explosao1").css("background-image", "url(imgs/explosao.png)")
        var div=$("#explosao1")
        div.css("top",inimigo1Y)  //prpriedade css top, ou seja, no eixo Y
        div.css("left",inimigo1X) //propriedade css left, ou seja, no eixo X
        div.animate({width:200,opacity:0}, "slow")  //começa com 100 e vai diminuindo até sumir no 0 indo devagar pelo "slow"

        var tempoExplosao=window.setInterval(removeExplosao,1000)

        function removeExplosao(){
            div.remove()
            window.clearInterval(tempoExplosao)
            tempoExplosao=null
        }

    }

    function reposicionaInimigo2(){
        var tempoColisao4=window.setInterval(reposiciona4, 5000) //apos 5 segundos depois da explosão dele sera reposicionado

        function reposiciona4(){
            window.clearInterval(tempoColisao4)
            tempoColisao4=null

            if(fimdejogo==false){ // garante que não aparecera o inimigo 2 apos o termino do jogo
                $("#fundoGame").append("<div id=inimigo2></div>");
            }
        }
    } //fim reposicionar inimigo 2

    function explosao2(inimigo2X,inimigo2Y){

        somExplosao.play()
        $("#fundoGame").append("<div id='explosao2'></div>")
        $("#explosao2").css("background-image","url(imgs/explosao.png)")
        var div2=$("#explosao2")
        div2.css("top",inimigo2Y)
        div2.css("left",inimigo2X)
        div2.animate({width:200, opacity:0}, "slow")

        var tempoExplosao2 =window.setInterval(removeExplosao2,1000)

        function removeExplosao2(){
            div2.remove()
            window.clearInterval(tempoExplosao2)
            tempoExplosao2=null
        }
    }

    function reposicionaAmigo(){
        var tempoAmigo=window.setInterval(reposiciona6, 6000)

        function reposiciona6(){
            window.clearInterval(tempoAmigo)

            tempoAmigo=null

            if(fimdejogo==false){

                $("#fundoGame").append("<div id='amigo' class='anima3'></div>");
            }
        }
    }

    function explosao3(amigoX,amigoY) {
        somPerdido.play()
        $("#fundoGame").append("<div id='explosao3' class='anima4'></div>");
        $("#explosao3").css("top",amigoY);
        $("#explosao3").css("left",amigoX);
       
        var tempoExplosao3=window.setInterval(resetaExplosao3, 1000);
       
        function resetaExplosao3() {
            $("#explosao3").remove();
            window.clearInterval(tempoExplosao3);
            tempoExplosao3=null;
                
        }
    }

    function placar(){
        $("#placar").html("<h2> Pontos: " +pontos+" Salvos: "+salvos+" Perdidos: "+perdidos);
    }

    function energia(){
        if(energiaAtual==3){
            $("#energia").css("background-image", "url(imgs/energia3.png") //atualizando a imagem da energia, nesse caso o jogador ainda tem 3 energias

        }
        if(energiaAtual==2){
            $("#energia").css("background-image", "url(imgs/energia2.png")

        }
        if(energiaAtual==1){
            $("#energia").css("background-image", "url(imgs/energia1.png")

        }
        if(energiaAtual==0){
            $("#energia").css("background-image", "url(imgs/energia0.png")
            gameOver()
        }
    }

    function gameOver(){
        fimdejogo=true //fazendo isso o amigo n sera reposicionado se sair da tela
        musica.pause() //musica para 
        somGameover.play() //começa musica de final

        window.clearInterval(jogo.timer) //para a variavel de tempo no começo do jogo e a função
        jogo.timer=null //zera o timer
 
        $("#jogador").remove() //remove tudo
        $("#inimigo1").remove()
        $("#inimigo2").remove()
        $("#amigo").remove()

        $("fundoGame").append("<div id='fim'></div>"); // criando div fim

        $("#fim").html("<h1> Game Over </h1><p>Sua pontuação foi: "+pontos+"</p>"+"<div id='reinicia' onClick=reiniciaJogo()><h3> Jogar Novamente</h3></div>");
    }


}// final função start

function reiniciaJogo(){
    somGameover.pause()
    $("#fim").remove()
    start()
}