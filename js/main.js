// embaralha resultados dentro de um arrey
function shuffle(o) {
    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}
frases = [
    "A persistência é o caminho do êxito.",
    "A coragem não é ausência do medo; é a persistência apesar do medo.",
    "Estar decidido, acima de qualquer coisa, é o segredo do êxito.",
    "A disciplina é a mãe do êxito.",
    "A persistência realiza o impossível.",
    "A amizade desenvolve a felicidade e reduz o sofrimento, duplicando a nossa alegria e dividindo a nossa dor.",
    "Imagine uma nova história para sua vida e acredite nela.",
    "Ser feliz sem motivo é a mais autêntica forma de felicidade."
]
shuffle(frases)
console.log(frases)
frase = frases[0]
$(".frase").text(frase);
// js que calcula a quantidade de palavras na frase
//var numPalavras = frase.split(" ").length;
var tempoJogo = $("#tempo");
var tempoInicial = tempoJogo.text()
// pega o tamanho da frase e apresenta na pagina
//var tamanhoFrase = $("#tamanho-frase");
//tamanhoFrase.text(numPalavras);

var campo = $("#campo-digitacao");
campo.on("input", function () {
    //variavel "frase" recebe valor do campo de texto (#campo-digitacao)
    var frase = campo.val();
    // variavel nCaractersDigitados recebe a quantidade de caracteres de dentro da frase
    var nCaracteresDigitados = frase.length;
    $("#caracteres-digitados").text(nCaracteresDigitados);

    //quebra a frase em palavras, conta as palavras e adiciona na variavel nPalavrasDigitadass
    var nPalavrasDigitadas = frase.split(" ").length;
    //troca o campo da pagina html com id = palavras-digitadas pela quantidade alocada na variavel nPalavrasDigitadas
    $("#palavras-digitadas").text(nPalavrasDigitadas);
    $("#tamanho-frase").text(nPalavrasDigitadas); // mudar tbm a contagem de cima 
});
//variavel que impossibilita o clique duplo com a duplicação de tempo
var running = false;
campo.on("focus", function () {
    if (running == true) {
        return;
    }
    var cronometro = setInterval(function () {
        var tempoRestante = tempoJogo.text();
        if (tempoRestante <= 0) {
            running = false;
            campo.attr("disabled", true);
            clearInterval(cronometro)
            nome = $("#nome").val()
            CaracteresDigitados = $("#caracteres-digitados").text()
            PalavrasDigitadas = $("#palavras-digitadas").text()
            pontuacao = PalavrasDigitadas / tempoInicial * 60
            $("#tabela-resultado").append(
                "<tr class='table-secondary'> <td> " + nome + "</td> <td>" + pontuacao + "</td><td>" + PalavrasDigitadas + "</td><td>" + CaracteresDigitados + "</td></tr>"
            );
            $(".caixa .progresso").css("width", "100%");
        }
        else {
            running = true;
            porcentagem = (tempoInicial - tempoRestante) / tempoInicial * 100
            porcentagem = porcentagem + "%"
            console.log(porcentagem)
            $(".caixa .progresso").css("width", porcentagem);
            tempoRestante--;
            tempoJogo.text(tempoRestante);
        }
    }, 1000);
});


$("#botao-reiniciar").on("click", function () {
    campo.attr("disabled", false);
    campo.val("");
    $("#caracteres-digitados").text("0");
    $("#palavras-digitadas").text("0");
    $("#tempo").text(tempoInicial);
    $("#nome").val("");
})