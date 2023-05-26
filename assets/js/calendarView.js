class CalendarView{
  constructor(){

    this.elements = {}
  }

  init() {
    this.setElements()
    this.updateDisplayCurrentMonthAndYear(new Date())
  }

  setElements() {
    const elements = document.querySelectorAll("[id]")
     elements.forEach(el => {
        const elementId =  el.id.replace(/-([a-z])/g, function(_, letter) {
        return letter.toUpperCase();
      });
      this.elements[elementId] = el
     })
  }
  setViewCalendar(daysInMonth) {
    this.elements.calendar.innerHTML = ''
    daysInMonth.map(({day, disabled}, i) => {
      const isNewWeek = i  % 7 === 0
      let stringDay = String(day).padStart('2','0')
      if(isNewWeek) {
       let tr = document.createElement('tr')
       tr.innerHTML = `<td class="${disabled?'disabled':''}">${stringDay}</td>`
       this.elements.calendar.appendChild(tr)
      } else {
        let td = document.createElement('td')
        disabled ? td.classList.add('disabled') : ''
        td.innerHTML = stringDay
        this.elements.calendar.querySelector('tr:last-child').appendChild(td)
      }
      
      
     
    })
  }
  updateDisplayCurrentMonthAndYear(date){
    const el = this.elements.calendarHeader.querySelector('p')
    el.innerHTML = `${date.toLocaleString('pt-br', { month: 'long' })} <span>${date.getFullYear()}</span>`
  }
}