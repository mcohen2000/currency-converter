import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";


const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  let response;
  await fetch(`https://v6.exchangerate-api.com/v6/${process.env.VITE_ER_COM_API_KEY}/latest/USD`)
      .then(res => { if (res.status === 200) { return res.json() } })
      .then(data => response = data.conversion_rates);
  return {
    statusCode: 200,
    body: JSON.stringify({ response }),
  };
};

export { handler };
