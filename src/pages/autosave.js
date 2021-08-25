import React from 'react';
import { useFormikContext, Formik, Field, Form } from 'formik';
import debounce from 'just-debounce-it';

import { DatePicker } from "@fluentui/react";

import Debug from "components/form/debugformik";
import AutoSaveFormik from "components/form/autosaveform";

const AutoSave = ({ debounceMs }) => {
    const formik = useFormikContext();
    const [lastSaved, setLastSaved] = React.useState(null);
    const debouncedSubmit = React.useCallback(
        debounce(
            () =>
                formik.submitForm().then(() => setLastSaved(new Date().toISOString())),
            debounceMs
        ),
        [debounceMs, formik.submitForm]
    );

    React.useEffect(() => {
        debouncedSubmit();
    }, [debouncedSubmit, formik.values]);

    return (
        <>
            {!!formik.isSubmitting
                ? 'saving...'
                : lastSaved !== null
                    ? `Last Saved: ${lastSaved}`
                    : null}
        </>
    );
};

const AutoSavingForm = () => (
    <Formik
        initialValues={{
            firstName: '',
            lastName: '',
            email: '',
        }}
        onSubmit={(values, { setSubmitting }) => {
            return new Promise(resolve =>
                setTimeout(() => {
                    console.log('submitted', JSON.stringify(values, null, 2));
                    setSubmitting(false);
                    console.log("resolve: ", resolve)
                    resolve();
                }, 1000)
            );
        }}
        render={() => (
            <Form>
                <h1>
                    AutoSavingForm{' '}
                    <small style={{ color: 'gray', fontSize: 11 }}>
                        <AutoSave debounceMs={300} />
                    </small>
                </h1>

                <label htmlFor="firstName">First Name</label>
                <Field name="firstName" placeholder="Jane" />

                <label htmlFor="lastName">Last Name</label>
                <Field name="lastName" placeholder="Doe" />

                <label htmlFor="email">Email</label>
                <Field name="email" placeholder="jane@acme.com" type="email" />
                {/* <button type="submit">Submit</button> */}

                <Debug />
            </Form>
        )}
    />
);


export const AutoSavingForm2 = () => (
    <AutoSaveFormik
        initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            colors: '',
            date: Date.now()
        }}
        onSubmit={(values, { setSubmitting }) => {
            return new Promise(resolve =>
                setTimeout(() => {
                    console.log('submitted', JSON.stringify(values, null, 2));
                    setSubmitting(false);
                    console.log("resolve: ", resolve)
                    resolve();
                }, 1000)
            );
        }}>
        <>
            <label htmlFor="firstName">First Name</label>
            <Field name="firstName" placeholder="Jane" />

            <label htmlFor="lastName">Last Name</label>
            <Field name="lastName" placeholder="Doe" />

            <label htmlFor="email">Email</label>
            <Field name="email" placeholder="jane@acme.com" type="email" />

            <Field name="colors" as="select" className="my-select">
                <option value="red">Red</option>
                <option value="green">Green</option>
                <option value="blue">Blue</option>
            </Field>

            <Field
                name="date"
                render={fieldProps => (
                    <DatePicker
                    // value={Date.now()}
                    // onSelectDate={/* wrapper code for fieldProps.onChange */}
                    />
                )}
            />

            <Debug />
        </>
    </AutoSaveFormik>
);

export default AutoSavingForm;
