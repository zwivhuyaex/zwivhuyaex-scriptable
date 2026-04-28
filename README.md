# 📜 zwivhuyaex-scriptable

> A curated collection of [Scriptable](https://scriptable.app) widgets and scripts for iOS — built by [zwivhuyaex](https://github.com/zwivhuyaex).

![iOS](https://img.shields.io/badge/iOS-15%2B-black?style=flat-square&logo=apple)
![Scriptable](https://img.shields.io/badge/Scriptable-1.7%2B-blue?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)
![Scripts](https://img.shields.io/badge/scripts-10-purple?style=flat-square)

---

## What is Scriptable?

[Scriptable](https://scriptable.app) is a free iOS app that lets you run JavaScript on your iPhone or iPad. You can use it to build custom Home Screen widgets, automate tasks, interact with iOS APIs (Health, Reminders, Calendar, Location), and create interactive scripts — all without needing Xcode or a Mac.

---

## Contents

| # | Script | Type | Offline | API Key |
|---|--------|------|---------|---------|
| 01 | [Battery Monitor](#01-battery-monitor) | Small Widget | ✅ | — |
| 02 | [Date Countdown](#02-date-countdown) | Small Widget | ✅ | — |
| 03 | [Random Quote](#03-random-quote) | Medium Widget | ❌ | — |
| 04 | [Live Weather](#04-live-weather) | Small Widget | ❌ | — |
| 05 | [World Clocks](#05-world-clocks) | Small Widget | ✅ | — |
| 06 | [Daily Affirmation](#06-daily-affirmation) | Medium Widget | ✅ | — |
| 07 | [BTC Price Ticker](#07-btc-price-ticker) | Small Widget | ❌ | — |
| 08 | [Quick Reminders](#08-quick-reminders) | Run Script | ✅ | — |
| 09 | [Step Counter](#09-step-counter) | Small Widget | ✅ | — |
| 10 | [Focus Timer](#10-focus-timer) | Run Script | ✅ | — |

All scripts use **free, keyless APIs** where internet access is required. No paid services or account sign-ups needed.

---

## Getting Started

### Prerequisites

- iPhone or iPad running **iOS 15** or later
- [Scriptable](https://apps.apple.com/app/scriptable/id1405459188) installed (free on the App Store)

### Installing a Script

1. Open **Scriptable** on your device
2. Tap the **+** icon in the top-right corner
3. Paste the script code into the editor
4. Tap the script name at the top and give it a meaningful name
5. Tap the **▶ Run** button to test it

### Adding a Widget to Your Home Screen

1. Long-press your Home Screen until icons jiggle
2. Tap the **+** button (top-left on iOS 16+)
3. Search for **Scriptable**
4. Choose a widget size (Small, Medium, or Large)
5. Tap **Add Widget**
6. Long-press the newly placed widget → **Edit Widget**
7. Under **Script**, select the script you installed
8. Tap anywhere to save

---

## Scripts

---

### 01 Battery Monitor

**Type:** Small Widget  &nbsp;|&nbsp; **Offline:** Yes

Displays your current battery percentage with a dynamic color indicator — green when healthy, amber when getting low, and red when critical. Also detects and labels charging state.

**Preview:**
```
      🔋
      87%
     Good
```

**Customisation:** Edit the color thresholds or background color at the top of the script.

```javascript
// Battery Monitor Widget
// Add to Home Screen as a Small widget

let widget = new ListWidget();
widget.backgroundColor = new Color("#1a1a2e");

let battery = Device.batteryLevel();
let isCharging = Device.isCharging();
let pct = Math.round(battery * 100);

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
```

---

### 02 Date Countdown

**Type:** Small Widget  &nbsp;|&nbsp; **Offline:** Yes

Counts down the number of days to any event you specify. When the day arrives it shows "Today!" instead of a number.

**Customisation:** Edit `TARGET_DATE` and `EVENT_NAME` at the top of the script.

```javascript
// Date Countdown Widget
const TARGET_DATE = new Date("2025-12-25");
const EVENT_NAME  = "Christmas";

let widget = new ListWidget();
widget.backgroundColor = new Color("#0f172a");

let days = Math.ceil((TARGET_DATE - new Date()) / 86400000);

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
```

---

### 03 Random Quote

**Type:** Medium Widget  &nbsp;|&nbsp; **Offline:** No  &nbsp;|&nbsp; **API:** [ZenQuotes](https://zenquotes.io) (free, no key)

Fetches a fresh motivational quote each time the widget refreshes. Falls back to an error message if there is no internet connection.

```javascript
// Random Quote Widget
async function loadQuote() {
  let req = new Request("https://zenquotes.io/api/random");
  let json = await req.loadJSON();
  return { text: json[0].q, author: json[0].a };
}

let widget = new ListWidget();
widget.backgroundColor = new Color("#1e1b4b");
widget.setPadding(14, 14, 14, 14);

try {
  let quote = await loadQuote();

  let quoteText = widget.addText('"' + quote.text + '"');
  quoteText.font = Font.italicSystemFont(13);
  quoteText.textColor = new Color("#e0e7ff");
  quoteText.minimumScaleFactor = 0.7;

  widget.addSpacer(8);

  let author = widget.addText("— " + quote.author);
  author.font = Font.mediumSystemFont(11);
  author.textColor = new Color("#818cf8");

} catch (e) {
  let err = widget.addText("Could not load quote.");
  err.textColor = new Color("#f87171");
  err.font = Font.systemFont(12);
}

widget.presentMedium();
Script.setWidget(widget);
Script.complete();
```

---

### 04 Live Weather

**Type:** Small Widget  &nbsp;|&nbsp; **Offline:** No  &nbsp;|&nbsp; **API:** [Open-Meteo](https://open-meteo.com) (free, no key)

Shows the current temperature and wind speed at your device's location. Uses Open-Meteo — no API key or account required. Temperatures displayed in Celsius.

**Permissions required:** Location access (grant when prompted)

```javascript
// Live Weather Widget
async function getWeather(lat, lon) {
  let url = `https://api.open-meteo.com/v1/forecast?` +
    `latitude=${lat}&longitude=${lon}` +
    `&current_weather=true&temperature_unit=celsius`;
  let req = new Request(url);
  return await req.loadJSON();
}

function weatherIcon(code) {
  if (code === 0)  return "☀️";
  if (code <= 3)   return "🌤";
  if (code <= 48)  return "🌫";
  if (code <= 67)  return "🌧";
  if (code <= 77)  return "🌨";
  if (code <= 82)  return "🌦";
  return "⛈";
}

let widget = new ListWidget();
widget.backgroundColor = new Color("#0c1445");

try {
  let loc  = await Location.current();
  let data = await getWeather(loc.latitude, loc.longitude);
  let cw   = data.current_weather;

  let icon = widget.addText(weatherIcon(cw.weathercode));
  icon.font = Font.systemFont(36);
  icon.centerAlignText();

  widget.addSpacer(4);

  let temp = widget.addText(Math.round(cw.temperature) + "°C");
  temp.font = Font.boldSystemFont(36);
  temp.textColor = new Color("#ffffff");
  temp.centerAlignText();

  let wind = widget.addText("Wind " + Math.round(cw.windspeed) + " km/h");
  wind.font = Font.systemFont(11);
  wind.textColor = new Color("#ffffff80");
  wind.centerAlignText();

} catch(e) {
  widget.addText("Location unavailable").textColor = new Color("#f87171");
}

widget.presentSmall();
Script.setWidget(widget);
Script.complete();
```

---

### 05 World Clocks

**Type:** Small Widget  &nbsp;|&nbsp; **Offline:** Yes

Shows the current local time across multiple cities simultaneously. Useful for remote teams, family abroad, or frequent travellers.

**Customisation:** Edit the `CITIES` array — add or remove entries using any valid [IANA timezone string](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).

```javascript
// World Clocks Widget
const CITIES = [
  { name: "Johannesburg", tz: "Africa/Johannesburg" },
  { name: "London",       tz: "Europe/London" },
  { name: "New York",     tz: "America/New_York" },
  { name: "Tokyo",        tz: "Asia/Tokyo" },
];

function timeIn(tz) {
  return new Date().toLocaleTimeString("en-ZA", {
    timeZone: tz, hour: "2-digit", minute: "2-digit", hour12: false
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
```

---

### 06 Daily Affirmation

**Type:** Medium Widget  &nbsp;|&nbsp; **Offline:** Yes

Displays one of 20 built-in affirmations that rotates automatically by calendar day — no internet or configuration needed. A simple, calm widget to anchor your mornings.

```javascript
// Daily Affirmation Widget
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

let msg = AFFIRMATIONS[new Date().getDate() % AFFIRMATIONS.length];

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
```

---

### 07 BTC Price Ticker

**Type:** Small Widget  &nbsp;|&nbsp; **Offline:** No  &nbsp;|&nbsp; **API:** [CoinGecko](https://coingecko.com) (free, no key)

Shows the live Bitcoin price in USD and the 24-hour percentage change, coloured green for gains and red for losses.

```javascript
// Bitcoin Price Ticker
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
  let data   = await getBTC();
  let price  = data.bitcoin.usd;
  let change = data.bitcoin.usd_24h_change;
  let up     = change >= 0;

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
```

---

### 08 Quick Reminders

**Type:** Run Script  &nbsp;|&nbsp; **Offline:** Yes

A conversational prompt that lets you type a reminder and saves it directly to your iOS Reminders app. Can be run from the Scriptable app, the share sheet, or an iPhone shortcut.

**Permissions required:** Reminders access (grant when prompted)

```javascript
// Quick Reminder Creator
let alert = new Alert();
alert.title = "New Reminder";
alert.message = "What do you need to remember?";
alert.addTextField("e.g. Buy milk");
alert.addAction("Add Reminder");
alert.addCancelAction("Cancel");

let result = await alert.presentAlert();

if (result === 0) {
  let title = alert.textFieldValue(0).trim();

  if (title.length === 0) {
    let err = new Alert();
    err.title = "Empty reminder";
    err.message = "Please enter something.";
    err.addAction("OK");
    await err.presentAlert();
    Script.complete();
    return;
  }

  let reminder = new Reminder();
  reminder.title = title;
  reminder.isCompleted = false;
  await reminder.save();

  let confirm = new Alert();
  confirm.title = "Done ✓";
  confirm.message = '"' + title + '" added to Reminders.';
  confirm.addAction("Great");
  await confirm.presentAlert();
}

Script.complete();
```

---

### 09 Step Counter

**Type:** Small Widget  &nbsp;|&nbsp; **Offline:** Yes

Reads today's step count directly from Apple Health and displays it alongside a progress percentage toward a 10,000-step daily goal. Fully offline — no external APIs.

**Permissions required:** Apple Health read access for Step Count (grant when prompted)

**Customisation:** Change the `GOAL` constant to your personal daily target.

```javascript
// Step Counter Widget
const GOAL = 10000;

async function getSteps() {
  let hk       = new HealthKit();
  let interval = DateInterval.today();
  let steps    = await hk.queryQuantity("stepCount", interval, "sum");
  return steps ?? 0;
}

let widget = new ListWidget();
widget.backgroundColor = new Color("#022c22");
widget.setPadding(14, 14, 14, 14);

try {
  let steps = Math.round(await getSteps());
  let pct   = Math.min(steps / GOAL, 1);

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
  let err = widget.addText("Enable Health access\nin Settings.");
  err.font = Font.systemFont(12);
  err.textColor = new Color("#f87171");
}

widget.presentSmall();
Script.setWidget(widget);
Script.complete();
```

---

### 10 Focus Timer

**Type:** Run Script  &nbsp;|&nbsp; **Offline:** Yes

A Pomodoro-style focus timer. Choose 15, 25, or 45 minutes and receive a local iOS notification when your session is complete. Works even when Scriptable is closed.

```javascript
// Focus Timer (Pomodoro-style)
let alert = new Alert();
alert.title = "Focus Timer";
alert.message = "Choose your focus duration:";
alert.addAction("15 minutes");
alert.addAction("25 minutes");
alert.addAction("45 minutes");
alert.addCancelAction("Cancel");

let choice = await alert.presentAlert();
if (choice === -1) { Script.complete(); return; }

const durations = [15, 25, 45];
let minutes  = durations[choice];
let endTime  = new Date(Date.now() + minutes * 60 * 1000);

let notif = new Notification();
notif.title = "Focus session complete ✓";
notif.body  = minutes + " minutes done. Take a break!";
notif.sound = "default";
notif.scheduledDeliveryDate = endTime;
await notif.schedule();

let confirm = new Alert();
confirm.title   = "Timer started";
confirm.message = "You'll be notified in " + minutes + " min at " +
  endTime.toLocaleTimeString("en-ZA", { hour: "2-digit", minute: "2-digit" }) + ".";
confirm.addAction("Let's go!");
await confirm.presentAlert();

Script.complete();
```

---

## Permissions Reference

Some scripts need iOS system permissions. You will be prompted automatically on first run — just tap **Allow**.

| Permission | Required by |
|---|---|
| Location | Live Weather |
| Apple Health (Steps) | Step Counter |
| Reminders | Quick Reminders |
| Notifications | Focus Timer |

To manage permissions later: **Settings → Privacy & Security → [permission type] → Scriptable**

---

## Troubleshooting

**Widget shows "Error" or is blank**
- Open Scriptable and run the script manually to see the full error message.
- Make sure you granted the necessary permissions (see table above).

**Weather or quote widget shows old data**
- iOS controls how often widgets refresh — it is not instant. Tap the widget to force a manual refresh.

**Step Counter shows 0 or fails**
- Go to **Settings → Health → Data Access & Devices → Scriptable** and enable read access for Steps.

**Notifications not appearing for Focus Timer**
- Go to **Settings → Notifications → Scriptable** and ensure notifications are allowed.

---

## Contributing

Contributions are welcome! To add a new script:

1. Fork this repository
2. Add your `.js` file to the `/scripts` directory
3. Follow the existing naming convention: `script-name.js`
4. Add an entry to the Contents table and a script section in this README
5. Open a Pull Request with a short description

Please keep scripts self-contained, keyless where possible, and well-commented.

---

## License

MIT — see [LICENSE](./LICENSE) for details. Free to use, modify, and distribute.

---

<p align="center">Built with ☕ by <a href="https://github.com/zwivhuyaex">Zwivhuyaex Digital</a></p>
