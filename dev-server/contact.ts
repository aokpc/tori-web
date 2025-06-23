// Discord Webhook URLを設定
const DISCORD_WEBHOOK_URL = Deno.env.get("AUTH")!;

// Email形式をチェックする関数
function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Discord WebhookにEmbedメッセージを送信する関数
async function sendToDiscord(name: string, email: string, message: string): Promise<Response> {
    const embed = {
        embeds: [
            {
                title: "新しい問い合わせ",
                fields: [
                    { name: "名前", value: name, inline: true },
                    { name: "メール", value: `[${email}](mailto:${email})`, inline: true },
                    { name: "メッセージ", value: message },
                ],
                color: 7506394, // Embedの色 (例: 青)
            },
        ],
    };

    return await fetch(DISCORD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(embed),
    });
}

// サーバーのエントリーポイント
Deno.serve(async (req) => {
    const url = new URL(req.headers.get("Referer") || "");
    const allowedOrigins = ["http://localhost:3000", "https://kite-birdman.f5.si"];

    // オリジンチェック
    if (!allowedOrigins.includes(url.origin)) {
        return new Response("Not Found", { status: 404 });
    }

    // OPTIONSリクエストを許可
    if (req.method === "OPTIONS") {
        return new Response(null, {
            status: 204,
            headers: {
                "Access-Control-Allow-Origin": url.origin,
                "Access-Control-Allow-Methods": "POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
            },
        });
    }

    if (req.method === "POST") {
        try {
            const body = await req.json();
            const { name, email, message } = body;

            // 必須フィールドのチェック
            if (!name || !email || !message) {
                return new Response("Missing fields", { status: 400 });
            }

            // Email形式のチェック
            if (!isValidEmail(email)) {
                return new Response("Invalid email format", { status: 400 });
            }

            // Discord Webhookに送信
            const discordResponse = await sendToDiscord(name, email, message);

            if (discordResponse.ok) {
                return new Response("ok", {
                    status: 200,
                    headers: { "Access-Control-Allow-Origin": url.origin },
                });
            } else {
                return new Response("Internal Server Error:F", { status: 500 });
            }
        } catch (error) {
            console.error("Error:", error);
            return new Response("Internal Server Error:E", { status: 500 });
        }
    } else {
        return new Response("Method Not Allowed", { status: 405 });
    }
});