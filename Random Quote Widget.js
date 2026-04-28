// Random Quote Widget
// Uses the free ZenQuotes API — requires internet

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
