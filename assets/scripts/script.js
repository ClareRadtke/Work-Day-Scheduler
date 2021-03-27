// Display the current day
const today = moment();
$("#currentDay").text(today.format("dddd, Do MMMM"));

const savedAt = today.format("YYYY-MM-DD");
// color block past, present and future hours
// identify current hour moment()
//if hour

// create the timeblocks
// delegate JQuery - events to elements pre-exist
const $container = $(".container");

for (let i = 9; i <= 17; i++) {
  const hour = i > 12 ? i - 12 : i;
  const meridiem = i < 12 ? "AM" : "PM";
  const inputId = hour + meridiem;

  $container.append(`
  <div class="row">
    <label for="${inputId}" class="hour col">${hour} ${meridiem}</label>
    <textarea id="${inputId}" name="${inputId}" class="description row col-10" rows="4" cols="33">
    </textarea>
    <button type="button" class="saveBtn col"><i class="far fa-save"></i></button>
  </div>
  `);
}

// save any textarea input to local storage textArea.value
//serialization - JSON.stringify();

const schedulerStorage = window.localStorage;
const scheduledEvents = {
  "9AM": "",
  "10AM": "hai;er 56346ufh",
  "11AM": "hai;erufh",
  "12PM": "",
  "1PM": "",
  "2PM": "hai;erufh",
  "3PM": "hai;e67463 rufh",
  "4PM": "hai;erufh",
  "5PM": "",
};
// Any textarea value is to be stored in an object
// that is then serialized and stored in localStorage

function storeScheduledEvents(obj) {
  let serializeScheduledEvents = JSON.stringify(obj);
  schedulerStorage.setItem(savedAt, serializeScheduledEvents);
}

// .click(saveBtn)
