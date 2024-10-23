import CryptoJS from 'crypto-js';
import {useNavigate} from "react-router-dom";

import {useState} from "react";
import {SearchBar} from "@/features/search/ui/search.bar.tsx";
import {SearchResult} from "@/features/search/ui/search.result.tsx";
import {useDebounce} from "@/features/search/lib/useDebounce.ts";


const phoneNumberToHash = (phoneNumber: string) => {
    // Создаем объект SHA-256 хеша
    const hash = CryptoJS.SHA256(phoneNumber);

    // Получаем хеш в виде шестнадцатеричного числа
    const hashHex = hash.toString(CryptoJS.enc.Hex);

    // Преобразуем хеш в десятичное число
    const hashDecimal = BigInt('0x' + hashHex);

    // Приводим десятичное число к 9-значному числу
    const hash9Digits = hashDecimal % BigInt(10 ** 9);

    // Форматируем результат как строку из 9 цифр
    const hash9DigitsStr = hash9Digits.toString().padStart(9, '0');

    return hash9DigitsStr;
};


export const SearchPage = () => {

    const [query, setQuery] = useState('')
    const debounceValue = useDebounce(query, 800)


    return (
        <div className='p-2 h-full flex flex-col gap-5'>
            <SearchBar query={query} setQuery={setQuery}/>
            <SearchResult query={debounceValue.trim()}/>
        </div>
    )
}

