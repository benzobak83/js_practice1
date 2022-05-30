const tabs = (headerSelector, tabSelector, contentSelector, activeClass, display = 'block') => {

    const header = document.querySelector(headerSelector),
          tab = document.querySelectorAll(tabSelector),
          content = document.querySelectorAll(contentSelector);

    const hideTabContent = () => {
        content.forEach(itemContent => itemContent.style.display = 'none')
        tab.forEach(itemTab => itemTab.classList.remove(activeClass))
    }

    const showTabContent = (i = 0) => {
        
        content[i].style.display = display
        tab[i].classList.add(activeClass)
    }
    header.addEventListener('click', (e) => {
        const target = e.target
        
        if ((target) && ((e.target.classList.contains(tabSelector.replace(/\./, ''))) ||
        (e.target.parentNode.classList.contains(tabSelector.replace(/\./, ''))))) {
            tab.forEach((tabItem, i) => {
                if ((tabItem == target) || (tabItem == target.parentNode)) {
                    hideTabContent()
                    showTabContent(i)
                }
            })
        }
    })

    hideTabContent()
    showTabContent()
}



document.addEventListener('DOMContentLoaded', (e) => {
    tabs('.decoration_slider', '.no_click', '.decoration_content > div > div', 'after_click')
    tabs('.glazing_slider', '.glazing_block', '.glazing_content', 'active')
    tabs('.balcon_icons', '.balcon_icons_img', '.big_img > img', 'do_image_more', 'inline-block')
    })