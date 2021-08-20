export const getCurrentDate = () => {
    var today = new Date();

    const day = today.getDate() <= 10 ? `0${today.getDate()}` : today.getDate()
    const hours = today.getHours() <= 10 ? `0${today.getHours()}` : today.getHours()
    const min = today.getMinutes() <= 10 ? `0${today.getMinutes()}` : today.getMinutes()
    const sec = today.getSeconds() <= 10 ? `0${today.getSeconds()}` : today.getSeconds()
    const mon = today.getMonth() + 1 <= 10 ? `0${today.getMonth() + 1}` : today.getMonth() + 1


    return 'h:min:sec d.mon'
    .replace('sec', sec)
    .replace('min', min)
    .replace('h', hours)
    .replace('mon', mon)
    .replace('d', day);
}