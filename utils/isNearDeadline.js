import isTaskExpired from "./isTaskExpired.js"

const isNearDeadline = (date) =>   {
    return !isTaskExpired(date) && new Date(date.getFullYear(), date.getMonth(), date.getDate()+2) > new Date()
}

export default isNearDeadline