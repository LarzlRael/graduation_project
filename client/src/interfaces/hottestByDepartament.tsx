export interface HottestByDeparament {
    dateStart: string;
    dateEnd: string;
    departamento: string;
    orderBy: 'asc' | 'desc';
    limit: number;
}