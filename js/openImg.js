const openImg = () => {
    const img_section = document.querySelector('section.works'),
          img_big = document.createElement('img'),
          popup1 = document.createElement('div');
          popup1.classList.add('popup1', 'new')
          popup1.style.display = 'none'
          popup1.style.justifyContent = 'center'
          popup1.style.alignItems = 'center'
          img_big.style.maxWidth = '100%'
          img_big.style.maxHeight = '100%'
          popup1.style.maxWidth = '100%'
          popup1.style.maxHeight = '100%'


   img_section.addEventListener('click', (e) => {
    e.preventDefault()
    img_section.appendChild(popup1)
    popup1.appendChild(img_big)
      
       if (e.target && e.target.classList.contains('preview')) {
        
        popup1.style.display = 'flex'
        path = e.target.parentNode.getAttribute('href')
        console.log(path)
        img_big.setAttribute('src', path)
        document.querySelector('body').style.overflow = 'hidden'
       }
        if (e.target && e.target.classList.contains('popup1')) {
        popup1.style.display = 'none'
        document.querySelector('body').style.overflow = 'scroll'
       }
   }) 
}

document.addEventListener('DOMContentLoaded', () => {
        openImg()
})