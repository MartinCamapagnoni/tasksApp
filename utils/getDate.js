const getDate = (str) =>   {
    const [day,month,year] = str.split("/").map(Number)
    return new Date(year, month-1, day)
}

export default getDate