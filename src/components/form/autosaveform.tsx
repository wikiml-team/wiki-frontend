import React, { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { useFormikContext, Formik, Field, Form, FormikValues } from 'formik';
import { ObjectSchema } from "yup";
import debounce from 'just-debounce-it';

import Debug from "./debugformik";

type AutoSaveProps = {
    debounceMs?: number
}

const AutoSave = ({ debounceMs = 3000 }: AutoSaveProps) => {
    const formik = useFormikContext();
    const [lastSaved, setLastSaved] = useState("");
    const debouncedSubmit = useCallback(
        debounce(
            () =>
                formik.submitForm().then(() => setLastSaved(new Date().toISOString())),
            debounceMs
        ),
        [debounceMs, formik.submitForm]
    );

    useEffect(() => {
        debouncedSubmit();
    }, [debouncedSubmit, formik.values]);

    return (
        <>
            {!!formik.isSubmitting
                ? 'saving...'
                : lastSaved !== ""
                    ? `Last Saved: ${lastSaved}`
                    : null}
        </>
    );
};

type setSubmittingFunctionType = {
    setSubmitting: (isSubmitting: boolean) => void
}

type AutoSaveFormikProps = {
    initialValues: FormikValues
    onSubmit: (values: FormikValues, { setSubmitting }: setSubmittingFunctionType) => any
    validationSchema?: ObjectSchema<any>;
}

const AutoSaveFormik: FunctionComponent<AutoSaveFormikProps> = (props) => {

    const { initialValues, onSubmit, validationSchema, children } = props;

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            <Form>
                {/* <h1>
                    AutoSavingForm{' '}
                    <small style={{ color: 'gray', fontSize: 11 }}>
                        <AutoSave debounceMs={1000} />
                    </small>
                </h1> */}
                {children}

                {/* <Debug /> */}
            </Form>
        </Formik>
    )
}

export default AutoSaveFormik
