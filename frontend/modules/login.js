import validator from "validator";

export default class Login {
    constructor(formClass){
        this.form = document.querySelector(formClass);
    }

    init(){
        this.events();
    }

    events(){
        if(!this.form) return;
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            this.validate(e);
        });
    }

    validate(e){
        const elemento = e.target;
        const emailInput = elemento.querySelector('input[name = email]');
        const passwordInput = elemento.querySelector('input[name = password]');
        const email = this.form.querySelector('.email');
        const password = this.form.querySelector('.password');

        let error = false;
        if(!validator.isEmail(emailInput.value)){
            //alert('E-mail inválido');
            this.validaFormulario(email, 'E-mail inválido.');
            error = true;
        }
        if(passwordInput.value.length < 3 || passwordInput.value.length > 50 ){
            //alert('A senha precisa conter entre 3-50 caracteres.');
            this.validaFormulario(password, 'A senha precisa conter entre 3-50 caracteres.');
            error = true;
        }

        if(!error) elemento.submit();
    }

    validaFormulario(campo, msg){
        const div = document.createElement('div');
        div.innerHTML = msg;
        div.classList.add('text-danger');
        campo.insertAdjacentElement('afterend', div);
        //elemento.appendChild(div);
    }
}