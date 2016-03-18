'use strict';

const notifier = require('node-notifier');
const path = require('path');

// Five minutes:
const INTERVAL = 1000 * 60 * 5;
// Timeout response:
const RESPONSE_TIMEOUT = 'Timeout\n';

// Keep track of the number of timeouts:
let timeouts = 0;
let paused = 0;

const notify = () => {
  if (paused > 0) {
    paused--;
    return;
  }
  notifier.notify({
    title: 'Focus',
    subtitle: "Don't waste time.",
    message: "Click to acknowledge.",
    icon: path.join(__dirname, 'focus.png'),
    sound: true,
    wait: true,
    sound: 'Pop',
  }, function (err, response) {
    if (response === RESPONSE_TIMEOUT) {
      timeouts++;
    } else {
      timeouts = 0;
    }
    // Halt for an hour:
    if (timeouts > 3) {
      paused = 12;
    }
  });
};

// Start our notify interval:
setInterval(notify, INTERVAL);

// Notify to start!
notify();
