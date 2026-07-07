// ========================================
// LIFF ID
// LINE DevelopersのLIFF IDに変更してください
// ========================================

// ========================================
// LIFF ID
// ========================================

const LIFF_ID = "2010574933-aX35Dagg";

// ========================================
// LIFF初期化
// ========================================

window.addEventListener("DOMContentLoaded", async () => {

    try {

        await liff.init({
            liffId: LIFF_ID
        });
        if (!liff.isLoggedIn()) {
    console.log("LINE未ログイン");
    return;
}

        console.log("LIFF 初期化完了");

    } catch (error) {

        console.error(error);
        alert("LIFFの初期化に失敗しました。");

    }

});

// ========================================
// LINEへ見積もり送信
// ========================================

async function sendEstimate(model, repairList, total) {

    const message =
`【お見積もり金額】

📱機種
${model}

🔧修理内容
${repairList.map(item => "・" + item).join("\n")}

💰合計金額
¥${total.toLocaleString()}（税込）

────────

▼ 修理をご希望の場合は、
下記よりご予約ください。

🔗 ご予約はこちら
https://liff.line.me/2010529454-guL25Ayb?liff_id=2010529454-guL25Ayb&is=xQufJ7L4Ay`;


    try {

        if (!liff.isInClient()) {

            alert("LINEアプリから開いてください。");

            return;

        }
        
        await liff.sendMessages([
            {
                type: "text",
                text: message
            }
        ]);

        alert("予約内容を送信しました。");

        liff.closeWindow();

    } catch (error) {

        console.error(error);

        alert("送信に失敗しました。");

    }

}
