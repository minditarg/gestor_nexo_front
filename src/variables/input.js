export const inputChangedHandler = function (event, inputIdentifier, orderForm) {
    let checkValid;
    const updatedOrderForm = {
        ...orderForm
    };
    const updatedFormElement = {
        ...updatedOrderForm[inputIdentifier]
    };
    updatedFormElement.value = event.target.value;
    checkValid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.valid = checkValid.isValid;
    updatedFormElement.textValid = checkValid.textValid;
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    let formIsValidAlt = true;
    for (let inputIdentifier in updatedOrderForm) {
        formIsValidAlt = updatedOrderForm[inputIdentifier].valid && formIsValidAlt;
    }

    return { orderForm: updatedOrderForm, formIsValid: formIsValidAlt }


}


export const inputAllChangedHandler = function (orderForm) {
    let checkValid;
    const updatedOrderForm = {
        ...orderForm
    };

    for (let key in updatedOrderForm) {
        const updatedFormElement = {
            ...updatedOrderForm[key]
        };

        checkValid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.valid = checkValid.isValid;
        updatedFormElement.textValid = checkValid.textValid;
        updatedFormElement.touched = true;
        updatedOrderForm[key] = updatedFormElement;
    }


    let formIsValidAlt = true;
    for (let inputIdentifier in updatedOrderForm) {
        formIsValidAlt = updatedOrderForm[inputIdentifier].valid && formIsValidAlt;
    }
    console.log(updatedOrderForm);

    return { orderForm: updatedOrderForm, formIsValid: formIsValidAlt }


}


export const checkValidity = function (value, rules) {
    let isValid = true;
    let textValid = null;

    if (rules.required && isValid) {
        isValid = value.toString().trim() !== '';
        textValid = 'El campo es requerido'
    }

    if (rules.minLength && isValid) {
        isValid = value.length >= rules.minLength;
        textValid = 'La cantidad de caracteres minimos es ' + rules.minLength
    }

    if (rules.maxLength && isValid) {
        isValid = value.length <= rules.maxLength;
        textValid = 'Supera el maximo de caracteres';
    }

    return { isValid: isValid, textValid: textValid };
}


export const resetForm = function (orderForm) {
    let orderFormAlt = { ...orderForm };
    let successSubmit = this.state.successSubmit;
    for (let key in orderFormAlt) {
        orderFormAlt[key].value = ''
    }

    return orderForm


}