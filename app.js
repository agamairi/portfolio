const sections = document.querySelectorAll('.section');
const sectButtons = document.querySelectorAll('.controls');
const Button = document.querySelectorAll('.control');
const allSections = document.querySelector('.main-content');

function TransitionPage() {
    // Activates the button active class
    for (let i = 0; i < Button.length; i++) {
        Button[i].addEventListener('click', function () {
            let selectedButton = document.querySelectorAll('.activebtn');
            selectedButton[0].className = selectedButton[0].className.replace('activebtn', '');
            this.className += ' activebtn';
        })
    }
    // Putting the section on top of each other. Kind of like stacking
    allSections.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        if (id) {
            // removes the current page
            sectButtons.forEach((btn) => {
                btn.classList.remove('active')

            })
            e.target.classList.add('active')
            sections.forEach((section) => {
                section.classList.remove('active')
            })

            const element = document.getElementById(id);
            element.classList.add('active');
        }
    })

}
TransitionPage();
