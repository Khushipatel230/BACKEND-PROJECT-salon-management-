const isValidDate = (date) => {
    return !isNaN(new Date(date).getTime());
};

const isTimeRangeValid = (startTime, endTime) => {
    return new Date(startTime) < new Date(endTime);
};

module.exports = {
    isValidDate,
    isTimeRangeValid
};