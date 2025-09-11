import { Field, Formik, Form } from "formik";
import * as Yup from "yup";
import css from "./ShoppingCartForm.module.css";
import { ShoppingCartFormProps } from "./ShoppingCartForm.types";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { selectOrders } from "../../redux/orders/selectors";
import { toast } from "sonner";
import { finalizeOrder } from "../../redux/orders/operations";
import ExtraLoader from "../ExtraLoader/ExtraLoader";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: Yup.string().required("Phone is required"),
  address: Yup.string().required("Address is required"),
});

const initialValues: ShoppingCartFormProps = {
  name: "",
  email: "",
  phone: "",
  address: "",
};

const ShoppingCartForm = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectOrders);
  const navigate = useNavigate();

  const currentOrder = orders.find((o) => !o.isFinalized);

  const onSubmit = async (values: ShoppingCartFormProps) => {
    if (!currentOrder) {
      toast.error("No active order to finalize");
      return;
    }

    try {
      await dispatch(
        finalizeOrder({
          orderId: currentOrder._id,
          ...values,
        })
      ).unwrap();

      navigate(`/orders/${currentOrder._id}`);
      toast.success("Order placed successfully!");
    } catch (error: any) {
      toast.error(error);
    }
  };

  return (
    <div className={css.container}>
      <h2 className={css.title}>Delivery Information</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className={css.form}>
            <div className={css.inputGroup}>
              <label htmlFor="name" className={css.label}>
                Full Name
              </label>
              <Field
                type="text"
                id="name"
                name="name"
                className={css.input}
                placeholder="Enter your full name"
              />
              {errors.name && touched.name && (
                <div className={css.error}>{errors.name}</div>
              )}
            </div>

            <div className={css.inputGroup}>
              <label htmlFor="email" className={css.label}>
                Email Address
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                className={css.input}
                placeholder="Enter your email"
              />
              {errors.email && touched.email && (
                <div className={css.error}>{errors.email}</div>
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
                <div className={css.error}>{errors.phone}</div>
              )}
            </div>

            <div className={css.inputGroup}>
              <label htmlFor="address" className={css.label}>
                Delivery Address
              </label>
              <Field
                type="text"
                id="address"
                name="address"
                className={css.input}
                placeholder="Enter your delivery address"
              />
              {errors.address && touched.address && (
                <div className={css.error}>{errors.address}</div>
              )}
            </div>

            {isSubmitting ? (
              <ExtraLoader />
            ) : (
              <button type="submit" className={css.btn}>
                Place Order
                <svg className={css.btnIcon} viewBox="0 0 24 24">
                  <path d="M17 18a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2c0-1.11.89-2 2-2zM1 2h3.27l.94 2H20a1 1 0 0 1 1 1c0 .17-.05.34-.12.5l-3.58 6.47c-.34.61-1 1.03-1.75 1.03H8.1l-.9 1.63l-.03.12a.25.25 0 0 0 .25.25H19v2H7a2 2 0 0 1-2-2c0-.35.09-.68.24-.96l1.36-2.45L3 4H1V2z" />
                </svg>
              </button>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ShoppingCartForm;
