import { ChangeHandler, Path, RefCallBack, UseFormRegister } from 'react-hook-form'

type RegisterTypes = {
  onBlur: ChangeHandler
  name: string
  min?: string | number | undefined
  max?: string | number | undefined
  maxLength?: number | undefined
  minLength?: number | undefined
  pattern?: string | undefined
  required?: boolean | undefined
  disabled?: boolean | undefined
}

export const useRegisterFormControl = <TFormValues>(register?: UseFormRegister<TFormValues>, name?: Path<TFormValues>) => {
  let inputRefCallBack: RefCallBack | undefined
  let onChange: ChangeHandler | undefined
  let types: RegisterTypes | undefined
  if (register && name) {
    ;({ ref: inputRefCallBack, onChange, ...types } = register(name))
  }

  return {
    inputRefCallBack,
    onChange,
    types,
  }
}
