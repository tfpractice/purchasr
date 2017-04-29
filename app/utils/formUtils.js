import { reduxForm, } from 'redux-form';

export const onSubmitSuccess = (res, dispatch, { reset, }) => reset();
export const ClearForm = form => reduxForm({ onSubmitSuccess, })(form);
