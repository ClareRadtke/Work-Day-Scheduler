const today = moment();
const savedAt = today.format("YYYY-MM-DD");
const currentHour = today;
const schedulerStorage = window.localStorage;
const scheduledEvents = getScheduledEvents();

// Display the current day
$("#currentDay").text(today.format("dddd, Do MMMM"));

// Create the timeblocks
const $container = $(".container");

for (let i = 9; i <= 17; i++) {
  const hour = i > 12 ? i - 12 : i;
  const meridiem = i < 12 ? "AM" : "PM";
  const inputId = hour + meridiem;
  const compareTime = moment(today).hour(i);
  const className = getTenseClassName(compareTime);

  $container.append(`
  <div class="row">
    <label for="${inputId}" class="hour col">${hour} ${meridiem}</label>
    <textarea id="${inputId}" name="${inputId}" class="description ${className} row col-10" rows="4" cols="33">${
    scheduledEvents[inputId] ?? ""
  }</textarea>
    <button type="button" class="saveBtn col" data-timeblock="${inputId}"><i class="far fa-save"></i></button>
  </div>
  `);
}

// Return appropriate class name when compared against provided moment
function getTenseClassName(compareMoment) {
  if (today.isBefore(compareMoment, "hour")) {
    return "future";
  }
  if (today.isAfter(compareMoment, "hour")) {
    return "past";
  }
  if (today.isSame(compareMoment, "hour")) {
    return "present";
  }
}

// On click of SaveBtn
$(".saveBtn").click(function (event) {
  // Identify the corresponding textArea ID using data attribute
  const eventTime = event.currentTarget.dataset.timeblock;
  const textAreaContent = $(`#${eventTime}`).val();
  // Add textArea velue to an object using the eventTime as Key
  scheduledEvents[eventTime] = textAreaContent;
  // Serialize object and add to local storage
  storeScheduledEvents(scheduledEvents);
});

function storeScheduledEvents(obj) {
  // Serialize object
  let serializeScheduledEvents = JSON.stringify(obj);
  // save to local stroage with today's date as key
  schedulerStorage.setItem(savedAt, serializeScheduledEvents);
}

// Get the stored events to display on page refresh and manage if local storage is empty
function getScheduledEvents() {
  // get the serialized object from local storage
  const eventsJson = schedulerStorage.getItem(savedAt);
  // Determine if there is data in local storage - if empty set as an empty object or Parse string if data exists
  return eventsJson === null ? {} : JSON.parse(eventsJson);
}

// TODO:
// color block past, present and future hours
// identify current hour moment() use currentHour
