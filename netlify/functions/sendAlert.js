exports.handler = async function (event, context) {
  
  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  if (!BOT_TOKEN || !CHAT_ID) {
    return {
      statusCode: 400,
      body: "Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID",
    };
  }

  const message = "🚨 Test Alert: Netlify Functions working successfully!";

  const sendURL = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  try {
    const res = await fetch(sendURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
      }),
    });

    return {
      statusCode: 200,
      body: "Alert sent!",
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: "Failed to send Telegram alert",
    };
  }
};