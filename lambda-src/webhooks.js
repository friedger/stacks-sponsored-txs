const {
  sponsorTransaction,
  deserializeTransaction,
  broadcastTransaction,
  AuthType,
} = require('@stacks/transactions');

require('dotenv').config();

const sponsorPrivateKey = process.env.SPONSOR_WALLET_PRIVATE_KEY;

const statusCode = 200;
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
};

exports.handler = async (event, context) => {
  try {
    const body = JSON.parse(event.body);
    const tx = body.data.object;
    const transaction = deserializeTransaction(tx);

    if (transaction.auth.authType === AuthType.Standard) {
      return {
        statusCode: 400,
        headers,
        body: `Must be sponsored transaction`,
      };
    }

    const sponsoredTx = await sponsorTransaction({
      sponsorPrivateKey,
      transaction,
    });
    const result = await broadcastTransaction(sponsorTransaction, network);

    return {
      statusCode,
      headers,
      body: `{result: ${result}}`,
    };
  } catch (e) {
    return {
      statusCode: 400,
      headers,
      body: `${e.toString()} in ${event.body}`,
    };
  }
};
