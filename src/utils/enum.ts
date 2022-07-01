import { i18n } from 'i18next'

// Turn enum into array
export function EnumToSelect<TEnum extends { [s: string]: string }>(enumme: TEnum, name: string, i18n: i18n) {
  //const list = []
  return Object.keys(enumme).map((value) => ({
    id: value,
    value: i18n.t(`enums.${name}.${value}`),
  }))
}
