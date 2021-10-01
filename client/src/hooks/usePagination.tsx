
export const Pagination = (fechas: number) => {

    const fields = [];
    let total_pages = fechas / 5;
    let from = 0;

    for (let i = 1; i <= total_pages; i++) {
        let item = { from, to: 5, page_number: i };
        from = from + 5;
        fields.push(item)
    }
    const getCustomers = async (from: number, to: number) => {
        alert('from ' + from + 'to ' + to)
    }
    return {
        fields,
        getCustomers
    }
}
