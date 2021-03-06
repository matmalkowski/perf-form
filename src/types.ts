// eslint-disable-next-line import/no-cycle
import { Errors } from './store/types';

export type ValidationResults<TValues> = Errors<TValues> | undefined

export type ValidationHandler<TValues> = (values: TValues) =>
ValidationResults<TValues> | Promise<ValidationResults<TValues>>

export type FieldValidationResults = string | undefined

export type FieldValidationHandler = (value: string) =>
FieldValidationResults | Promise<FieldValidationResults>
