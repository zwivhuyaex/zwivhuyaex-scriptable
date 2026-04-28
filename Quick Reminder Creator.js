// Quick Reminder Creator
// Run as a script (not a widget) — appears in your share sheet too

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
