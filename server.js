// server.js - Atualizado para usar VIEW e retornar dados diretos da entidade AD_VGFSAC
const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = 3000;

const appKey = process.env.APPKEY;
const username = process.env.USER_ID;
const password = process.env.PASSWORD;
const token = process.env.TOKEN;

app.use(express.static('public'));
app.use(express.static(__dirname)); // para servir index.html e js/css

app.get('/api/saldos', async (req, res) => {
  try {
    const loginRes = await fetch("https://api.sankhya.com.br/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "token": token,
        "appkey": appKey,
        "username": username,
        "password": password
      },
      body: JSON.stringify({})
    });

    const loginData = await loginRes.json();
    const bearerToken = loginData.bearerToken;
    if (!bearerToken) {
      return res.status(401).json({ erro: "Não foi possível obter bearerToken", detalhes: loginData });
    }

    const saldoPayload = {
      serviceName: "CRUDServiceProvider.loadRecords",
      requestBody: {
        dataSet: {
          rootEntity: "AD_VGFSAC",
          includePresentationFields: "N",
          tryJoinedFields: "true",
          offsetPage: "0",
          order: {
            orderFields: [
              { field: "REFERENCIA", desc: true }
            ]
          },
          criteria: {
            expression: {
              $: "CODCTABCOINT BETWEEN 1 AND 10"
            }
          },
          entity: [
            {
              path: "",
              fieldset: { list: "DESCRICAO,REFERENCIA,SALDOBCO,TIPOCONTA,CODCTABCOINT" }
            }
          ]
        }
      }
    };

    const saldoRes = await fetch("https://api.sankhya.com.br/gateway/v1/mge/service.sbr?serviceName=CRUDServiceProvider.loadRecords&outputType=json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${bearerToken}`,
        "appkey": appKey
      },
      body: JSON.stringify(saldoPayload)
    });

    const saldoData = await saldoRes.json();
    const registros = saldoData.responseBody?.entities || [];
    res.json(registros);

  } catch (erro) {
    console.error("❌ Erro geral:", erro);
    res.status(500).json({ erro: "Erro ao consultar saldo", detalhes: erro.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});