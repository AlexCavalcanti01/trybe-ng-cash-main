import * as yup from 'yup'

const SigninValidation = yup.object({
  body: yup.object({
    username: yup
      .string()
      .min(3, 'username must be at least 3 characters')
      .required(),
    password: yup
      .string()
      .min(8, 'password must be at least 8 characters')
      .required(),
  }),
})

export default SigninValidation
