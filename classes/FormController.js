import { createForm, createInputField } from "../gomszab.js"
import { ViewElement } from "./ViewElement.js"

class FormController extends ViewElement{
    #formInputList
    #manager
    #form

    constructor(id, manager, formFieldList){
        super(id)
        this.#manager = manager
        this.#formInputList = []

        const notification = this.div.appendChild(document.createElement("div"))

        const {form, button} = createForm((form) => {
            for (const i of formFieldList){
                this.#formInputList.push(new FormInput(i.id, i.name, i.label, form))
            }
        }, (e) => {
            e.preventDefault()

            const questionType = this.#createElement()
            this.#manager.addElement(questionType)
        })

        this.#form = form
        this.div.appendChild(form)

        this.#manager.addStatusCallback = (message) => {
            notification.innerText = message
            setTimeout(() => {notification.innerHTML = ""}, 1000)
        }
    }

    /**
     * 
     * @returns {QuestionType}
     */
    #createElement(){
        let result = {}
        let validation = true

        for (const field of this.#formInputList){
            if (field.validate())
                result[field.name] = field.value
            else
                validation = false
        }

        if (validation)
            return result
        else
            return {}
    }
}

class FormInput{
    /**
     * @type {HTMLDivElement}
     */
    #errorDiv
    /**
     * @type {HTMLInputElement}
     */
    #input
    /**
     * @type {string}
     */
    #name

    get name(){
        return this.#name
    }

    get value(){
        return this.#input.value
    }

    constructor(id, name, labelContent, parent) {
        const {input, errorElement: errorDiv} = createInputField({id, name, labelContent, parent})

        this.#input = input
        this.#errorDiv = errorDiv
        this.#name = name
    }

    /**
     * 
     * @returns {boolean}
     */
    validate(){
        let result = true

        if (!this.value){
            result = false
            this.#errorDiv.innerText = "Hibás adat"
        } else {
            this.#errorDiv.innerText = ""
        }

        return result
    }
}

export {FormController}