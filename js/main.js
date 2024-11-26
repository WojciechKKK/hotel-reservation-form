import { VALIDATIONS, HOTELS, VALIDATION_ERROR } from '../config/data'

addEventListener("DOMContentLoaded", (events) => {

  // get form elements
  const form = document.getElementById("reservation-form");
  const city = document.getElementById("city");
  const checkInDate = document.getElementById("check-in-date");
  const checkOutDate = document.getElementById("check-out-date");
  const visitors = document.getElementById("visitors");
  const hotel = document.getElementById("hotel");
  const phoneNumber = document.getElementById("phone");
  const comment = document.getElementById("comment");

  // listerens events
  form.addEventListener("submit", onFormSubmit);
  city.addEventListener("change", onChangeCity);
  checkInDate.addEventListener("change", setCalendarValidationForCheckOut);
  
  // set available days in calendar for check-in date
  setCalendarValidationForCheckIn();


  function onFormSubmit(e) {
    e.preventDefault();

    const formData = getFormValues(e);

    if (validateForm(formData)) {
      submitForm(formData);
    }
  }

  function validateForm(formData) {
    const validators = {
      required: () => validateRequiredFields(formData),
      dates: () => validateDates(checkInDate, checkOutDate),
      visitors: () => validateVisitors(visitors),
      email: () => validateEmail(email),
      phone: () => validatePhoneNumber(phoneNumber),
      comment: () => validateComment(comment)
    };

    return Object.values(validators).every(validator => validator());
  }

  function submitForm(formData) {
  // TODO: Add API call here
    alert(`Send request: ${JSON.stringify(formData)}`);
    console.log(formData)
  }

  function getFormValues(e) {
    const formData = new FormData(e.target);
    return Object.fromEntries(formData.entries());
    // access to single value formData.get("city");
  }

  function onChangeCity(e) {
    const hotelsList = HOTELS[e.target.value];
    const defaultOption = '<option hidden selected value>Wybierz hotel</option>';
  
    if (!hotelsList) {
      // TODO clear & set disabled=true on Hotel field
      throw new Error("Not provided hotels for choosen city")
    };
  
    hotel.removeAttribute("disabled");
  
    hotel.innerHTML = defaultOption + hotelsList
      .map(hotel => `<option value=${hotel}>${hotel}</option>`).join("");

    errorHandler(e.target);
  }

  function errorHandler(field, errorMessage = '') {
    const formControl = field.parentElement;
    const errorElement = formControl.querySelector('small.form__error');
  

    formControl.classList.toggle('error', Boolean(errorMessage));
    errorElement.innerText = errorMessage;
  }

  //validation methods
  function setCalendarValidationForCheckIn() {
    const [today] = new Date().toISOString().split('T');
    checkInDate.min = today;
  }
  
  function setCalendarValidationForCheckOut(e) {
    const minDate = new Date(e.target.value);
    minDate.setDate(minDate.getDate() + VALIDATIONS['check-out-date'].minimumDays);
    const [minDateFormatted] = minDate.toISOString().split('T');
    
    checkOutDate.min = minDateFormatted;
  }

  const validateRequiredFields = () => {
    let allFieldsAreValid = true;

    Object.keys(VALIDATIONS).forEach(name => {
      const field = document.getElementById(name);

      if (!field) { 
        throw new Error(`Field ${name} is not available in form`)
      };

      if (VALIDATIONS[name].required && field && !field.value) {
        allFieldsAreValid = false;
        errorHandler(field, VALIDATION_ERROR);
      } else {
        errorHandler(field);
      }
    });

    return allFieldsAreValid;
  }

  function validateDates(checkInDate, checkOutDate) {
    if (new Date(checkInDate.value) < new Date()) {
      errorHandler(checkInDate, VALIDATIONS['check-in-date'].errorText);
      return false;
    }

    if (new Date(checkInDate.value) > new Date(checkOutDate.value)){
      errorHandler(checkOutDate, VALIDATIONS['check-out-date'].errorText);
      return false;
    };

    return true;
  }


  function validateVisitors(visitors) {
    const { min, max, errorTextForMin, errorTextForMax } = VALIDATIONS.visitors;

    if (!visitors.value) {
      return false;
    };

    if (Number(visitors.value) > max) {
      errorHandler(visitors, errorTextForMax);
      return false;
    };

    if (Number(visitors.value) < min) {
      errorHandler(visitors, errorTextForMin);
      return false;
    } 

    return true;
  }

  function validateEmail(email) {
    if (!email.value) {
      return false;
    };
    
    const isValidEmail = /^\S+@\S+$/g;
  
    if (!isValidEmail.test(email.value)) {
      errorHandler(email, VALIDATIONS.email.errorText);
      return false;
    };

    return true;
  }

  function validatePhoneNumber(phone) {
    if (phone.value) {
      const phoneNum = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})$/;
      if(!phone.value.match(phoneNum)) {
        errorHandler(phone, VALIDATIONS.phone.errorText);
        return false
      }
    };
    return true;
  }

  function validateComment(comment) {
    if (comment.value) {
      if (comment.value.length > VALIDATIONS.comment.max) {
        errorHandler(comment, VALIDATIONS.comment.errorText);
        return false
      }
    };
    return true;
  } 
});