console.log("Vercel確認テスト");
// ===============================
// 要素取得
// ===============================

const modelSelect = document.getElementById("model");
const repairList = document.getElementById("repair-list");
const estimate = document.getElementById("estimate");
const totalPrice = document.getElementById("totalPrice");
const reserveButton = document.getElementById("reserveButton");

// ===============================
// 機種一覧表示
// ===============================

Object.keys(prices).forEach(model => {

    const option = document.createElement("option");
    option.value = model;
    option.textContent = model;

    modelSelect.appendChild(option);

});

// ===============================
// 修理項目表示
// ===============================

repairs.forEach(repair => {

    const item = document.createElement("div");
    item.className = "repair-item";

    item.innerHTML = `
        <input
            type="checkbox"
            id="${repair}"
            value="${repair}"
        >

        <label for="${repair}">
            ${repair}
        </label>
    `;

    repairList.appendChild(item);

});

// ===============================
// イベント登録
// ===============================

modelSelect.addEventListener("change", updateEstimate);

repairList.addEventListener("change", updateEstimate);

// ===============================
// 見積もり更新
// ===============================

function updateEstimate() {

    const model = modelSelect.value;

    estimate.innerHTML = "";

    let total = 0;

    if (!model) {

        estimate.innerHTML = `
            <p class="empty">
                機種を選択してください
            </p>
        `;

        totalPrice.textContent = "¥0(税込)";

        return;

    }

    const checked = document.querySelectorAll(
        '#repair-list input[type="checkbox"]:checked'
    );

    if (checked.length === 0) {

        estimate.innerHTML = `
            <p class="empty">
                修理内容を選択してください
            </p>
        `;

        totalPrice.textContent = "¥0(税込)";

        return;

    }

    checked.forEach(item => {

        const repair = item.value;

        const price = prices[model][repair];

        total += price;

        const row = document.createElement("div");

        row.className = "estimate-row";

        row.innerHTML = `
            <span>✔︎ ${repair}</span>
            <span>¥${price.toLocaleString()}(税込)</span>
        `;

        estimate.appendChild(row);

    });

    totalPrice.textContent =
        "¥" + total.toLocaleString() + "(税込)";

}

// ===============================
// 予約ボタン
// ===============================

reserveButton.addEventListener("click", () => {

    const model = modelSelect.value;

    if (!model) {

        alert("機種を選択してください");

        return;

    }

    const checked = document.querySelectorAll(
        '#repair-list input[type="checkbox"]:checked'
    );

    if (checked.length === 0) {

        alert("修理内容を選択してください");

        return;

    }

    const repairs = [];

    let total = 0;

    checked.forEach(item => {

        repairs.push(item.value);

        total += prices[model][item.value];

    });
    
　　　alert("ボタンが押されました");
    
    // liff.jsで定義する関数を呼び出す
    sendEstimate(model, repairs, total);

});
