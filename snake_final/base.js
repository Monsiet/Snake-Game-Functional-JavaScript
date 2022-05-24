/*
Nesse arquivo além de comentamos em todas as funções presentes também destacamos os principais aspectos do
Paradigma funcional (um estilo de programação com alto nível de abstração, com soluções elegantes, concisas e poderosas),
alguns aspectos destacados foram funções PURAS, IMUTÁVEIS, FUNÇÃO ANONIMA, FILTRAGEM de elementos, etc.
*/

//Funções de apoio
const adjust    = n => f => xs => mapi(x => i => i == n ? f(x) : x)(xs)
/*
A constante Adjust recebe um parâmetro (n), uma função (f) e uma lista ([xs]). Usando a função mapi que recebe 
a lista [(xs)] como segundo parâmetro e uma condição como primeiro parâmetro, 
tal qual : se i for igual ao n, ela retorna a a função (f) usando (x) como parâmetro, 
caso contrário, retorna (x).
*/
const dropFirst = xs => xs.slice(1)
/*
A função slice() retorna uma cópia de parte de um array  
a partir de uma certa posição passada, ou seja, posições inícial e final de um array original.
(lembrando que a posição final não é necessariamente preciso ser passado,
e o primeiro indice é a posição de número 0).
Nesse caso, a constante 'dropFirst' receberá uma lista ([xs]) e retornará uma nova cópia da lista
a partir do segundo indice.  
Essa constante respeita o conceito de IMUTABILIDADE, no qual afirma que os elementos não podem ter seu valor alterado como resultado de qualquer ação por parte de expressões
ou aplicação de funções, nesse caso os valores de ([xs]) não serão alterados,
apenas será feita uma cópia, mantendo os valores originais fies. 
*/
const dropLast  = xs => xs.slice(0, xs.length - 1) 
/*
A constante 'dropLast' receberá uma lista ([xs]) e retornará uma nova cópia da lista, 
do primeiro indice (posição 0) até o penultimo indece (posição -1) da lista original.
essa constante também segue uma Imutabilidade conforme a explicação acima. 
*/
const id        = x => x
/*
A constante id é uma funcao que recebe um parâmentro (x) e retorna esse mesmo parâmetro (x).
Ou seja, retornando uma espécie de cópia para poder ser alterada 
sem ferir o principio da IMUTABILIDADE.
 */
const k         = x => y => x
/*
A constante (k) recebe dois parâmetros (x,y) e retorna o primeiro parâmetro(x). 
Essa FUNÇÃO É PURA pois a mesma entrada sempre retorna a mesma saída e não possui efeitos colaterais.
*/
const map       = f => xs => xs.map(f)
/*
A função map() percorre o ARRAY da esquerda para a direita invocando uma função de retorno
em cada elemento com parâmetros. Então a partir de cada chamada de retorno o valor que será devolvido
se torna o elemento do novo array.
Nesse caso, a constante 'map' receberá dois parâmetros, uma função (f) e uma LISTA ([xs]), 
e retornará cada valor da lista ([xs]) com aplicaçao da função (f). 
Lembrando que a função map não infringe o princípio da IMUTABILIDADE,
pois essa operaçõe gera uma cópia da lista original como resultado. 
*/
const mapi      = f => xs => xs.map((x, i) => f(x)(i))
/*
A constante 'mapi' recebe uma função (f) como parâmetro e também recebe uma lista ([xs]),
e retorna uma lista onde há uma FUNÇÃO ANONIMA (funções que não dependem de nomes, 
somente são declaradas e armazenadas em uma variável) dentro do (.map)
que recebe como parâmetro (x, i) e retorna na função (f) como novos parâmetros.
Lembrando que a função map não infringe o princípio da IMUTABILIDADE, visto na explicação acima.
*/
const merge     = o1 => o2 => Object.assign({}, o1, o2)
/*
A constante merge recebe dois parâmetros: (o1,o2) respectivamente, e,
usando da funcao (Object.assign), copia as propriedades do primeiro parâmetro o1 e de um objeto vazio ({}),
tranferindo para o segundo parâmetro o2 assim,
criando uma cópia que garante a imutabilidade garantida pelo paradigma funcional.
*/
const mod       = x => y => ((y % x) + x) % x
/*
A constante mod recebe como parâmetro (x) e (y) respectivamente e retorna um resultado, que é obtido
1- consiste no restante da divisão de y por x,
2- consiste a soma do resultado (da divisão de y por x) com x,
e por fim retornará o restante da divisão do o resultado anterios por x.
*/
const objOf     = k => v => ({ [k]: v })
/*
A constante objOf recebe dois parâmetros (k) e (v) respectivamente,
retornando um REGISTRO com a lista ([k]) como chave e (v) como valor desse registro.
*/
const pipe      = (...fns) => x => [...fns].reduce((acc, f) => f(acc), x)
/*
A função reduce() recebe dois parametros (f, i),
sendo (i) o valor inicial de um acumulador (acc), e (f) uma função que será aplicado para cada valor da lista, acumulando esses valores em (acc).
A constante pipe recebe (...fns), ou seja uma quantidade indefinida de funções, e um argumento (x),
retornando a aplicacão de todas essas funcões no acumulador (acc) com valor Inicial (x).
*/
const prop      = k => o => o[k]
/*
A constante prop recebe dois parâmetros, (k) e (o), respectivamente.
Sendo (k) um elemento e ([o]) uma lista, a constante tem por finalidade usar o elem.
(k) como índice para uma busca na lista ([o]) e retorna o resultado correspondente dentro da lista.
*/
const range     = n => m => Array.apply(null, Array(m - n)).map((_, i) => n + i)
/*
O metodo apply() possui parametros (this, array),
chamando uma função com o valor (this) e argumentos fornecidos em (Array);
A constante range recebe os argumentos (n) e (m) respectivamente,
criando um array em que se inicia no primeiro argumento e termina no antessessor do segundo argumento,
tendo comprimento (m-n);  progredindo de 1 em 1.
*/
const rep       = c => n => map(k(c))(range(0)(n))
/*
A constante rep reutiliza as funções criadas (map, k, range),
ela recebe dois parâmetros (c) (n) respectivamente,
e em seu retorno cria uma array de comprimento (n) e de argumentos (c).
*/
const rnd       = min => max => Math.floor(Math.random() * max) + min
/*
Recebe dois parâmetros, (min) e (max), respectivamente que condicional um intervalo 
onde (min) indica o minimo e (max) indica o maximo desse intervalo.
Assim a constante 'rnd' retorna um valor aleatório pertencente a esse intervalo definido. 
a funcão (Math.random()) retorna um número dentro do intervalo [0,1[ o qual é multiplicado pelo valor máximo 
retornando um valor que será aproximado ao inteiro mais baixo usando a funcao Math.floor.
Sendo somado assim com o valor min no final para permanecer dentro do intervalo dado no começo da funçao rnd
*/
const spec      = o => x => Object.keys(o)
  .map(k => objOf(k)(o[k](x)))
  .reduce((acc, o) => Object.assign(acc, o))
/*
A constamte spec recebe como parâmetro ([o]) e (x), 
onde o (x) é o estado do frame atual e (o) o proximo estado, apenas a partir do (x) é gerado (o), ou seja,
ele pega as chaves de um objeto, criando outro objeto dentro de uma lista usando o método map(),
copiando esses objetos e juntando em um só objeto fora da lista usando o método reduce(). 
*/


module.exports = { adjust, dropFirst, dropLast, id, k, map, merge, mod, objOf, pipe, prop, range, rep, rnd, spec }
