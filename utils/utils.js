
const dateNows =  new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Jakarta',
    hour12: true,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
}).replace(',', '').replace(/\//g, '-');
const  nows = new Date(dateNows);

const getDate = () =>{
    const dateNows =  new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Jakarta',
        hour12: true,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    }).replace(',', '').replace(/\//g, '-');
    const  nows = new Date(dateNows);
    return nows;
}

function generateVoc() {
    const randomNum = Math.floor(Math.random() * 10000);
    const paddedNum = randomNum .toString().padStart(4, '0');
    return `SALE${paddedNum}`;
}

export {getDate, generateVoc}