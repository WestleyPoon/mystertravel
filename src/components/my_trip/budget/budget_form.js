import React from 'react';
import {reduxForm, Field} from 'redux-form';
import Input from '../../general/input';
import NumberInput from '../../general/numberinput';

const BudgetForm = props => {
    const { budget, handleSubmit, style} = props;

    return (
        <form onSubmit={handleSubmit(budget)} className="budget-input-form" style={style}>
            <Field id="description" name="description" label="Description" component={Input} classes="budget-input"/>
            <Field id="price" name="price" label="$ Amount" component={NumberInput} classes="budget-input" type="number" min="0"/>
            <Field id="category" name="category" label="Category" component={Input} classes="budget-input"/>
            <button className="btn add-budget">Add <i className="fas fa-check"></i></button>
        </form>
    );
}

function validate({description, price, category}) {
    const errors = {};

    if(!description) {
        errors.description = 'Please enter a description';
    }
    if(!price) {
        errors.price = 'Please enter a number';
    }
    if(!category) {
        errors.category = 'Please enter a category';
    }

    return errors;
}

export default reduxForm({
    form: 'budget-form',
    validate
})(BudgetForm);
