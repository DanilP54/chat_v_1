import { useState, useEffect, useRef } from "react";

// Глобальный кэш
const queryCache = new Map();

// Настройки по умолчанию
const defaultOptions = {
  cacheTime: 5 * 60 * 1000, // Время жизни кэша в миллисекундах (5 минут)
  staleTime: 0, // Время, после которого данные считаются устаревшими
  enabled: true, // Включен ли запрос
};

export function useQuery(key, queryFn, options = {}) {
  const opts = { ...defaultOptions, ...options };
  const cacheEntry = useRef(queryCache.get(key));

  const [data, setData] = useState(
    cacheEntry.current ? cacheEntry.current.data : null,
  );
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(!cacheEntry.current);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    let isSubscribed = true;
    const fetchData = async () => {
      setIsFetching(true);
      try {
        const result = await queryFn();
        if (!isSubscribed) return;

        setData(result);
        setError(null);
        setIsLoading(false);

        // Сохранение в кэш
        queryCache.set(key, {
          data: result,
          timestamp: Date.now(),
        });
      } catch (err) {
        if (!isSubscribed) return;
        setError(err);
        setIsLoading(false);
      } finally {
        if (isSubscribed) {
          setIsFetching(false);
        }
      }
    };

    // Проверка на включение запроса
    if (!opts.enabled) {
      return () => {
        isSubscribed = false;
      };
    }

    // Проверка кэша
    if (cacheEntry.current) {
      const isStale =
        Date.now() - cacheEntry.current.timestamp > opts.staleTime;
      if (isStale) {
        fetchData();
      }
    } else {
      fetchData();
    }

    // Очистка при размонтировании
    return () => {
      isSubscribed = false;
    };
  }, [key, queryFn, opts.enabled, opts.staleTime]);

  // Инвалидация кэша
  useEffect(() => {
    const interval = setInterval(() => {
      const entry = queryCache.get(key);
      if (entry && Date.now() - entry.timestamp > opts.cacheTime) {
        queryCache.delete(key);
      }
    }, opts.cacheTime);

    return () => clearInterval(interval);
  }, [key, opts.cacheTime]);

  return { data, error, isLoading, isFetching };
}

export function invalidateQuery(key) {
  queryCache.delete(key);
}

function App() {
  const { data, error, isLoading, isFetching } = useQuery("user", fetchUser);

  const refreshData = () => {
    invalidateQuery("user");
  };

  // Остальной код компонента
}

const mySymbol = Symbol("own");

const obj = {};

obj[mySymbol] = 5;
obj["own"] = 12;

console.dir(obj);
