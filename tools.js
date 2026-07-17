const   key = '01mHy4bGKtEe6m74xG5NYKdgGaUutWXh',
        baseUrl = 'https://api.giphy.com/v1/gifs/translate';

const previousGifs = [];

export function getUserInput() {
    const val = document.querySelector('input').value;
    if (val === '') { return; }
    return val;
}

export async function loadGif(){
    try {
        const val = getUserInput();
        const url = `${baseUrl}?api_key=${key}&s='${String(val)}'`;
        const res = await fetch(url);
        if (!res.ok) {
            console.error(`HTTP ${res.status}`);
            return;
        }
        const data = await res.json();
        console.log(data);
        updateGif(data.data.images.original.url);
    } catch (err) {
        console.error(err);
    }
}

export function updateGif(newGif) {
    document.querySelector('#gif-slot').src = newGif;
}