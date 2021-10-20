import { v4 as uuidv4 } from 'uuid';

interface Props {
    fechas: number,
}
export const Pagination = ({ fechas }: Props) => {

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
    return (
        <div>
            {fields.map(field => (
                <div className="fild-item" key={uuidv4()}>
                    <button className="active" onClick={
                        () => getCustomers(field.from, field.to)}>
                        {field.page_number}
                    </button>
                </div>
            ))}
        </div>
    )
}
