import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  
  return {
    statusCode: 200,
    body: JSON.stringify({ message: import.meta.env.VITE_TEST, event, context }),
  };
};

export { handler };
