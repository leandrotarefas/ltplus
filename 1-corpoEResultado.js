
const fs = require('fs');


function writeJsonToFile(json, filepath) {
    const data = JSON.stringify(json) + '\n';
    fs.appendFile(filepath, data, (err) => {
        if (err) throw err;
        console.log('Arquivo salvo com sucesso!');
    });
}

function writeJsonArrayToFile(array, filepath) {
    const data = array.map(obj => JSON.stringify(obj)).join('\n');
    fs.appendFile(filepath, data, (err) => {
        if (err) throw err;
        console.log('Arquivo salvo com sucesso!');
    });
}


function readFileAndParseToArray(filePath) {
    let data = fs.readFileSync(filePath, 'utf8');  // lê o arquivo
    let linhas = data.split('\n');  // divide o conteúdo do arquivo em linhas

    // mapeia cada linha para um array de números
    let arrayDeArrays = linhas.map(linha => linha.split(',').map(Number));

    return arrayDeArrays;
}

let resultados = [...readFileAndParseToArray('/home/user/Downloads/loto_mania_asloterias_ate_concurso_2469_sorteio.csv')];
//console.log(resultados);

const janelaDeslizante = (resultados, tamanhoDaJanela) => {
    let resultado = [];
    for (let i = 0; i < resultados.length - tamanhoDaJanela + 1; i++) {
        resultado.push(resultados.slice(i, i + tamanhoDaJanela));
    }
    return resultado;
}

const tamanhoBloco = 9;

const blocos = janelaDeslizante(resultados, tamanhoBloco);

const indexarPosicao = (resultados, numero) => {

    const tamanhoResultados = resultados.length - 1;

    for (let index = tamanhoResultados; index >= 0; index--) {
        const linha = resultados[index];

        if (linha.includes(numero)) {

            if (index != tamanhoResultados) {
                return (index - tamanhoResultados) * -1;
            }

            return 0;
        }
    }

    return -1;
}


const gerarOutput = (resultado, numeros) => {

    const retorno = [];

    for (const numero of numeros) {
        if (resultado.includes(numero)) {
            retorno.push(String(numero))
        }
    }

    const chave = retorno.join(',');

    const output = {}

    output[chave] = 1;

    return output;
}

const series =
    [
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        [21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
        [31, 32, 33, 34, 35, 36, 37, 38, 39, 40],
        [41, 42, 43, 44, 45, 46, 47, 48, 49, 50],
        [51, 52, 53, 54, 55, 56, 57, 58, 59, 60],
        [61, 62, 63, 64, 65, 66, 67, 68, 69, 70],
        [71, 72, 73, 74, 75, 76, 77, 78, 79, 80],
        [81, 82, 83, 84, 85, 86, 87, 88, 89, 90],
        [91, 92, 93, 94, 95, 96, 97, 98, 99, 0]
    ]


for (const serie of series) {

    let indexResultado = 1;

    const corpoDeEstudoNeural = [];
    const corpoDePesquisaNeural = [];

    for (const bloco of blocos) {

        const input = {};

        for (const numero of serie) {
            const index = indexarPosicao(bloco, numero);
            //console.log(numero, ":", index);
            input[String(numero)] = index;
        }


        const resultado = blocos[indexResultado++];

        if (!resultado || resultado.length < tamanhoBloco) {
            console.log("\n\n----------------------------\nAtual :");
            console.log(input);
            corpoDePesquisaNeural.push(input);
            break;
        } else {
            console.log(input);
        }

        const posicaoResultado = resultado[tamanhoBloco - 1];

        const output = gerarOutput(posicaoResultado, serie);

        console.log("resultado => ", output);

        corpoDeEstudoNeural.push({ input, output });
    }

    writeJsonToFile(corpoDePesquisaNeural, `/home/user/Downloads/estudo_${serie.join('-')}.csv`);
    writeJsonArrayToFile(corpoDeEstudoNeural, `/home/user/Downloads/estudo_${serie.join('-')}.csv`);

}






