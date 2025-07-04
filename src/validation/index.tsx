import {
  date,
  number,
  NumberSchema,
  object,
  ref,
  string,
  type InferType,
} from "yup";

export const RegisterSchema = () => {
  return object({
    name: string()
      .min(2, "Full name must be at least 2 characters")
      .required("Full name is required"),

    email: string().required("Required").email("Invalid email"),

    password: string()
      .required("Required")
      .min(6, "At least 6 characters")
      .max(24, "At max 24 characters"),
    confirmPassword: string()
      .required("Required")
      .oneOf([ref("password")], "Your passwords do not match."),
  });
};

export const InvoiceCreateSchema = () => {
  return object({
    label: string().required("Required"),
    detail: string().required("Required"),
    category: string()
      .required("Required")
      .test(
        "is-valid",
        () => `Invalid Category`,
        (value) => value === "fixed" || value === "flexible"
      ),
    endAt: date()
      .notRequired()
      .test(
        "future",
        () => `Date should be atleast 10 minutes in future`,
        (val) =>
          val
            ? new Date(val).getTime() - new Date().getTime() > 10 * 60 * 1000
            : true
      ),
    amount: number().when("category", {
      is: "fixed",
      then: (schema: NumberSchema) =>
        schema
          .required("Amount is required")
          .typeError("A number is required")
          .test(
            "positive-val",
            () => `Should be greater than zero`,
            (value) => value > 0
          ),
    }),
  });
};

const invoiceArgsSchema = InvoiceCreateSchema();
export type InvoiceCreateArgs = InferType<typeof invoiceArgsSchema>;
