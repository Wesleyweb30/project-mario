const player1 = {
  nome: "Mario",
  velocidade: 4,
  manobrabilidade: 3,
  poder: 3,
  pontos: 0,
};

const player2 = {
  nome: "Luigi",
  velocidade: 3,
  manobrabilidade: 4,
  poder: 4,
  pontos: 0,
};

// Função para gerar valores aleatórios de 1 a 6. Simula o dado da sorte.
async function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

// Função para ver qual tipo da corrida se é reta, curva ou confronto.
async function getRandomBlock() {
  let random = Math.random();
  let result;

  switch (true) {
    case random < 0.33:
      result = "RETA";
      break;

    case random < 0.66:
      result = "CURVA";
      break;
    default:
      result = "CONFRONTO";
      break;
  }
  return result;
}

async function logRollResult(playerName, block, diceResult, attribute) {
  console.log(
    `${playerName} 🎲 Rolou um dado de ${block} ${diceResult} + ${attribute} = ${
      diceResult + attribute
    }`
  );
}


async function playRaceEngine(player1, player2) {
  for (let round = 1; round <= 5; round++) {
    console.log(`🏁 Rodada ${round}`);

    //Sortear bloco
    let block = await getRandomBlock();
    console.log(`O bloco: ${block}`);

    //rolar os dados
    let diceResult1 = await rollDice();
    let diceResult2 = await rollDice();

    //teste de habilidade
    let totalTestSkill1 = 0;
    let totalTestSkill2 = 0;

    if (block === "RETA") {
      totalTestSkill1 = diceResult1 + player1.velocidade;
      totalTestSkill2 = diceResult2 + player2.velocidade;

      await logRollResult(
        player1.nome,
        "velocidade",
        diceResult1,
        player1.velocidade
      );

      await logRollResult(
        player2.nome,
        "velocidade",
        diceResult2,
        player2.velocidade
      );
    }

    if (block === "CURVA") {
      totalTestSkill1 = diceResult1 + player1.manobrabilidade;
      totalTestSkill2 = diceResult2 + player2.manobrabilidade;

      await logRollResult(
        player1.nome,
        "manobrabilidade",
        diceResult1,
        player1.manobrabilidade
      );

      await logRollResult(
        player2.nome,
        "manobrabilidade",
        diceResult2,
        player2.manobrabilidade
      );
    }

    if (block === "CONFRONTO") {
      let powerResult1 = diceResult1 + player1.poder;
      let powerResult2 = diceResult2 + player2.poder;

      console.log(`${player1.nome} confrontou com ${player2.nome}! 🥊`);

      await logRollResult(
         player1.nome,
         "poder",
         diceResult1,
         player1.poder
       );
 
       await logRollResult(
         player2.nome,
         "poder",
         diceResult2,
         player2.poder
       );

       if(powerResult1 > powerResult2 && player2.pontos > 0) {
         console.log(`${player1.nome} venceu o confronto! ${player2} Perdeu 1 ponto 🐢`)
         player2.pontos--;
       }

       if(powerResult2 > powerResult1 && player1.pontos > 0) {
         console.log(`${player2.nome} venceu o confronto! ${player1} Perdeu 1 ponto 🐢`)
         player1.pontos--;
       }
       
       console.log(powerResult2 === powerResult1 ? "Confronto empatado! nenhum ponto foi perdido." : "");

    }

    //Verificando o vencedor
    if (totalTestSkill1 > totalTestSkill2) {
      console.log(`${player1.nome} marcou um ponto!`);
      player1.pontos++;
    } else if(totalTestSkill2 > totalTestSkill1){
      console.log(`${player2.nome} marcou um ponto!`);
      player2.pontos++;
    }

    console.log("---------------------------------------------");

  }
}


async function declareWinner(player1, player2) {
   console.log("Resultado Final: ")
   console.log(`${player1.nome}: ${player1.pontos} pontos(s)`);
   console.log(`${player2.nome}: ${player2.pontos} pontos(s)`);

   if (player1.pontos > player2.pontos)
      console.log(`\n ${player1.nome} venceu a corrida! 🏆`);
    else if (player2.pontos > player1.pontos)
      console.log(`\n ${player2.nome} venceu a corrida! 🏆`);
    else 
      console.log("A corrida terminou em empate");
   
}

// Função que da o start do game.
(async function main() {
  console.log(
    `🏁🚨 Corrida entre ${player1.nome} e ${player2.nome} começando... \n`
  );
  await playRaceEngine(player1, player2);
  await declareWinner(player1, player2);
})();
