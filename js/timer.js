const timer = (deadline) => {
    const span_sec = document.querySelector('#seconds')
    const span_min = document.querySelector('#minutes')
    const span_hours = document.querySelector('#hours')
    const span_days = document.querySelector('#days')

    const calcTimer = (endTime) => {
         total = Date.parse(endTime) - Date.parse(new Date())
        
        return valuesTime = {
            seconds: Math.floor(total / 1000 % 60),
            minutes: Math.floor(total / 1000 / 60 % 60),
            hours: Math.floor(total / 1000 / 60 / 60 % 24),
            days: Math.floor(total / 1000 / 60 / 60 / 24 )
        }
        
    }

    const addZero = (num) => {
        if (num < 10) {
            return '0' + num
        }
        else return num
    }

    const refreshTimer = (t = calcTimer(deadline)) => {
        if (total < 0) {
            span_sec.innerHTML = '00'
        span_min.innerHTML = '00'
        span_hours.innerHTML = '00'
        span_days.innerHTML = '00'
        clearInterval(updateTime)
        }
        
        span_sec.innerHTML = addZero(t.seconds)
        span_min.innerHTML = addZero(t['minutes'])
        span_hours.innerHTML = addZero(t['hours'])
        span_days.innerHTML = addZero(t['days'])
    }

    updateTime = setInterval(refreshTimer, 1000)
    
    
    
}

document.addEventListener('DOMContentLoaded', (e) => {
    timer('2023-04-30')
})
