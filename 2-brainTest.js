
const fs = require('fs');

const brain = require('brain.js');


const  sortObjectByValuesDesc = (obj) => {
    // Primeiro, arredonde os valores para três casas decimais
    const roundedEntries = Object.entries(obj).map(([key, value]) => [key, parseFloat(value.toFixed(3))]);
  
    // Filtrar chaves que contêm exatamente uma vírgula
    const filteredEntries = roundedEntries.filter(([key]) => (key.match(/,/g) || []).length === 1);
  
    // Depois, ordene as entradas por valor em ordem decrescente
    filteredEntries.sort((a, b) => b[1] - a[1]);
  
    // Retorne apenas as chaves dos três primeiros elementos convertidos em inteiros, em um único array
    const numbers = filteredEntries.slice(0, 3).flatMap(([key]) => key.split(',').map(Number));
  
    // Remover números repetidos
    const uniqueNumbers = [...new Set(numbers)];
  
    // Ordenar números em ordem crescente
    uniqueNumbers.sort((a, b) => a - b);
  
    return uniqueNumbers;
  }


const  sortObjectByValuesDescFiller = (obj) => {

    // Primeiro, arredonde os valores para três casas decimais
    const roundedEntries = Object.entries(obj).map(([key, value]) => [key, parseFloat(value.toFixed(3))]);
  
    // Filtrar chaves que contêm exatamente uma vírgula
    const filteredEntries = roundedEntries.filter(([key]) => (key.match(/,/g) || []).length === 1);
  
    // Depois, ordene as entradas por valor em ordem decrescente
    filteredEntries.sort((a, b) => b[1] - a[1]);
  
    // Comece com os três primeiros elementos
    let numbers = filteredEntries.slice(0, 3).flatMap(([key]) => key.split(',').map(Number));
  
    // Remover números repetidos
    numbers = [...new Set(numbers)];
  
    // Se temos menos de 5 números, adicionamos mais até termos 5
    let index = 3;
    while(numbers.length < 5 && index < filteredEntries.length) {
      const additionalNumbers = filteredEntries[index][0].split(',').map(Number);
      for(const num of additionalNumbers) {
        if(!numbers.includes(num)) {
          numbers.push(num);
        }
  
        if(numbers.length === 5) {
          break;
        }
      }
      index++;
    }
  
    // Ordenar números em ordem crescente
    numbers.sort((a, b) => a - b);
  
    return numbers;
  }
  
  
async function readJsonArrayFromFile(filepath, callback) {
    try {
      const data = await fs.readFileSync(filepath, 'utf8');
      
      const array = data.split('\n').slice(1).filter(line => line).map(line => JSON.parse(line));
      
      var net = new brain.NeuralNetwork();

        net.train(array);

        const linha0 = data.split('\n')[0];
        const current = JSON.parse(linha0);

        var output = net.run(current[0]); 
        
        console.log(callback(output));

    } catch (err) {
      console.error('Ocorreu um erro ao ler o arquivo:', err);
    }
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
    readJsonArrayFromFile(`/home/user/Downloads/estudo_${serie.join('-')}.csv`, sortObjectByValuesDesc);
}


setTimeout(()=>{
    console.log('===============filled=================');
    //completando os que faltam, usar quando necessario
    for (const serie of series) {
         readJsonArrayFromFile(`/home/user/Downloads/estudo_${serie.join('-')}.csv`, sortObjectByValuesDescFiller);
     }
}, 10000)







