let submitButton = document.querySelector('.form__button');
let emailField = document.querySelector('.form__text-field--email');
let errorTextEmail = document.querySelector('.form__error-email');
let passwordField = document.querySelector('.form__text-field--password');
let errorTextPassword = document.querySelector('.form__error-password');
let confirmPasswordField = document.querySelector('.form__text-field--confirm-password');
let errorTextConfirmPassword = document.querySelector('.form__error-confirm-password');

emailField.onblur = function () {
	if (isValidEmail()) {
		errorTextEmail.classList.add('form__error-email-ok');
	}
};

emailField.addEventListener('input', function () {
	removeErrorState(emailField, errorTextEmail);
	errorTextEmail.classList.remove('form__error-email-ok');
});
//------------------------------------------------------------------
passwordField.onblur = function () {
	if (isValidPassword()) {
		errorTextPassword.classList.add('form__error-password-ok');
	}
};

passwordField.addEventListener('input', function () {
	removeErrorState(passwordField, errorTextPassword);
	errorTextPassword.classList.remove('form__error-password-ok');
});
//------------------------------------------------------------------
confirmPasswordField.onblur = function () {
	isValidConfirmPassword();
};

confirmPasswordField.addEventListener('input', function () {
	removeErrorState(confirmPasswordField, errorTextConfirmPassword);
	errorTextConfirmPassword.classList.remove('form__error-password-ok');
});
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
});
//------------------------------------------------------------------
function modSubmitButton() {
	submitButton.classList.remove('form__button--error');
	submitButton.offsetWidth = submitButton.offsetWidth;
	submitButton.classList.add('form__button--error');
}

function removeErrorState(inputField, errorTextElement) {
	inputField.classList.remove('form__text-field--error');
	errorTextElement.innerHTML = '';
}
//------------------------------------------------------------------
function isValidEmail() {
	let regularString = /^[\w-.]+@[\w-]+\.[a-z]{2,4}$/;
	let isValid = regularString.test(emailField.value);
	let errorMessage = '';

	emailField.classList.add('form__text-field--error');

	if (isValid) {
		emailField.classList.remove('form__text-field--error');
	} else {
		errorMessage = emailField.value ? 'Address is incorrect!' : 'Enter the address!';
	}

	errorTextEmail.innerHTML = errorMessage;
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

	errorTextPassword.innerHTML = errorMessage;
	return isValid;
}
//------------------------------------------------------------------
function isValidConfirmPassword() {
	let isValid = false;
	let errorMessage = '';

	if (passwordField.value === confirmPasswordField.value && confirmPasswordField.value) {
		confirmPasswordField.classList.remove('form__text-field--error');
		errorTextConfirmPassword.classList.add('form__error-password-ok');
		isValid = true;
	} else if (passwordField.value) {
		confirmPasswordField.classList.add('form__text-field--error');
		errorTextConfirmPassword.classList.remove('form__error-password-ok');
		errorMessage = 'Passwords don`t match!';
	}

	errorTextConfirmPassword.innerHTML = errorMessage;
	return isValid;
}
