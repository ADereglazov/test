let submitButton = document.querySelector('.form__button');
let emailField = document.querySelector('.form__text-field--email');
let passwordField = document.querySelector('.form__text-field--password');
let errorTextEmail = document.querySelector('.form__error-email');
let errorTextPassword = document.querySelector('.form__error-password');

emailField.onblur = function () {
	isValidEmail(emailField, errorTextEmail)
};

emailField.addEventListener('input', function () {
	emailField.classList.remove('form__text-field--error');
	errorTextEmail.innerHTML = '';
});

passwordField.onblur = function () {
	isValidPassword(passwordField, errorTextPassword)
};

passwordField.addEventListener('input', function () {
	passwordField.classList.remove('form__text-field--error');
	errorTextPassword.innerHTML = '';
});

submitButton.addEventListener('click', function (evt) {

	submitButton.classList.remove('form__animation');

	if (!isValidEmail(emailField, errorTextEmail)) {
		modSubmitButton(evt);
		emailField.focus();

	} else if (!isValidPassword(passwordField, errorTextPassword)) {
		modSubmitButton(evt);
		passwordField.focus();

	}
	else {
		submitButton.classList.remove('form__button--error');
	}
});

function modSubmitButton(evt) {
	evt.preventDefault();
	submitButton.classList.remove('form__button--error');
	submitButton.offsetWidth = submitButton.offsetWidth;
	submitButton.classList.add('form__button--error');
}

function isValidEmail(email, errorTextEmail) {
	let regularString = /^[\w-.]+@[\w-]+\.[a-z]{2,4}$/i;
	let isValid = regularString.test(email.value);
	let errorMessage = '';

	emailField.classList.add('form__text-field--error');

	if (isValid) {
		emailField.classList.remove('form__text-field--error');
	} else {
		errorMessage = email.value ? 'Адрес введен неправильно!' : 'Введите адрес';
	}

	errorTextEmail.innerHTML = errorMessage;

	return isValid;
}

function isValidPassword(password, errorTextPassword) {
	let regularString = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
	let isValid = regularString.test(password.value);
	let errorMessage = '';

	passwordField.classList.add('form__text-field--error');

	if (isValid) {
		passwordField.classList.remove('form__text-field--error');
	} else {
		errorMessage = isValid ? '' : 'Пароль введен неверно! Он должен содержать от 8 символов, ' +
			'заглавные и строчные буквы, а также цифры.';
	}

	errorTextPassword.innerHTML = errorMessage;

	return isValid;
}
