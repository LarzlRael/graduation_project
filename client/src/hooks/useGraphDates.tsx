

export const useGraphDates = (mes: number) => {

    const yearWith29 = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const days2021 = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    const finalday = days2021[mes - 1];
    const initialMount = `2021-${mes}-1`
    const finalMounth = `2021-${mes}-${finalday}`;

    return {
        initialMount,
        finalMounth
    }
}
