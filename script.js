const caixaPrincipal = document.querySelector(".caixa-principal");
const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const caixaResultado = document.querySelector(".caixa-resultado");
const textoResultado = document.querySelector(".texto-resultado");

const perguntas = [
    {
        enunciado: "Quando você pensa em fazer faculdade em uma cidade bem longe da sua casa, você...",
        alternativas: [
            {
                texto: "Ama a ideia de ter total independência.",
                afirmacao: "afirmacao"
            },
            {
                texto: "Odeia a possibilidade de ficar longe da família.",
                afirmacao: "afirmacao"
            }           
            
        ]
    },
    {
        enunciado: "Sobre escolher um curso focado em exatas e números, você...",
        alternativas: [
            {
                texto:"Adora o raciocínio lógico e direto.",
                afirmacao:"afirmacao"
            },
            {
                texto: "Detesta e prefere a área de humanas ou artes.",
                afirmacao:"afirmacao"
            }
        ]
    },
    {
        enunciado: "Diante da opção de estudar em uma faculdade com aulas 100% presenciais, você...",
        alternativas: [
            {
                texto:"Prefere a convivência e o contato direto com a turma.",
                afirmacao:"afirmacao"
            },
            {
                texto:"Prefere a flexibilidade do ensino à distância (EAD).",
                afirmacao:"afirmacao"
            }
            
        ]
    },
    {
        enunciado: "Na hora de decidir entre o que dá dinheiro e o que você ama, você...",
        alternativas: [
            {
                texto:"Prioriza a estabilidade financeira e o mercado de trabalho.",
                afirmacao:"afirmacao"
            },
            {
                texto:"Prioriza a sua paixão e vocação pessoal.",
                afirmacao:"afirmacao"
            }
            
        ]
    },
    {
        enunciado: " Em relação a entrar na faculdade imediatamente após sair do ensino médio, você...",
        alternativas: [
            {
                texto: "Ama a ideia de engatar os estudos sem pausar.",
                afirmacao:"afirmacao"
            },
            {
                texto: "Prefere tirar um tempo para pensar antes de decidir.",
                afirmacao:"afirmacao"
            }
            
            
        ]
    },
];

let atual = 0; 
let perguntaAtual;
let historiaFinal = "";

function mostraPergunta() {
    if(atual >= perguntas.length){
        mostraResultado();
        return;
    }
    perguntaAtual = perguntas[atual];
    caixaPerguntas.textContent = perguntaAtual.enunciado;
    caixaAlternativas.textContent = "";
    mostraAlternativas();
}

function mostraAlternativas(){
    for(const alternativa of perguntaAtual.alternativas){
        const botaoAlternativas = document.createElement("button");
        botaoAlternativas.textContent = alternativa.texto;
        botaoAlternativas.addEventListener("click", () => respostaSelecionada(alternativa));
        caixaAlternativas.appendChild(botaoAlternativas);
    }
}

function respostaSelecionada(opcaoSelecionada){
    const afirmacoes = opcaoSelecionada.afirmacao;
    historiaFinal += afirmacoes + " ";
    atual++;
    mostraPergunta();
}

function mostraResultado(){
    caixaPerguntas.textContent = "Em 2049...";
    textoResultado.textContent = historiaFinal;
    caixaAlternativas.textContent = ""; 
}

mostraPergunta();