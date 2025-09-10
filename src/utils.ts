import { AxiosResponse } from "axios";
import map from "lodash-es/map";
import filter from "lodash-es/filter";
import size from "lodash-es/size";
import take from "lodash-es/take";

export const fill2 = (n: number) => `0${n}`.substr(-2);

export const parseHnM = (current: number) => {
  const date = new Date(current);

  return `${fill2(date.getHours())}:${fill2(date.getMinutes())}`;
};

const getTimeRange = (value: string): number[] => {
  const [start, end] = value.split("~").map(Number);

  if (end === undefined) return [start];

  return Array(end - start + 1)
    .fill(start)
    .map((v, k) => v + k);
};

export const parseSchedule = (schedule: string) => {
  const schedules = schedule.split("<p>");

  return schedules.map((schedule) => {
    const reg = /^([가-힣])(\d+(~\d+)?)(.*)/;

    const [day] = schedule.split(/(\d+)/);

    const range = getTimeRange(schedule.replace(reg, "$2"));

    const room = schedule.replace(reg, "$4")?.replace(/\(|\)/g, "");

    return { day, range, room };
  });
};

export const createCachedFetcher = <T>(
  fetchFn: () => Promise<AxiosResponse<T>>
) => {
  let cache: Promise<AxiosResponse<T>> | null = null;

  return (): Promise<AxiosResponse<T>> => {
    if (cache) {
      console.log("캐시 사용");
      return cache;
    }

    console.log("새로운 Promise 생성");
    cache = fetchFn();

    return cache;
  };
};

export interface NumberChain {
  value(): number;
}

export interface ArrayChain<T> {
  map<U>(iteratee: (item: T, index: number) => U): ArrayChain<U>;
  filter(predicate: (item: T, index: number) => boolean): ArrayChain<T>;
  take(n: number): ArrayChain<T>;
  size(): NumberChain;
  value(): T[];
}

function createNumberChain(n: number): NumberChain {
  return {
    value: () => n,
  };
}

function createArrayChain<T>(arr: T[]): ArrayChain<T> {
  return {
    map<U>(iteratee: (item: T, index: number) => U): ArrayChain<U> {
      const next = map(arr, iteratee) as U[];
      return createArrayChain<U>(next);
    },
    filter(predicate: (item: T, index: number) => boolean): ArrayChain<T> {
      const next = filter(arr, predicate) as T[];
      return createArrayChain<T>(next);
    },
    take(n: number): ArrayChain<T> {
      const next = take(arr, n) as T[];
      return createArrayChain<T>(next);
    },
    size(): NumberChain {
      const n = size(arr);
      return createNumberChain(n);
    },
    value(): T[] {
      return arr;
    },
  };
}

export const chain = <T>(input: readonly T[] | T[]): ArrayChain<T> => {
  return createArrayChain<T>(input as T[]);
};
