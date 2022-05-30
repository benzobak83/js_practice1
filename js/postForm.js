
const form = (arrayForm) =>  {
    
    const forms = document.querySelectorAll('form'),
          inputs = document.querySelectorAll('input');

    const messages = {
        succsesfull: 'Спасибо за заявку. Мы свяжемся с Вами в ближайшее время',
        loading: 'Загрузка...',
        error: 'Что-то пошло не так...',
        uncorrected: 'Форма заполнена не полностью'
    } 

    const phone = document.querySelectorAll('input[name = "user_phone"')
    const formControls = document.querySelectorAll('.form-control')
    
    phone.forEach(item => {
        
        item.addEventListener('input', () => {
            item.value = item.value.replace(/\D/, '')
        })
    })

    formControls.forEach(item => {
        if (item.parentNode.classList.contains('popup_calc_content')) {
        item.addEventListener('input', () => {
            item.value = item.value.replace(/\D/, '')
        })
    }
    })

    const clearInputs = () => {
        inputs.forEach(item => item.value = (''))
    }

    const postData = async (url, data) => {
        document.querySelector('.status').innerHTML = messages.loading
        let res = await fetch(url, {
            method: "POST",
            body: data
        });
        return await res.text()
    }

    forms.forEach(item  =>{
        item.addEventListener('submit', (e) => {
            e.preventDefault()
            let divMsg = document.createElement('div')
            divMsg.classList.add('status')
            item.appendChild(divMsg)
            let formData = new FormData(item)  
            
            if (item.getAttribute('data-form') === 'initInputs') {
                for (let key in arrayForm) {
                    console.log('dada')
                    formData.append(key, arrayForm[key])
                }
                
                
            }
            postData('https://benzobak.local/practice/src/assets/server.php',formData )
            .then(res => {
                console.log(res)
                if ((item.getAttribute('data-form') === 'initInputs') && (Object.keys(arrayForm).length < 5)) throw Error 
                divMsg.innerHTML = messages.succsesfull
                
            })
            .catch(
                () => {
                    if ((item.getAttribute('data-form') === 'initInputs') && (Object.keys(arrayForm).length < 5))  divMsg.innerHTML = messages.uncorrected;
                    else divMsg.innerHTML = messages.error
                })
            .finally(() => {
                clearInputs()
                setTimeout(() => divMsg.remove(), 5000)
            })
        })
    })


}

// ---------добавление инпутов в калькуляторе в основную форму-----------
function initForm(state) {
    const windowOption = document.querySelectorAll('.balcon_icons_img')
    const windowWidth = document.querySelectorAll('#width')
    const windowHeight = document.querySelectorAll('#height')
    const windowType = document.querySelectorAll('#view_type')
    const windowProfile = document.querySelectorAll('.checkbox')
    
    const bindToForm = (event, el, prop) => {
        el.forEach((item, i) => {
            item.addEventListener(event, () => {
                switch(item.nodeName) {
                    
                    case 'SPAN': 
                        
                            arrayForm[prop] = `${(i+1)} форма окна`
                            break;

                    case 'INPUT': 

                        if (item.parentNode === document.querySelector('.popup_calc_content')) {
                            arrayForm[prop] = item.value
                        }
                        else {
                            el.forEach((checkbox, g) =>{
                                 checkbox.checked = false
                                if (i == g) checkbox.checked = true;
                                i == 0? arrayForm[prop] = 'cold' :  arrayForm[prop] = 'warm'
                            })
                        }
                        break;
                        
                    case 'SELECT': 
                        arrayForm[prop] = item.value
                        break;
                }
                console.log(arrayForm)
            })
    })
}

    bindToForm('click', windowOption, 'form')
    bindToForm('input', windowWidth, 'width')
    bindToForm('input', windowHeight, 'height')
    bindToForm('change', windowType, 'type')
    bindToForm('change', windowProfile, 'profile')
}


 // -------проверка заполнения данных на модалке------
function checkLengthArray (targetCheck, length, parentCheck) {
    let target = document.querySelector(targetCheck)
    const parent = document.querySelector(parentCheck)
    target.addEventListener('click', (e) => {
        if (Object.keys(arrayForm).length < length) {
            
            let error = document.createElement('div')
            
            error.classList.add('status')
            error.classList.add('error_modal')
            error.style.marginTop = '20px'
            error.innerHTML = 'Заполнены не все данные'
            if (document.querySelector('.error_modal')) throw Error
            parent.appendChild(error)
            setTimeout(() => error.remove(), 2000)
        }
    })
}





// ----------without function-----------
const arrayForm = {}



document.addEventListener('DOMContentLoaded', (e) => {
    initForm(arrayForm)
    
    form(arrayForm)
    checkLengthArray('.popup_calc_button', 3, '.popup_calc_content')
    checkLengthArray('.popup_calc_profile_button', 5, '.popup_calc_profile_content')
})