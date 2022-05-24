const base = require('./base')
Object.getOwnPropertyNames(base).map(p => global[p] = base[p])

// Constantes de movimentação
const NORTH = { x: 0, y:-1 } // Movimento Para cima.
const SOUTH = { x: 0, y: 1 } // Movimento Para baixo.
const EAST  = { x: 1, y: 0 } // Movimento Para direira.
const WEST  = { x:-1, y: 0 } // Movimento Para esquerda.
/*
Tais constantes servem para retornar a direcao que a cobra irá seguir. 
Cada constante recebe dois parametros que serão coerentes as direcoes e sentidos que a cobra ira tracar dentro da matriz/mapa.
*/

const pointEq = p1 => p2 => p1.x == p2.x && p1.y == p2.y
/*
A constante PointEq recebe dois parametros (p1) e (p2), respectivamente.
O objetivo dessa constante é comparar as posições de determinado item no mapa/matriz, testando se as cordenadas de p1 (x,y) são iguais a de p2 (x,y), 
retornando um valor True caso seja validado o teste e False, caso não.
*/
const willEatW   = state => pointEq(nextHead(state))(state.trap)    // Tais funções testam se a cabeça da cobra está na mesma posição que um dos objetivo/obstaculos dentro do mapa. Caso esteja, ela retorna um booleano True e recebe a consequencia referente a qual objetivo/obstaculo ela encontrou, caso não, retorna False, continuando o jogo.
const willEatP1  = state => pointEq(nextHead(state))(state.poison1) //*Tais funções testam se a cabeça da cobra está na mesma posição que um dos objetivo/obstaculos dentro do mapa. Caso esteja, ela retorna um booleano True e recebe a consequencia referente a qual objetivo/obstaculo ela encontrou, caso não, retorna False, continuando o jogo.
const willEatP2  = state => pointEq(nextHead(state))(state.poison2) //*Tais funções testam se a cabeça da cobra está na mesma posição que um dos objetivo/obstaculos dentro do mapa. Caso esteja, ela retorna um booleano True e recebe a consequencia referente a qual objetivo/obstaculo ela encontrou, caso não, retorna False, continuando o jogo.
const willEatW2  = state => pointEq(nextHead(state))(state.trap2)   //*Tais funções testam se a cabeça da cobra está na mesma posição que um dos objetivo/obstaculos dentro do mapa. Caso esteja, ela retorna um booleano True e recebe a consequencia referente a qual objetivo/obstaculo ela encontrou, caso não, retorna False, continuando o jogo.
//# retorna um BOOLEANO
/*
testa se a cabeça/inicio da cobra está no mesmo lugar que a maça,
confirmando assim que a cobra "comeu", sendo o objetivo do jogo para acrecimo de pontuacao e de tamanho da cobra.
*/

// Funções de ações
const willEat   = state => pointEq(nextHead(state))(state.apple) // #retorna BOOLEANO
/*
Essa constante willEat testa se a cabeça/inicio da cobra está no mesmo lugar que a maça, confirmando assim que a cobra "comeu",
sendo o objetivo do jogo para acrecimo de pontuacao e de tamanho da cobra.
*/

const willCrash = state => state.snake.find(pointEq(nextHead(state)))  // Essa constante 'WillCrash' vereficada se a cabeca da cobra se encontra na mesma posicao que uma parte da cobra.  
    || pointEq(nextHead(state))(state.trap)  // Adiciamos mais casos de colisão, nesse caso se a cobra tocar na armadilha.
    || pointEq(nextHead(state))(state.trap2) //*Adiciamos mais casos de colisão, nesse caso se a cobra tocar na armadilha.
/* 
O willCrash testa se a cobra entou em contato com ou ela mesma ou se sua "cabeça" se encontra na mesma posição dentro da matriz que a armadilha. Caso retorne True em qualquer uma das condições, o jogo se encerra.
*/

const validMove = move => state =>
  state.moves[0].x + move.x != 0 || state.moves[0].y + move.y != 0
/*
A constante validMove serve para testar a validade do movimento. 
Ou seja, ela tem o objetivo de evitar que a cobra se movimente contra o seu sentido de direcao atual,
por exemplo se ela estiver vindo da esquerda para direita, ela não podera alternar esse sentido, senão passaria por cima de si mesma, ocasionando em uma colisão/Game Over.
*/


// Próximos valores baseados no estado atual

const nextApple   = state => willEat(state) 
                                  || pointEq(state.poison1)(state.apple)                                   //*
                                  || pointEq(state.poison2)(state.apple)                                   // Essas 5 condiçoes extras servem para evitar que a maça se encontre no mesmo lugar que um dos obstáculos ou acabe aparecendo dentro da cobra durante a passagem dela pelo mapa.
                                  || pointEq(state.trap)(state.apple)                                      // elas testam se a posiçao da maça é a mesma de algum dos obstáculos e na ultima condição testa se a maça esta dentro da cobra atraves da funcao find. Para achar se a coordenada da maça confere com uma das coordenada em que o corpo da cobra está
                                  || pointEq(state.trap2)(state.apple)                                     //*
                                  || state.snake.find(pointEq(state.apple))  ? rndPos(state) : state.apple //*
 
 
const nextMoves = state => state.moves.length > 1 ? dropFirst(state.moves) : state.moves
const nexttrap    = state => willEatW(state)  ? rndPos(state) : state.trap    // Retorna um novo state de armadilha, i.e uma nova posição dentro da martrix/mapa.
const nextPoison1 = state => willEatP1(state) ? rndPos(state) : state.poison1 // Retorna um novo state da armadilha, i.e uma nova posição dentro da martrix/mapa.
const nextPoison2 = state => willEatP2(state) ? rndPos(state) : state.poison2 // Retorna um novo state de armadilha, i.e uma nova posição dentro da martrix/mapa.
const nexttrap2   = state => willEatW2(state) ? rndPos(state) : state.trap2   // Retorna um novo state de armadilha, i.e uma nova posição dentro da martrix/mapa.

const nextHead  = state => state.snake.length == 0
  ? { x: 2, y: 2 }
  : {
    x: mod(state.cols)(state.snake[0].x + state.moves[0].x),
    y: mod(state.rows)(state.snake[0].y + state.moves[0].y)
  }
const nextSnake = state => willCrash(state) //A constante nextSnake testa o estado da cobra atraves da funcao willCrash que por sua vez, caso retorne true, a cobra será reduzida a uma lista vazia, ocasionando no final do jogo.
? [] 
: (willEatP1(state)) 
  || (willEatP2(state)) 
  || (willEatW2(state)) 
    ? dropLast([nextHead(state)]).concat(dropLast(state.snake)) // Adicinado uma condiçao para testar se a cobra entrou em contato com o veneno e, caso positivo, será subtraido um ponto do tamanho da cobra. Isso é feito zerando o newHead utilizando a funcao dropLast resultando em uma lista vazia que concatenara com a lista da cobra retornada com 1 ponto a menos atraves da própria funcao dropLast.
                                                                // Outra situação é caso a cobra tenha apenas 1 ponto de tamanho e entrar em contato com o veneno, ela ficará zerada, resultando no final do jogo.
    : (willEat(state) 
      ? [nextHead(state)].concat(state.snake)                   // Caso de positivo, um novo ponto de tamanho será adicionado a lista   da cobra usando da funcao .concat.
      : [nextHead(state)].concat(dropLast(state.snake)))        // caso negativo, o ponto também será adiconado, entretanto a lista da cobra perderá um ponto, assim a soma resultara em nenhuma mudança no total da cobra



// Aleatoriedade
const rndPos = table => ({
  x: rnd(0)(table.cols - 1),
  y: rnd(0)(table.rows - 1)
})
/*
A constante rndPos tem o objetivo de retornar uma posicao aleatória dentro da matriz/mapa,
recebendo o mapa como parametro e trazendo uma coordenada aleatória utilizando da funcao rnd (explicada no arquivo base.js) a qual recebe um valor minimo 0 e maximo 
sendo o numero de fileiras(referente ao eixo x) e colunas (referente o eixo y). 
*/


// Estado inicial
const initialState = () => ({ 
  cols:  20,                              // O cols é a quantidade de colunas da matriz do jogo. 
  rows:  15,                              // Aumentamos o tamanho da linha para 15, assim agora o tamanho da matriz do jogo ficou 20x15.
  moves: [EAST],                          // A direção inicial da cobra está direcionado para o leste (direita).
  snake: [],                              // Em seu estado incial a cobra será dada como o menor possível para seguimento do jogo.
  poison1: {x: rnd(0)(19),y: rnd(0)(14)}, // Essas funções garatem o estado inicial dos elementos dentro do jogo em seu inicio, sendo alterado sua posição inicial para algo randomico, garantindo maior dinâmica dentro do jogo. Isso atraves do uso da funcão rnd() ja descrita nesse arquivo.
  poison2: {x: rnd(0)(19),y: rnd(0)(14)}, //*Essas funções garatem o estado inicial dos elementos dentro do jogo em seu inicio, sendo alterado sua posição inicial para algo randomico, garantindo maior dinâmica dentro do jogo. Isso atraves do uso da funcão rnd() ja descrita nesse arquivo.
  trap2:   {x: rnd(0)(19),y: rnd(0)(14)}, //*Essas funções garatem o estado inicial dos elementos dentro do jogo em seu inicio, sendo alterado sua posição inicial para algo randomico, garantindo maior dinâmica dentro do jogo. Isso atraves do uso da funcão rnd() ja descrita nesse arquivo.
  trap:    {x: rnd(0)(19),y: rnd(0)(14)}, //*Essas funções garatem o estado inicial dos elementos dentro do jogo em seu inicio, sendo alterado sua posição inicial para algo randomico, garantindo maior dinâmica dentro do jogo. Isso atraves do uso da funcão rnd() ja descrita nesse arquivo.
  apple:   {x: rnd(0)(19),y: rnd(0)(14)}  //*Essas funções garatem o estado inicial dos elementos dentro do jogo em seu inicio, sendo alterado sua posição inicial para algo randomico, garantindo maior dinâmica dentro do jogo. Isso atraves do uso da funcão rnd() ja descrita nesse arquivo.
})

/*
Essa constante initialState retorná um objt com seu estado inicial no jogo. 
*/
const next   = spec({  // objetos
  rows:    prop('rows'),  //*Aqui dentro do objeto Next está a configuração de atualização do jogo. Elas atualização o estado dos elementos e ações dentro do jogo enquanto o mesmo está rodando. Elas garantem a mudança de estado dos elementos e ações apos o ínicio do jogo, manuteindo a dinâmica do tal.
  cols:    prop('cols'),  //*Aqui dentro do objeto Next está a configuração de atualização do jogo. Elas atualização o estado dos elementos e ações dentro do jogo enquanto o mesmo está rodando. Elas garantem a mudança de estado dos elementos e ações apos o ínicio do jogo, manuteindo a dinâmica do tal.
  moves:   nextMoves,     //*Aqui dentro do objeto Next está a configuração de atualização do jogo. Elas atualização o estado dos elementos e ações dentro do jogo enquanto o mesmo está rodando. Elas garantem a mudança de estado dos elementos e ações apos o ínicio do jogo, manuteindo a dinâmica do tal.
  snake:   nextSnake,     //*Aqui dentro do objeto Next está a configuração de atualização do jogo. Elas atualização o estado dos elementos e ações dentro do jogo enquanto o mesmo está rodando. Elas garantem a mudança de estado dos elementos e ações apos o ínicio do jogo, manuteindo a dinâmica do tal.
  apple:   nextApple,     //*Aqui dentro do objeto Next está a configuração de atualização do jogo. Elas atualização o estado dos elementos e ações dentro do jogo enquanto o mesmo está rodando. Elas garantem a mudança de estado dos elementos e ações apos o ínicio do jogo, manuteindo a dinâmica do tal.
  poison1: nextPoison1,   //*Aqui dentro do objeto Next está a configuração de atualização do jogo. Elas atualização o estado dos elementos e ações dentro do jogo enquanto o mesmo está rodando. Elas garantem a mudança de estado dos elementos e ações apos o ínicio do jogo, manuteindo a dinâmica do tal.
  poison2: nextPoison2,   //*Aqui dentro do objeto Next está a configuração de atualização do jogo. Elas atualização o estado dos elementos e ações dentro do jogo enquanto o mesmo está rodando. Elas garantem a mudança de estado dos elementos e ações apos o ínicio do jogo, manuteindo a dinâmica do tal.
  trap2:   nexttrap2,     //*Aqui dentro do objeto Next está a configuração de atualização do jogo. Elas atualização o estado dos elementos e ações dentro do jogo enquanto o mesmo está rodando. Elas garantem a mudança de estado dos elementos e ações apos o ínicio do jogo, manuteindo a dinâmica do tal.
  trap:    nexttrap       //*Aqui dentro do objeto Next está a configuração de atualização do jogo. Elas atualização o estado dos elementos e ações dentro do jogo enquanto o mesmo está rodando. Elas garantem a mudança de estado dos elementos e ações apos o ínicio do jogo, manuteindo a dinâmica do tal.
})

const enqueue = (state, move) => validMove(move)(state) // Aqui garante a mobilidade válida da cobra durante o jogo, impossibilitando q a mesma volte por onde veio e bata em si, ocasionando no final do jogo.
  ? merge(state)({ moves: state.moves.concat([move]) })
  : state
// Caso o movimento seja válido, a cobra poderá alterar seu movimento durante o jogo, caso contrário, ela manterá seu curso original antes do gatilho do usuário.

module.exports = { EAST, NORTH, SOUTH, WEST, initialState, enqueue, next, }
//serve para poder enviar as funções necessárias desse arquivo para os outros que fazem parte do jogo assim fazendo essa ponte entre os arquivos permitindo funcionamento do jogo tendo sua estrutura dividida em vários arquivos.