import { useContext, useEffect, useState } from "react";
import { RotatingPage, Section } from "../../components/rotating-page";
import OctopusNavigation from "../../components/octopus-navigation";
import { Button, Radio, InfoIcon } from "../../components/form";
import { useTheme, useForm } from "../../hooks";
import { GenericResponse, SubmitFunction } from "../../hooks/useForm";
import { initialFormState, validationSchema, formFields } from "./form-fields";
import { HelpersContext, HelpersProvider } from "./helpers";

import "./quote.scss";

const QuoteForm = () => {
  const [rotation, setRotation] = useState(0);

  const onSubmit: SubmitFunction<GenericResponse> = async (
    formJSON: string
  ): Promise<GenericResponse> => {
    const options: RequestInit = {
      method: "POST",
      body: formJSON,
    };
    const response = await fetch(`/.netlify/functions/quoteform`, options);
    if (response.status !== 200) {
      throw new Error(
        "There was a problem submitting your form, please try again later"
      );
    }
    const json = (await response.json()) as GenericResponse;
    return json;
  };

  const {
    formValues,
    setFormValue,
    handleFormInput,
    handleFormSubmit,
    isFormError,
    formErrorMessage,
    isFormSuccess,
    validation,
    validateForm,
  } = useForm<GenericResponse, typeof initialFormState>(
    initialFormState,
    onSubmit,
    validationSchema
  );

  useEffect(() => {
    if (isFormError) {
      alert(formErrorMessage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFormError]);

  const handleAddUserDetails = async (
    event: React.FormEvent
  ): Promise<void> => {
    event.preventDefault();
    const result = await validateForm();
    if (result.fields?.name?.isValid && result.fields?.email?.isValid) {
      setFormValue("optIn", true);
    }
  };

  const { theme } = useTheme();

  const { openHelper } = useContext(HelpersContext);

  return (
    <>
      <OctopusNavigation pageTitle="Quote" />
      {isFormSuccess ? (
        <div className={`theme--${theme} quote-form__personal-details`}>
          <div className="personal-details__inner personal-details__inner--thanks">
            <p>Thank you! Your framing request has been submitted</p>
            <p>
              We will be in contact shortly with a rough quotation and any
              guidance that has been requested
            </p>
            <p>
              Please note that without seeing the artwork in person all
              quotations are a rough indication only
            </p>
          </div>
        </div>
      ) : (
        <form className={`theme--${theme} quote-form`}>
          {!formValues.optIn && (
            <div className="quote-form__personal-details">
              <div className="personal-details__inner">
                <label>
                  <span>Name</span>
                  <input
                    type="text"
                    name="name"
                    value={formValues.name}
                    onChange={handleFormInput}
                  />
                  <span className="validation">
                    {validation?.fields?.name?.message && (
                      <span>{validation.fields.name.message}</span>
                    )}
                  </span>
                </label>
                <label>
                  <span>Email</span>
                  <input
                    type="text"
                    name="email"
                    value={formValues.email}
                    onChange={handleFormInput}
                  />
                  <span className="validation">
                    {validation?.fields?.email?.message && (
                      <span>{validation.fields.email.message}</span>
                    )}
                  </span>
                </label>
                <Button onClick={handleAddUserDetails}>begin quote</Button>
              </div>
            </div>
          )}
          {formValues.optIn && (
            <RotatingPage isScrollDisabled={true} overrideRotation={rotation}>
              <Section title="1. Artwork">
                <div>
                  <fieldset>
                    <legend className="screen-reader">Type of artwork?</legend>
                    {formFields.artworkType.map((option) => (
                      <div key={`artworkType-${option.type}`}>
                        <Radio
                          name="artworkType"
                          value={option.type}
                          checked={formValues.artworkType === option.type}
                          onChange={handleFormInput}
                        >
                          {option.display}
                        </Radio>
                      </div>
                    ))}
                  </fieldset>
                </div>
                <div>
                  <label>
                    Height (cm)
                    <input
                      type="number"
                      name="artworkHeight"
                      value={formValues.artworkHeight}
                      onChange={handleFormInput}
                    />
                  </label>
                  <label>
                    Width (cm)
                    <input
                      type="number"
                      name="artworkWidth"
                      value={formValues.artworkWidth}
                      onChange={handleFormInput}
                    />
                  </label>
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      setRotation(90);
                    }}
                  >
                    Next
                  </Button>
                </div>
              </Section>
              <Section title="2. Mount">
                <fieldset>
                  <legend className="screen-reader">
                    What style of mount?
                  </legend>
                  {formFields.mountType.map((option) => (
                    <div key={`mountType-${option.type}`}>
                      <Radio
                        name="mountType"
                        value={option.type}
                        checked={formValues.mountType === option.type}
                        onChange={handleFormInput}
                      >
                        {option.display}
                      </Radio>
                    </div>
                  ))}
                  <InfoIcon onClick={() => openHelper("mount")}>
                    More info
                  </InfoIcon>
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      setRotation(180);
                    }}
                  >
                    Next
                  </Button>
                </fieldset>
              </Section>
              <Section title="3. Glass">
                <fieldset>
                  <legend className="screen-reader">What kind of glass?</legend>
                  {formFields.glassType.map((option) => (
                    <div key={`glassType-${option.type}`}>
                      <Radio
                        name="glassType"
                        value={option.type}
                        checked={formValues.glassType === option.type}
                        onChange={handleFormInput}
                      >
                        {option.display}
                      </Radio>
                    </div>
                  ))}
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      setRotation(270);
                    }}
                  >
                    Next
                  </Button>
                </fieldset>
              </Section>
              <Section title="4. Finish">
                <fieldset>
                  <legend className="screen-reader">What finish?</legend>
                  {formFields.woodFinishType.map((option) => (
                    <div key={`woodFinishType-${option.type}`}>
                      <Radio
                        name="woodFinishType"
                        value={option.type}
                        checked={formValues.woodFinishType === option.type}
                        disabled={(() => option.isDisabled(formValues))()}
                        onChange={handleFormInput}
                      >
                        {option.display}
                      </Radio>
                    </div>
                  ))}
                </fieldset>
                <div>
                  <fieldset>
                    <legend className="screen-reader">What material?</legend>
                    {formFields.woodMaterialType.map((option) => (
                      <div key={`woodMaterialType-${option.type}`}>
                        <Radio
                          name="woodMaterialType"
                          value={option.type}
                          checked={formValues.woodMaterialType === option.type}
                          disabled={(() => option.isDisabled(formValues))()}
                          onChange={handleFormInput}
                        >
                          {option.display}
                        </Radio>
                      </div>
                    ))}
                  </fieldset>
                  <Button onClick={handleFormSubmit}>Send</Button>
                </div>
              </Section>
            </RotatingPage>
          )}
        </form>
      )}
    </>
  );
};

const Quote = () => {
  return (
    <HelpersProvider>
      <QuoteForm />
    </HelpersProvider>
  );
};

export default Quote;
