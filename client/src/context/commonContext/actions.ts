export const openSnackbar = (content: string, status: boolean, kind: string) => ({
    type: 'OPEN_SNACKBAR',
    content,
    status,
    kind,
})