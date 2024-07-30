'use client';

import React, { useId } from 'react';
import { FieldArray, Form, Formik, getIn } from 'formik';
import * as Yup from 'yup';
import { Button, Divider, Card, CardBody } from '@nextui-org/react';
import TextAreaInput from '../elements/TextAreaInput';
import TextInput from '../elements/TextInput';

const validationSchema = Yup.object().shape({
  people: Yup.array().of(
    Yup.object().shape({
      firstName: Yup.string().required('First name is required'),
      lastName: Yup.string().required('Last name is required'),
    }),
  ),
});

const MyForm = () => (
  <div className="bg-warning">
    <Formik
      initialValues={{
        people: [
          {
            id: useId(),
            firstName: '',
            lastName: '',
          },
        ],
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log('onSubmit', JSON.stringify(values, null, 2));
      }}
    >
      {({ values, touched, errors, handleChange, handleBlur }) => (
        <Form noValidate autoComplete="off">
          <FieldArray name="people">
            {({ push, remove }) => (
              <div>
                {values.people.map((p, index) => {
                  const firstName = `people[${index}].firstName`;
                  const touchedFirstName = getIn(touched, firstName);
                  const errorFirstName = getIn(errors, firstName);

                  const lastName = `people[${index}].lastName`;
                  const touchedLastName = getIn(touched, lastName);
                  const errorLastName = getIn(errors, lastName);

                  return (
                    <div key={p.id}>
                      <Card
                        isBlurred
                        className="bg-secondary border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]"
                        shadow="sm"
                      >
                        <CardBody>
                          <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
                            <div className="relative col-span-6 md:col-span-4" />
                            <div className="flex flex-col col-span-6 md:col-span-8">
                              <div className="flex justify-between items-start">
                                <div className="flex flex-col gap-0">
                                  <TextInput
                                    margin="normal"
                                    variant="outlined"
                                    label="First name"
                                    name={firstName}
                                    value={p.firstName}
                                    required
                                    helperText={
                                      touchedFirstName && errorFirstName
                                        ? errorFirstName
                                        : ''
                                    }
                                    error={Boolean(
                                      touchedFirstName && errorFirstName,
                                    )}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  />

                                  <TextAreaInput
                                    margin="normal"
                                    variant="outlined"
                                    label="Last name"
                                    name={lastName}
                                    value={p.lastName}
                                    required
                                    helperText={
                                      touchedLastName && errorLastName
                                        ? errorLastName
                                        : ''
                                    }
                                    error={Boolean(
                                      touchedLastName && errorLastName,
                                    )}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  />

                                  <Button
                                    type="button"
                                    color="warning"
                                    variant="solid"
                                    onClick={() =>
                                      push({
                                        id: Math.random(),
                                        firstName: '',
                                        lastName: '',
                                      })
                                    }
                                  >
                                    Add New Item
                                  </Button>
                                </div>
                                <Button
                                  isIconOnly
                                  className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
                                  radius="full"
                                  variant="light"
                                  color="primary"
                                  size="sm"
                                  onPress={() => remove(index)}
                                >
                                  X
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardBody>
                      </Card>
                    </div>
                  );
                })}
              </div>
            )}
          </FieldArray>
          <Divider className="my-10" />
          <Button type="submit" color="primary" variant="contained">
            Submit
          </Button>
          <Divider style={{ marginTop: 20, marginBottom: 20 }} />
        </Form>
      )}
    </Formik>
  </div>
);

export default MyForm;
