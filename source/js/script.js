const form = document.forms.namedItem('new-user-form');
const submitButton = form.querySelector('.form__button');
const emailField = form.querySelector('.form__text-field--email');
const passwordField = form.querySelector('.form__text-field--password');
const confirmPasswordField = form.querySelector('.form__text-field--confirm-password');
const formMessage = form.querySelectorAll('.form__message');
const modalWindow = document.querySelector('.modal');

//------------------------------------------------------------------
submitButton.addEventListener('click', function (evt) {
	evt.preventDefault();

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
	sendForm();
});
//------------------------------------------------------------------
emailField.addEventListener('focusout', function () {
	formMessage[0].classList.toggle('form__message-ok', isValidEmail());
});

emailField.addEventListener('input', function () {
	removeErrorState(emailField, formMessage[0]);
});
//------------------------------------------------------------------
passwordField.addEventListener('focusout', function () {
	formMessage[1].classList.toggle('form__message-ok', isValidPassword());
});

passwordField.addEventListener('input', function () {
	removeErrorState(passwordField, formMessage[1]);
});
//------------------------------------------------------------------
confirmPasswordField.addEventListener('focusout', function () {
	isValidConfirmPassword();
});

confirmPasswordField.addEventListener('input', function () {
	removeErrorState(confirmPasswordField, formMessage[2]);
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
	errorTextElement.classList.remove('form__message-ok');
}
//------------------------------------------------------------------
function isValidEmail() {
	let regularString = /([A-z0-9_.-]+)@([A-z0-9_.-]+).([A-z]{2,8})/;
	let isValid = regularString.test(emailField.value);
	let errorMessage = '';

	emailField.classList.toggle('form__text-field--error', !isValid);

	if (!isValid) {
		errorMessage = emailField.value ? 'Address is incorrect!' : 'Enter the address!';
	}

	formMessage[0].innerText = errorMessage;
	return isValid;
}
//------------------------------------------------------------------
function isValidPassword() {
	let regularString = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
	let isValid = regularString.test(passwordField.value);
	let errorMessage;

	passwordField.classList.toggle('form__text-field--error', !isValid);

	errorMessage = isValid ? '' : 'The password was entered incorrectly! It must contain ' +
			                          'at least 8 characters, uppercase and lowercase letters, and numbers.';

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
//------------------------------------------------------------------
function sendForm() {
	const formData = new FormData(form);
	const oReq = new XMLHttpRequest();

	oReq.open('GET', 'server-ok.json', true);
	oReq.send(formData);

	oReq.onload = function() {
		if (oReq.status === 200) {
			modalWindow.classList.remove('modal--hide');
			form.reset();
			for (let i = 0; i < formMessage.length; i++) {
				formMessage[i].classList.remove('form__message-ok');
			}
		} else {
			alert('Error ' + oReq.status + ' occurred when trying to upload your data.');
		}
	};
}
