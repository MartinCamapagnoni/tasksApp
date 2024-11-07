const isTaskExpired = (date) =>   {
    return date > new Date()
}

export default isTaskExpired