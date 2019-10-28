export default function toUrl(str) {
  return str
    .toLowerCase()
    .replace(/\u00FC/g, 'ue')
    .replace(/\u00E4/g, 'ae')
    .replace(/\u00F6/g, 'oe')
    .replace(/\u00DF/g, 'ss')
    .replace(/ /g, '')
    .replace(/\W/g, '')
}
