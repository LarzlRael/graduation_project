const sm = '360px';
const md = '768px';
const lg = '1024px';

export enum Sizes {
    xs_sm = 'xs_sm',
    xs = 'xs',
    sm = 'sm',
    md = 'md',
    lg = 'lg',
}

/*  
@media ${sizeMedia('xs')} {
    padding-top: 1rem;
}
*/

export const sizeMedia = (media: keyof typeof Sizes): string => {

    switch (media) {
        case 'xs_sm':
            return `( max-width: ${md} )`
        case 'xs':
            return `( max-width: ${sm} )`
        case 'sm':
            return `( min-width: ${sm}) and (max-width: ${md} )`
        case 'md':
            return `( min-width: ${md}) and (max-width: ${lg} )`
        case 'lg':
            return `( min-width: ${lg} )`
        default:
            return `( min-width: ${lg} )`
    }
}