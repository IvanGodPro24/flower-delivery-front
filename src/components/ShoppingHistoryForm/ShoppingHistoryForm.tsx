import { Field, Formik, Form } from "formik";
import * as Yup from "yup";
import css from "./ShoppingHistoryForm.module.css";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { toast } from "sonner";
import ExtraLoader from "../ExtraLoader/ExtraLoader";
import { ShoppingHistoryFormProps } from "./ShoppingHistoryForm.types";
import { getHistory } from "../../redux/orders/operations";

const validationSchema = Yup.object({
  searchType: Yup.string().oneOf(["emailPhone", "orderId"]).required(),
  email: Yup.string().when("searchType", {
    is: "emailPhone",
    then: (schema) =>
      schema.email("Invalid email format").required("Email is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  phone: Yup.string().when("searchType", {
    is: "emailPhone",
    then: (schema) =>
      schema
        .matches(/^0\d{9}$/, "Phone must be 10 digits and start with 0")
        .required("Phone is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  orderId: Yup.string().when("searchType", {
    is: "orderId",
    then: (schema) => schema.required("Order ID is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
});

const initialValues: ShoppingHistoryFormProps = {
  searchType: "emailPhone",
  email: "",
  phone: "",
  orderId: "",
};

const ShoppingHistoryForm = () => {
  const dispatch = useAppDispatch();

  const onSubmit = async ({
    searchType,
    orderId,
    email,
    phone,
  }: ShoppingHistoryFormProps) => {
    try {
      const payload =
        searchType === "orderId"
          ? { orderId: orderId }
          : { email: email, phone: phone };

      await dispatch(getHistory(payload)).unwrap();
      toast.success("Orders found!");
    } catch (error: any) {
      toast.error(error);
    }
  };

  return (
    <div className={css.container}>
      <div className={css.header}>
        <h2 className={css.title}>Find Your Order History</h2>
      </div>

      <p className={css.description}>
        Enter your email and phone number to view your order history
      </p>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ values, errors, touched, isSubmitting }) => (
          <Form className={css.form}>
            <div className={css.radioGroup}>
              <label className={css.radioLabel}>
                <Field
                  type="radio"
                  name="searchType"
                  value="emailPhone"
                  className={css.radioInput}
                />
                <span className={css.radioCustom}></span>
                <span className={css.radioText}>
                  <span className={css.radioIcon}>📧📱</span>
                  Search by Email + Phone
                </span>
              </label>

              <label className={css.radioLabel}>
                <Field
                  type="radio"
                  name="searchType"
                  value="orderId"
                  className={css.radioInput}
                />
                <span className={css.radioCustom}></span>
                <span className={css.radioText}>
                  <span className={css.radioIcon}>📋</span>
                  Search by Order ID
                </span>
              </label>
            </div>


            {values.searchType === "emailPhone" && (
              <>
                <div className={css.inputGroup}>
                  <label htmlFor="email" className={css.label}>
                    Email Address
                  </label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    className={css.input}
                    placeholder="Enter your email address"
                  />
                  {errors.email && touched.email && (
                    <div className="error">{errors.email}</div>
                  )}
                </div>

                <div className={css.inputGroup}>
                  <label htmlFor="phone" className={css.label}>
                    Phone Number
                  </label>
                  <Field
                    type="tel"
                    id="phone"
                    name="phone"
                    className={css.input}
                    placeholder="Enter your phone number"
                  />
                  {errors.phone && touched.phone && (
                    <div className="error">{errors.phone}</div>
                  )}
                </div>
              </>
            )}

            {values.searchType === "orderId" && (
              <div className={css.inputGroup}>
                <label htmlFor="orderId" className={css.label}>
                  Order ID
                </label>
                <Field
                  type="text"
                  id="orderId"
                  name="orderId"
                  className={css.input}
                  placeholder="Enter order ID"
                />
                {errors.orderId && touched.orderId && (
                  <div className="error">{errors.orderId}</div>
                )}
              </div>
            )}

            {isSubmitting ? (
              <ExtraLoader />
            ) : (
              <button type="submit" className={css.btn} disabled={isSubmitting}>
                Find Orders
                <svg className={css.btnIcon} viewBox="0 0 24 24">
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                </svg>
              </button>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ShoppingHistoryForm;
