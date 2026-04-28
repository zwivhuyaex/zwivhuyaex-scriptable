// Live Weather Widget
// Uses Open-Meteo (free, no API key needed)

async function getWeather(lat, lon) {
  let url = `https://api.open-meteo.com/v1/forecast?` +
    `latitude=${lat}&longitude=${lon}` +
    `&current_weather=true&temperature_unit=celsius`;
  let req = new Request(url);
  return await req.loadJSON();
}

function weatherIcon(code) {
  if (code === 0) return "☀️";
  if (code <= 3) return "🌤";
  if (code <= 48) return "🌫";
  if (code <= 67) return "🌧";
  if (code <= 77) return "🌨";
  if (code <= 82) return "🌦";
  return "⛈";
}

let widget = new ListWidget();
widget.backgroundColor = new Color("#0c1445");

try {
  let loc = await Location.current();
  let data = await getWeather(loc.latitude, loc.longitude);
  let cw = data.current_weather;

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
