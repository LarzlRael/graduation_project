export const convertirFecha = (date: Date) => {
    /* 2021-09-14 */
    const currentDate = date.toString().slice(0, 10);
    const newDate = currentDate.split('-');
    const datecurrent = `${newDate[2]}-${newDate[1]}-${newDate[0]}`;
    return datecurrent;
}
export const setFileName = (dateStart: string, dateEnd?: string): string => {

    const spliteDateStart = dateStart.split('-');
    if (dateStart === dateEnd) {
        return `${spliteDateStart[2]}-${spliteDateStart[1]}-${spliteDateStart[0]}`;
    }
    if (dateEnd !== undefined) {
        const splitDateEnd = dateEnd.split('-');
        return `${spliteDateStart[2]}${spliteDateStart[1]}${spliteDateStart[0]}-${splitDateEnd[2]}${splitDateEnd[1]}${splitDateEnd[0]}`
    }
    else {
        return `${spliteDateStart[2]}-${spliteDateStart[1]}-${spliteDateStart[0]}`;
    }
}