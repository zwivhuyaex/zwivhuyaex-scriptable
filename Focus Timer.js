// Focus Timer (Pomodoro-style)
// Run as a script — schedules a notification when time is up

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
let minutes = durations[choice];
let endTime = new Date(Date.now() + minutes * 60 * 1000);

// Schedule local notification
let notif = new Notification();
notif.title = "Focus session complete ✓";
notif.body = minutes + " minutes done. Take a break!";
notif.sound = "default";
notif.scheduledDeliveryDate = endTime;
await notif.schedule();

let confirm = new Alert();
confirm.title = "Timer started";
confirm.message = "You'll be notified in " + minutes + " min at " +
  endTime.toLocaleTimeString("en-ZA", { hour: "2-digit", minute: "2-digit" }) + ".";
confirm.addAction("Let's go!");
await confirm.presentAlert();

Script.complete();
