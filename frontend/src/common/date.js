import dayjs from "dayjs";

var utc = require("dayjs/plugin/utc"); // dependent on utc plugin
var timezone = require("dayjs/plugin/timezone");
dayjs.extend(utc);
dayjs.extend(timezone);

export const showDateTime = (dateString) => {
  return dayjs(dateString).tz("Asia/Bangkok").format("hh:mmA, DD/MM/YYYY");
};
