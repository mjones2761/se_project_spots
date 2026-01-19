const showInputError = (formEl, inputEl, errorMsg) => {
const errorMsgID = inputEl.id + "-error";
const  errorMsgEl = formEl.querySelector("#" + errorMsgID);
errorMsgEl.textContent = errorMsg;
inputEl.classList.add("modal__input_type_error");
};

const hideInputError = (formEl, inputEl) => {
const errorMsgID = inputEl.id + "-error";
const  errorMsgEl = formEl.querySelector("#" + errorMsgID);
errorMsgEl.textContent = "";
inputEl.classList.remove("modal__input_type_error");
};

const checkInputValidity = (formEl, inputEl) => {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, inputEl.validationMessage);
  }
  else {
    hideInputError(formEl, inputEl);
  }
};


const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonEl) => {
if (hasInvalidInput(inputList)) {
  disableButton(buttonEl);
  buttonEl.classList.add("modal__submit-btn_disabled");
}
else {
  buttonEl.disabled = false;
  buttonEl.classList.remove("modal__submit-btn_disabled");
}
};

const disableButton = (buttonEl) => {
  buttonEl.disabled = true;
  buttonEl.classList.add("modal__submit-btn_disabled");
};



const setEventListeners = (formEl) => {
  const inputList = Array.from(formEl.querySelectorAll(".modal__input"));
  const buttonElement = formEl.querySelector(".modal__submit-btn");


  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formEl, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = (settings) => {
  const formList = document.querySelectorAll(settings.formSelector);
  formList.forEach((formEl) => {
    setEventListeners(formEl, settings);
  });
};
const validationSettings = {
  formSelector: '.modal__form',
  inputSelector: '.modal__input',
  submitButtonSelector: '.modal__submit-btn',
  inputErrorClass: 'modal__input_type_error',
  inactiveButtonClass: 'modal__submit-btn_disabled'
};
enableValidation(validationSettings);

