export class CalendarController {
  constructor({calendarView}) {

    this.currentDate = new Date()

    this.calendarView = calendarView
  }
  init() {
    this.calendarView.init()
    this.calendarView.elements.previousDate.addEventListener('click',() => {
      this.previousCurrentMonthAndYear()
      this.calendarView.updateDisplayCurrentMonthAndYear(this.currentDate)
    })
    this.calendarView.elements.nextDate.addEventListener('click',() => {
      this.nextCurrentMonthAndYear()
      this.calendarView.updateDisplayCurrentMonthAndYear(this.currentDate)
    })

    this.setCalendar() 
  }

 
  setCalendar() {

    const daysInMonth = Array.from({
      length: this.getTotalDaysInCurrentMonth()
    }).map((_,i) => {
      return {
        day: new Date(this.currentDate.getFullYear(),this.currentDate.getMonth(), i + 1)
        .getDate(),
        disabled: false
      }
    })
   
   
    const previousMonthDays = this.getLastDaysOfThePreviousMonth()
    const nextMonthDays = this.getFirstDaysOfTheNextMonth()
    const daysInCalendar = [...previousMonthDays, ...daysInMonth, ...nextMonthDays]

    this.calendarView.setViewCalendar(daysInCalendar);
  }
  
  getFirstDaysOfTheNextMonth(){
    const currentDate = new Date(this.currentDate)
    const totalDaysInCurrentMonth = this.getTotalDaysInCurrentMonth()
    currentDate.setDate(totalDaysInCurrentMonth)
    const weekDay = currentDate.getDay()
    return Array.from({
      length: (7 -  weekDay) - 1
    }).map((_,i) => {
      let dateNext = currentDate.setDate(currentDate.getDate() + 1)
      return {
        day:  new Date(dateNext).getDate(),
        disabled: true
      }
    })
  }
  getLastDaysOfThePreviousMonth(){
    const currentDate = new Date(this.currentDate)
    currentDate.setDate(1)
    const weekDay = currentDate.getDay()
    return Array.from({
      length: weekDay
    }).map((_,i) => {
      let datePas = currentDate.setDate(currentDate.getDate() - 1)
      return {
        day:  new Date(datePas).getDate(),
        disabled: true
      }
    }).reverse()
  }
  nextCurrentMonthAndYear() {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1)
    this.setCalendar()
  }
  previousCurrentMonthAndYear() {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1)
    this.setCalendar()
  }
  getTotalDaysInCurrentMonth() {
    const year = this.currentDate.getFullYear()
    const month = this.currentDate.getMonth()
    const firstDayOfNextMonth = new Date(year, month + 1, 1)

    firstDayOfNextMonth.setDate(firstDayOfNextMonth.getDate() - 1)
    const totalDaysInCurrentMonth = firstDayOfNextMonth.getDate()
    
    return totalDaysInCurrentMonth;

  }
}


