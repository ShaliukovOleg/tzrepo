// Просто тестовый объект, в которые будут передаваться данные.
// ИД, текст (который нам требуется), координаты (для точного расположения на странице).
const buttonData = [
    {
        id: 1,
        text: 'Мастерская',
        top: '282px',
        left: '580px',
        bgColor: 'blue'
    },
    {
        id: 2,
        text: 'Причал',
        top: '714px',
        left: '446px',
        bgColor: 'blue'
    },
    {
        id: 3,
        text: 'Стадион',
        top: '482px',
        left: '687px',
        bgColor: 'green'
    },
    {
        id: 4,
        text: 'Лаборатория',
        top: '629px',
        left: '1081px',
        bgColor: 'blue'
    },
    {
        id: 5,
        text: 'Вокзал',
        top: '404px',
        left: '1148px',
        bgColor: 'green'
    },
    {
        id: 6,
        text: 'Премиум',
        top: '790px',
        left: '1107px',
        bgColor: 'green'
    },
    {
        id: 7,
        text: 'Серверная',
        top: '669px',
        left: '1306px',
        bgColor: 'green'
    },
    {
        id: 8,
        text: 'Многоэтажка',
        top: '225px',
        left: '1373px',
        bgColor: 'blue'
    },
    {
        id: 9,
        text: 'Кафе',
        top: '475px',
        left: '1414px',
        bgColor: 'green'
    },
    {
        id: 10,
        text: 'Гостиница',
        top: '713px',
        left: '1593px',
        bgColor: 'blue'

    }
];

// Переменные 
const container = document.querySelector('.container');
const buttons = [];

// Функция для создания кнопок
function createButton(data) {
    const button = document.createElement('button');
    button.classList.add('cta', data.bgColor);
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('data-button-id', data.id);
    button.style.cssText = `position: absolute; top: ${data.top}; left: ${data.left};`;

    button.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg">
            <path d="M20 15V25M15 20H25" stroke="currentColor" stroke-width="2"></path>
        </svg>
        <span class="button-text">${data.text}</span>
    `;

    container.appendChild(button);
    buttons.push(button);
}

// Функция для обработки клика по кнопке
function handleButtonClick(button) {
    const path = button.querySelector('path');
    const isExpanded = button.getAttribute('aria-expanded') === 'true';

    buttons.forEach(otherButton => {
        if (otherButton !== button && otherButton.getAttribute('aria-expanded') === 'true') {
            handleButtonClick(otherButton);
        }
    });

    if (isExpanded) {
        button.setAttribute('aria-expanded', 'false');
        path.setAttribute('d', 'M20 15V25M15 20H25');
        button.blur();
    } else {
        button.setAttribute('aria-expanded', 'true');
        path.setAttribute('d', 'M20 15V15M15 20H25');
    }
}

// Функция клика вне области кнопки или по другой кнопке
function handleOutsideClick(event) {
    if (!event.target.closest('.cta')) {
        buttons.forEach(button => {
            if (button.getAttribute('aria-expanded') === 'true') {
                handleButtonClick(button);
            }
        });
    }
}

buttonData.forEach(createButton);

// Единственный слушатель для отслеживания состояния кнопок
document.addEventListener('click', event => {
    const targetButton = event.target.closest('.cta');
    
    buttons.forEach(button => {
        if (targetButton === button || !targetButton) {
            handleButtonClick(button);
        }
    });

    handleOutsideClick(event);
});

