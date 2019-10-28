export default function toIndikatorenJSON(Papa, data) {
  const newData = {}
  const jsonData = Papa.parse(data, { header: true, skipEmptyLines: true }).data
  for (let i = 0; i < jsonData.length; i++) {
    newData[jsonData[i].name] = {}
    newData[jsonData[i].name].val = jsonData[i].wert
    newData[jsonData[i].name].phaseB = jsonData[i].phase_b
    newData[jsonData[i].name].phaseBz = jsonData[i].phase_bz
  }

  return newData
}
