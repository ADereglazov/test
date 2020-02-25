var submitButton = document.querySelector('.form__button');
var emailField = document.querySelector('.form__text-field--letter');

emailField.required = false;

submitButton.addEventListener('click', function (evt) {

	if (!emailField.value) {
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
