import { reduxForm, } from 'redux-form';

export const onSubmitSuccess = (res, dispatch, { reset, }) => reset();
export const ClearForm = (form) => {
  console.log('form', form);
  console.log('  reduxForm({ onSubmitSuccess, })(form)', reduxForm({ onSubmitSuccess, })(form));
  return reduxForm({ onSubmitSuccess, })(form);
};
