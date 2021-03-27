const now = moment("2021-03-27T13:00:00");
const savedAt = now.format("YYYY-MM-DD");
const $container = $(".container");
const scheduledEvents = getScheduledEvents();

// Display the current day
$("#currentDay").text(now.format("dddd, Do MMMM"));

// Create the timeblocks

for (let i = 9; i <= 17; i++) {
  const hour = i > 12 ? i - 12 : i;
  const meridiem = i < 12 ? "AM" : "PM";
  const inputId = hour + meridiem;
  const compareTime = moment(now).hour(i);
  const className = getTenseClassName(compareTime);

  $container.append(`
  <div class="row">
    <label for="${inputId}" class="hour col-xl-1 col-md-2 col-3">${hour} ${meridiem}</label>
    <textarea id="${inputId}" name="${inputId}" class="description ${className} row col-xl-10 col-md-9 col-8" rows="4" cols="33">${
    scheduledEvents[inputId] ?? ""
  }</textarea>
    <button type="button" class="saveBtn col" data-timeblock="${inputId}"><i class="far fa-save"></i></button>
  </div>
  `);
}

// Return appropriate class name when compared against provided moment
function getTenseClassName(compareMoment) {
  if (now.isBefore(compareMoment, "hour")) return "future";
  if (now.isAfter(compareMoment, "hour")) return "past";
  if (now.isSame(compareMoment, "hour")) return "present";
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
  window.localStorage.setItem(savedAt, serializeScheduledEvents);
}

// Get the stored events to display on page refresh and manage if local storage is empty
function getScheduledEvents() {
  // get the serialized object from local storage
  const eventsJson = window.localStorage.getItem(savedAt);
  // Determine if there is data in local storage - if empty set as an empty object or Parse string if data exists
  return eventsJson === null ? {} : JSON.parse(eventsJson);
}
