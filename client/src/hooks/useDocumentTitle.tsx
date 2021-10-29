import { useEffect } from 'react';
import { capitalizeFirstLetter } from '../utils/utils';


export const useDocumentTitle = (titleDocument: string) => {
    useEffect(() => {
        const prevTitle = document.title;
        document.title = capitalizeFirstLetter(titleDocument);
        return () => {
            document.title = prevTitle;
        }
    }, [titleDocument]);
};