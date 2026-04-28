// Bitcoin Price Ticker
// Uses CoinGecko free API — requires internet

async function getBTC() {
  let url = "https://api.coingecko.com/api/v3/simple/price" +
    "?ids=bitcoin&vs_currencies=usd&include_24hr_change=true";
  let req = new Request(url);
  return await req.loadJSON();
}

let widget = new ListWidget();
widget.backgroundColor = new Color("#1c1917");
widget.setPadding(14, 14, 14, 14);

try {
  let data = await getBTC();
  let price = data.bitcoin.usd;
  let change = data.bitcoin.usd_24h_change;
  let up = change >= 0;

  let label = widget.addText("₿  BITCOIN");
  label.font = Font.mediumSystemFont(11);
  label.textColor = new Color("#f59e0b");

  widget.addSpacer(6);

  let priceText = widget.addText("$" + price.toLocaleString("en-US"));
  priceText.font = Font.boldSystemFont(26);
  priceText.textColor = new Color("#fafaf9");
  priceText.minimumScaleFactor = 0.7;

  widget.addSpacer(4);

  let changeText = widget.addText((up ? "▲ +" : "▼ ") + change.toFixed(2) + "% (24h)");
  changeText.font = Font.mediumSystemFont(12);
  changeText.textColor = new Color(up ? "#4ade80" : "#f87171");

} catch(e) {
  widget.addText("Price unavailable").textColor = new Color("#f87171");
}

widget.presentSmall();
Script.setWidget(widget);
Script.complete();
