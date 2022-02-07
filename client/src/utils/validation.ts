export const validateArray = (dataArray: any[]) => {
    // return dataArray?.length !== 0 ? true : false
    return dataArray ? (dataArray.length !== 0 ? true : false) : false
}
export const validateStatus = (state: number) => {
    const status = [200, 201, 202, 203, 204]
    if (status.indexOf(state) > -1) {
        return true
    }
    return false
}