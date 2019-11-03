import { Errors } from './store/state';

export type ValidationResults<TValues> = Errors<TValues> | undefined

export type ValidateHandler<TValues> = (values: TValues) =>
ValidationResults<TValues> | Promise<ValidationResults<TValues>>

export type FieldValidationResults = string | undefined

export type FieldValidateHandler = (value: string) =>
FieldValidationResults | Promise<FieldValidationResults>
