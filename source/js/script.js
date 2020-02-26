let submitButton = document.querySelector('.form__button');
let emailField = document.querySelector('.form__text-field--email');
let errorText = document.querySelector('.form__error-text');

emailField.onblur = function () {
	validEmail(emailField, errorText)
};

emailField.addEventListener('input', function () {
	emailField.classList.remove('form__text-field--error');
	errorText.innerHTML = '';
});

submitButton.addEventListener('click', function (evt) {

	if (!validEmail(emailField, errorText)) {
		evt.preventDefault();

		submitButton.classList.remove('form__animation');
		submitButton.classList.remove('form__button--error');
		submitButton.offsetWidth = submitButton.offsetWidth;
		submitButton.classList.add('form__button--error');
		emailField.focus();
	} else {
		submitButton.classList.remove('form__button--error');
	}
});

function validEmail(email, errorText) {
	let regularString = /^[\w-.]+@[\w-]+\.[a-z]{2,4}$/i;
	let isValid = regularString.test(email.value);
	let errorMessage = '';

	emailField.classList.add('form__text-field--error');

	if (!email.value) {
		errorMessage = 'Введите адрес';
	} else if (!isValid) {
		errorMessage = 'Адрес введен неправильно!';
	} else {
		emailField.classList.remove('form__text-field--error');
	}

	errorText.innerHTML = errorMessage;

	return errorMessage === '';
}
