import * as Yup from 'yup';

export const categoryOptions = [
  { text: 'Drinks', value: 'drinks' },
  { text: 'Food', value: 'food' },
  { text: 'Film', value: 'film' },
  { text: 'Culture', value: 'culture' },
  { text: 'Music', value: 'music' },
  { text: 'Travel', value: 'travel' },
];

export const initialEventFormState = {
  id: crypto.randomUUID(),
  title: '',
  description: '',
  category: '',
  date: null,
  city: '',
  venue: '',
};

export const formStyles = {
  minWidth: '600px',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};

export const formValidationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  category: Yup.string().required('Category is required'),
  date: Yup.string().required('Date is required'),
  city: Yup.string().required('City is required'),
  venue: Yup.string().required('Venue is required'),
});
