// Daily Affirmation Widget
// Rotates by day — no internet required

const AFFIRMATIONS = [
  "I am capable of achieving great things.",
  "Today I choose growth over comfort.",
  "I am worthy of love and respect.",
  "Challenges make me stronger.",
  "I attract positive energy into my life.",
  "My potential is limitless.",
  "I am grateful for this new day.",
  "I trust the journey I am on.",
  "I bring value to everyone I meet.",
  "I am calm, focused, and ready.",
  "Every day I become a better version of myself.",
  "I deserve success and happiness.",
  "My mind is clear and my heart is open.",
  "I face obstacles with courage.",
  "I am enough, exactly as I am.",
  "Good things are coming my way.",
  "I create my own opportunities.",
  "I am at peace with my past.",
  "My confidence grows stronger each day.",
  "I choose joy, always.",
];

let day = new Date().getDate();
let msg = AFFIRMATIONS[day % AFFIRMATIONS.length];

let widget = new ListWidget();
widget.backgroundColor = new Color("#1a1035");
widget.setPadding(16, 16, 16, 16);

let top = widget.addText("✦  today");
top.font = Font.mediumSystemFont(10);
top.textColor = new Color("#a78bfa");

widget.addSpacer(8);

let text = widget.addText(msg);
text.font = Font.italicSystemFont(14);
text.textColor = new Color("#f3f4f6");
text.minimumScaleFactor = 0.75;

widget.presentMedium();
Script.setWidget(widget);
Script.complete();
