import {clearGif, createToast, updateDisplay, updateGif} from './dom.js'

const   key = '01mHy4bGKtEe6m74xG5NYKdgGaUutWXh',
        baseUrl = 'https://api.giphy.com/v1/gifs/translate';

let inputDelay = null;

export function getUserInput() {
    const input = document.querySelector('input');
    const button = document.querySelector('button');
    const val = input.value.trim();
    if (val === ''){
        button.disabled = true;
        return undefined;
    } else {
        button.disabled = false;
        return val;
    }
}

export async function findGif(refresh = false){
    try {
        const val = getUserInput();

        if (val === undefined) {
            document.querySelector('figure').className = 'hide';
            clearGif();
            if (inputDelay !== null){
                clearTimeout(inputDelay);
                inputDelay = null;
            }
        } else {
            if (inputDelay !== null) {
                clearTimeout(inputDelay);
            }

            if (refresh === true) {
                await loadGif(val);
                updateDisplay();
            }
            else if (refresh === false) {
                inputDelay = setTimeout(async () => {
                    inputDelay = null;
                    await loadGif(val);
                    updateDisplay();
                }, 1000);
            }
        }

    } catch (err) {
        createToast(err, "error");
            return;
    }
}

async function loadGif(val){
    if (val === undefined) {return;}
    const url = `${baseUrl}?api_key=${key}&s=${encodeURIComponent(String(val))}`;
    const res = await fetch(url);
    const data = await res.json();
    const msg = data?.meta?.msg ?? `HTTP ${res.status}`;

    if (!res.ok) {
        createToast(msg, 'error');
        return;
    }

    if (!data?.data?.images?.original?.url) {
        createToast('No gif found...', 'error');
        return;
    }

    createToast( 'Gif found!', 'success' );
    updateGif(data?.data?.images?.original?.url);
}

