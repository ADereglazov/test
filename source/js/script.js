const submitButton = document.querySelector('.form__button');
const emailField = document.querySelector('.form__text-field--email');
const passwordField = document.querySelector('.form__text-field--password');
const confirmPasswordField = document.querySelector('.form__text-field--confirm-password');
const formMessage = document.querySelectorAll('.form__message');
const modalWindow = document.querySelector('.modal');

//------------------------------------------------------------------
submitButton.addEventListener('click', function (evt) {
	evt.preventDefault();
	submitButton.classList.remove('form__animation');

	if (!isValidEmail()) {
		modSubmitButton();
		emailField.focus();
		return;
	}

	if (!isValidPassword()) {
		modSubmitButton();
		passwordField.focus();
		return;
	}

	if (!isValidConfirmPassword()) {
		modSubmitButton();
		confirmPasswordField.focus();
		return;
	}

	submitButton.classList.remove('form__button--error');
	modalWindow.classList.remove('modal--hide');
});
//------------------------------------------------------------------
emailField.addEventListener('focusout', function () {
	if (isValidEmail()) {
		formMessage[0].classList.add('form__message-ok');
	}
});

emailField.addEventListener('input', function () {
	removeErrorState(emailField, formMessage[0]);
	formMessage[0].classList.remove('form__message-ok');
});
//------------------------------------------------------------------
passwordField.addEventListener('focusout', function () {
	if (isValidPassword()) {
		formMessage[1].classList.add('form__message-ok');
	}
});

passwordField.addEventListener('input', function () {
	removeErrorState(passwordField, formMessage[1]);
	formMessage[1].classList.remove('form__message-ok');
});
//------------------------------------------------------------------
confirmPasswordField.addEventListener('focusout', function () {
	isValidConfirmPassword();
});

confirmPasswordField.addEventListener('input', function () {
	removeErrorState(confirmPasswordField, formMessage[2]);
	formMessage[2].classList.remove('form__message-ok');
});
//------------------------------------------------------------------
function modSubmitButton() {
	submitButton.classList.remove('form__button--error');
	submitButton.offsetWidth = submitButton.offsetWidth;
	submitButton.classList.add('form__button--error');
}

function removeErrorState(inputField, errorTextElement) {
	inputField.classList.remove('form__text-field--error');
	errorTextElement.innerText = '';
}
//------------------------------------------------------------------
function isValidEmail() {
	let regularString = /([A-z0-9_.-]+)@([A-z0-9_.-]+).([A-z]{2,8})/;
	let isValid = regularString.test(emailField.value);
	let errorMessage = '';

	emailField.classList.add('form__text-field--error');

	if (isValid) {
		emailField.classList.remove('form__text-field--error');
	} else {
		errorMessage = emailField.value ? 'Address is incorrect!' : 'Enter the address!';
	}

	formMessage[0].innerText = errorMessage;
	return isValid;
}
//------------------------------------------------------------------
function isValidPassword() {
	let regularString = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
	let isValid = regularString.test(passwordField.value);
	let errorMessage = '';

	passwordField.classList.add('form__text-field--error');

	if (isValid) {
		passwordField.classList.remove('form__text-field--error');
	} else {
		errorMessage = 'The password was entered incorrectly! It must contain ' +
			             'at least 8 characters, uppercase and lowercase letters, and numbers.';
	}

	formMessage[1].innerText = errorMessage;
	return isValid;
}
//------------------------------------------------------------------
function isValidConfirmPassword() {
	let isValid = false;
	let errorMessage = '';

	if (passwordField.value === confirmPasswordField.value && confirmPasswordField.value) {
		confirmPasswordField.classList.remove('form__text-field--error');
		formMessage[2].classList.add('form__message-ok');
		isValid = true;
	} else if (passwordField.value) {
		confirmPasswordField.classList.add('form__text-field--error');
		formMessage[2].classList.remove('form__message-ok');
		errorMessage = 'Passwords don`t match!';
	}

	formMessage[2].innerText = errorMessage;
	return isValid;
}
//------------------------------------------------------------------
modalWindow.addEventListener('click', function () {
	modalWindow.classList.add('modal--hide');
});

window.addEventListener('keydown', function (evt) {
	if (evt.keyCode === 27) {
		if (!modalWindow.classList.contains('modal--hide')) {
			evt.preventDefault();
			modalWindow.classList.add('modal--hide');
		}
	}
});
