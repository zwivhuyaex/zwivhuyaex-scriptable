// World Clocks Widget
// Shows time in multiple zones — edit CITIES to customize

const CITIES = [
  { name: "Johannesburg", tz: "Africa/Johannesburg" },
  { name: "London",       tz: "Europe/London" },
  { name: "New York",     tz: "America/New_York" },
  { name: "Tokyo",        tz: "Asia/Tokyo" },
];

function timeIn(tz) {
  return new Date().toLocaleTimeString("en-ZA", {
    timeZone: tz,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  });
}

let widget = new ListWidget();
widget.backgroundColor = new Color("#111827");
widget.setPadding(12, 14, 12, 14);

for (let city of CITIES) {
  let row = widget.addStack();
  row.layoutHorizontally();

  let name = row.addText(city.name);
  name.font = Font.systemFont(12);
  name.textColor = new Color("#9ca3af");

  row.addSpacer();

  let time = row.addText(timeIn(city.tz));
  time.font = Font.monospacedSystemFont(13, .medium);
  time.textColor = new Color("#f9fafb");

  widget.addSpacer(6);
}

widget.presentSmall();
Script.setWidget(widget);
Script.complete();
