const   key = '01mHy4bGKtEe6m74xG5NYKdgGaUutWXh',
        baseUrl = 'https://api.giphy.com/v1/gifs/translate';




export function getUserInput() {
    const val = document.querySelector('input').value.trim();
    return val === '' ? undefined : val;
}

export async function loadGif(){
    try {
        const val = getUserInput();
        if (val === undefined) {
            console.error('Gif search cannot be empty');
            clearGif();
            return;
        }
        const url = `${baseUrl}?api_key=${key}&s='${String(val)}'`;
        const res = await fetch(url);
        if (!res.ok) {
            console.error(`HTTP ${res.status}`);
            return;
        }
        const data = await res.json();
        updateGif(data.data.images.original.url);
    } catch (err) {
        console.error(err);
    }
}

export function updateGif(newGif) {
    document.querySelector('#gif-slot').src = newGif;
}

function clearGif() {
    document.querySelector('#gif-slot').removeAttribute('src');
}