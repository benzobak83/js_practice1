

function ModalOn(trigger, modal, close, windowClose = true, scroll = calcScrollWidth()) {
   
    const btn_triggers = document.querySelectorAll(trigger)

    const btnNextPopup = document.querySelectorAll('.button')

    
    btnNextPopup.forEach(item => item.addEventListener('click', (e) =>{
        if (document.querySelector('.error_modal')) throw Error
        if ((e.target.parentNode.parentNode.classList.contains('popup_dialog'))){
         document.querySelector(modal).style.display = 'none'
        //  document.body.style.marginRight = `0px`
        }
    }))

    for (let b_trigger of btn_triggers) 
        {b_trigger.addEventListener('click', (e) =>{
            if (document.querySelector('.error_modal')) throw Error
        if (e.target) e.preventDefault();
        
        document.body.style.marginRight = `${scroll}px`
        document.querySelector(modal).style.display = 'block'
        
        document.body.style.overflow = 'hidden'
            })
        }

    const btn_closes = document.querySelectorAll(close)

    for (let b_close of btn_closes) 
    {
        b_close.addEventListener('click', () => {
            
            document.querySelector(modal).style.display = 'none'
            document.body.style.marginRight = `0px`
            document.body.style.overflow = ''
        })
    }

    document.querySelector(modal).addEventListener('click', (e) => {
        if ((e.target === document.querySelector(modal)) && windowClose) {
            
            console.log(1)
            document.querySelector(modal).style.display = 'none'
            document.body.style.marginRight = `0px`
            document.body.style.overflow = ''
        }
    })

    

   

}

function showPopup(show_modal, time) {
    setTimeout(() => {
        
        if (document.body.style.overflow == '')
        document.querySelector(show_modal).style.display = 'block'
        document.body.style.overflow = 'hidden'
        }, time)
}

function calcScrollWidth() {
    let div = document.createElement('div')
    document.body.appendChild(div)
    div.style.overflowY = 'scroll'
    scrollWidth = div.offsetWidth - div.clientWidth
    return scrollWidth
}





document.addEventListener('DOMContentLoaded', (e) => {
    

    ModalOn('.popup_engineer_btn',
            '.popup_engineer',
            '.popup_close')

    ModalOn('.phone_link',
            '.popup',
            '.popup_close')

    ModalOn('.glazing_price',
            '.popup_calc',
            '.popup_calc_close')

    ModalOn('.popup_calc_button',
            '.popup_calc_profile',
            '.popup_calc_profile_close',
            false
            )
    ModalOn('.popup_calc_profile_button',
            '.popup_calc_end',
            '.popup_calc_end_close',
            false
            )

    showPopup('.popup_engineer', 60000)       

})