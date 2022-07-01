import { i18n } from 'i18next'

/**
 * Turn enum into array
 * @param enumme Enum to transform
 * @param name Name of the enum
 * @param i18n I18n instance for translate label
 * @returns Enum list object
 */
export function EnumToSelect<TEnum extends { [s: string]: string }>(enumme: TEnum, name: string, i18n: i18n) {
  return Object.keys(enumme).map((value) => ({
    id: value,
    value: i18n.t(`enums.${name}.${value}`),
  }))
}
