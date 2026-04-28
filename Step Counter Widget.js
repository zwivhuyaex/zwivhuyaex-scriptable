// Step Counter Widget
// Reads from Apple Health — grant Health permissions when prompted

const GOAL = 10000;

async function getSteps() {
  let hk = new HealthKit();
  let interval = DateInterval.today();
  let steps = await hk.queryQuantity("stepCount", interval, "sum");
  return steps ?? 0;
}

let widget = new ListWidget();
widget.backgroundColor = new Color("#022c22");
widget.setPadding(14, 14, 14, 14);

try {
  let steps = Math.round(await getSteps());
  let pct = Math.min(steps / GOAL, 1);

  let label = widget.addText("👟  steps today");
  label.font = Font.mediumSystemFont(11);
  label.textColor = new Color("#6ee7b7");

  widget.addSpacer(4);

  let countText = widget.addText(steps.toLocaleString("en-ZA"));
  countText.font = Font.boldSystemFont(32);
  countText.textColor = new Color("#ecfdf5");

  widget.addSpacer(6);

  let goalText = widget.addText("Goal: " + GOAL.toLocaleString() + "  ·  " + Math.round(pct * 100) + "%");
  goalText.font = Font.systemFont(11);
  goalText.textColor = new Color("#6ee7b780");

} catch(e) {
  let err = widget.addText("Enable Health access
in Settings.");
  err.font = Font.systemFont(12);
  err.textColor = new Color("#f87171");
}

widget.presentSmall();
Script.setWidget(widget);
Script.complete();
