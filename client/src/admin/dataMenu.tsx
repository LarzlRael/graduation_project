
interface AccountsLinkInterface {
    title_group: string;
    items: ItemInterface[],
}
interface ItemInterface {
    title: string;
    to: string;
}
export const accountsLink: AccountsLinkInterface[] = [
    {
        title_group: 'Usuario',
        items: [
            { title: 'Mi cuenta', to: '/admin/profile' },
            { title: 'Cuentas asociadas', to: '/admin/users' },
            { title: 'Cuentas conectadas', to: '/admin/empleado' }]
    },
    {
        title_group: 'Informacion',
        items: [
            { title: 'Actualizacion de focos de calor', to: '/dashboard/actualizar' },
            { title: 'Como descargar archivo CSV', to: '/dashboard/tutorial' },
            { title: 'Ver vehiculos', to: '/admin/vervehiculos' }]
    },
    {
        title_group: 'Clientes',
        items: [
            { title: 'Lista de clientes', to: '/admin/clientes' },
        ]
    },
];