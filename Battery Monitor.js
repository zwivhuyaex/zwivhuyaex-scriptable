// Battery Monitor Widget
// Add to Home Screen as a Small widget

let widget = new ListWidget();
widget.backgroundColor = new Color("#1a1a2e");

let battery = Device.batteryLevel();
let isCharging = Device.isCharging();
let pct = Math.round(battery * 100);

// Color based on level
let color = pct > 50 ? "#00d4aa" : pct > 20 ? "#f7c948" : "#e74c3c";

let stack = widget.addStack();
stack.layoutVertically();
stack.centerAlignContent();

let icon = stack.addText(isCharging ? "⚡" : "🔋");
icon.font = Font.systemFont(28);
icon.centerAlignText();

stack.addSpacer(6);

let pctText = stack.addText(pct + "%");
pctText.font = Font.boldSystemFont(32);
pctText.textColor = new Color(color);
pctText.centerAlignText();

let label = stack.addText(isCharging ? "Charging" : (pct > 20 ? "Good" : "Low"));
label.font = Font.systemFont(13);
label.textColor = new Color("#ffffff80");
label.centerAlignText();

widget.presentSmall();
Script.setWidget(widget);
Script.complete();
