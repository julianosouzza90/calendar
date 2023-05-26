import { CalendarView } from "./calendarView.js";
import { CalendarController } from "./calendarController.js";
const calendarView = new CalendarView()
const calendarController = new CalendarController({calendarView: calendarView})

calendarController.init()