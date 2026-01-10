/**
 * Dados para cálculo de multas conforme NR 28 (Anexo I)
 * Valores baseados na gradação de multas (UFIR)
 */

const NR28_DATA = {
  // Valor da UFIR (conforme Portaria MTb n.º 290/1997, o valor é fixado em R$ 1,0641)
  // Embora a UFIR tenha sido extinta, ela permanece como base de cálculo para multas trabalhistas
  VALOR_UFIR: 1.0641,

  // Tabela de Gradação de Multas (Anexo I da NR 28)
  // Estrutura: [min_empregados, max_empregados] -> { grau: { seguranca: [min, max], medicina: [min, max] } }
  TABELA_GRADACAO: [
    {
      faixa: [1, 10],
      graus: {
        1: { seguranca: [630, 729], medicina: [378, 438] },
        2: { seguranca: [1129, 1391], medicina: [678, 835] },
        3: { seguranca: [1691, 2091], medicina: [1015, 1254] },
        4: { seguranca: [2252, 2792], medicina: [1351, 1675] }
      }
    },
    {
      faixa: [11, 25],
      graus: {
        1: { seguranca: [730, 830], medicina: [439, 498] },
        2: { seguranca: [1392, 1654], medicina: [836, 992] },
        3: { seguranca: [2092, 2492], medicina: [1255, 1495] },
        4: { seguranca: [2793, 3333], medicina: [1676, 2000] }
      }
    },
    {
      faixa: [26, 50],
      graus: {
        1: { seguranca: [831, 931], medicina: [499, 559] },
        2: { seguranca: [1655, 1917], medicina: [993, 1150] },
        3: { seguranca: [2493, 2893], medicina: [1496, 1736] },
        4: { seguranca: [3334, 3874], medicina: [2001, 2325] }
      }
    },
    {
      faixa: [51, 100],
      graus: {
        1: { seguranca: [932, 1032], medicina: [560, 619] },
        2: { seguranca: [1918, 2180], medicina: [1151, 1308] },
        3: { seguranca: [2894, 3294], medicina: [1737, 1977] },
        4: { seguranca: [3875, 4415], medicina: [2326, 2650] }
      }
    },
    {
      faixa: [101, 250],
      graus: {
        1: { seguranca: [1033, 1133], medicina: [620, 680] },
        2: { seguranca: [2181, 2443], medicina: [1309, 1466] },
        3: { seguranca: [3295, 3695], medicina: [1978, 2218] },
        4: { seguranca: [4416, 4956], medicina: [2651, 2975] }
      }
    },
    {
      faixa: [251, 500],
      graus: {
        1: { seguranca: [1134, 1234], medicina: [681, 740] },
        2: { seguranca: [2444, 2706], medicina: [1467, 1624] },
        3: { seguranca: [3696, 4096], medicina: [2219, 2459] },
        4: { seguranca: [4957, 5497], medicina: [2976, 3300] }
      }
    },
    {
      faixa: [501, 1000],
      graus: {
        1: { seguranca: [1235, 1335], medicina: [741, 801] },
        2: { seguranca: [2707, 2969], medicina: [1625, 1782] },
        3: { seguranca: [4097, 4497], medicina: [2460, 2700] },
        4: { seguranca: [5498, 6038], medicina: [3301, 3625] }
      }
    },
    {
      faixa: [1001, Infinity],
      graus: {
        1: { seguranca: [1336, 1436], medicina: [802, 862] },
        2: { seguranca: [2970, 3232], medicina: [1783, 1940] },
        3: { seguranca: [4498, 4898], medicina: [2701, 2941] },
        4: { seguranca: [6039, 6304], medicina: [3626, 3782] }
      }
    }
  ]
};

module.exports = NR28_DATA;
