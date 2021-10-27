import { IoPerson, IoHammer } from "react-icons/io5";

import { MdFileUpload } from "react-icons/md";
interface AccountsLinkInterface {
    title_group: string;
    items: ItemInterface[],
}
interface ItemInterface {
    title: string;
    to: string;
    icon: any;

}
export const accountsLink: AccountsLinkInterface[] = [
    {
        title_group: 'Usuario',
        items: [
            {
                title: 'Mi cuenta', to: '/admin/profile',
                icon: <IoPerson
                    size={25}
                />,
            },
        ],

    },
    {
        title_group: 'Informacion',
        items: [
            {
                title: 'Actualizacion de focos de calor', to: '/dashboard/actualizar',
                icon: <MdFileUpload
                    size={25}
                />,
            },
            {
                title: 'Como descargar archivo CSV', to: '/dashboard/tutorial',
                icon: <IoHammer
                    size={25}
                />,
            },
        ]
    },
    {
        title_group: 'Clientes',
        items: [
            {
                title: 'Lista de clientes', to: '/admin/clientes',
                icon: <IoHammer
                    size={25}
                />,
            },
        ]
    },
];