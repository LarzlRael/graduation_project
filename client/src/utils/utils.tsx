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


export const getRankDate = (time: string, dateTo: Date = new Date()): string => {

    const date = new Date(dateTo.toISOString().slice(0, 10));

    switch (time) {
        case 'today':
            date.setHours(date.getHours() - 0);
            break;
        case '24hrs':
            date.setHours(date.getHours() - 24);
            break;
        case 'week':
            date.setHours(date.getHours() - 168);
            break;
        case 'twoWeeks':
            date.setHours(date.getHours() - 336);
            break;
        case 'oneMounth':
            date.setHours(date.getHours() - 720);
            break;

        default:
            date.setHours(date.getHours() - 0);
    }
    date.setHours(date.getHours() - 4 + 24);
    return date.toISOString().slice(0, 10);

}

export const getRandomColor = (): string => {
    const x = Math.floor(Math.random() * 256);
    const y = 100 + Math.floor(Math.random() * 256);
    const z = 50 + Math.floor(Math.random() * 256);
    return `rgb(${x},${y},${z},0.6)`;
}