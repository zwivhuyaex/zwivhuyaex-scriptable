// Date Countdown Widget
// Edit TARGET_DATE and EVENT_NAME below

const TARGET_DATE = new Date("2025-12-25"); // 🎄 Change this
const EVENT_NAME = "Christmas";

let widget = new ListWidget();
widget.backgroundColor = new Color("#0f172a");

let now = new Date();
let diff = TARGET_DATE - now;
let days = Math.ceil(diff / (1000 * 60 * 60 * 24));

let stack = widget.addStack();
stack.layoutVertically();
stack.centerAlignContent();

let ev = stack.addText(EVENT_NAME);
ev.font = Font.mediumSystemFont(13);
ev.textColor = new Color("#94a3b8");
ev.centerAlignText();

stack.addSpacer(4);

let num = stack.addText(days > 0 ? String(days) : "Today!");
num.font = Font.boldSystemFont(days > 99 ? 36 : 48);
num.textColor = new Color("#38bdf8");
num.centerAlignText();

if (days > 0) {
  let lbl = stack.addText("days away");
  lbl.font = Font.systemFont(12);
  lbl.textColor = new Color("#94a3b880");
  lbl.centerAlignText();
}

widget.presentSmall();
Script.setWidget(widget);
Script.complete();
