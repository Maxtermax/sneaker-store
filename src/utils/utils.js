import { MESSAGE_DIRECTIONS } from '@core/constants';
import { formatDate, s4 } from './formatter';

export const execute = (promise) => {
  return promise
    .then((result) => ({ ok: true, result, error: null }))
    .catch((error) => ({ ok: false, result: null, error }));
};

export const sequence = async (jobs) => {
  let proccessResult = { ok: true };
  for await (const job of jobs()) {
    const output = await execute(job(proccessResult.result))
    if (!output.ok) {
      proccessResult = output;
      break;
    }
    proccessResult.result = output.result;
  }
  return proccessResult;
};

export const delay = (ms) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  })
}

export const buildMessagePayload = () => ({
  id: s4(),
  direction: MESSAGE_DIRECTIONS.IN,
  time: formatDate(new Date()),
});

export const getUniqueRandomIndex = () => {

}

export function getRandomUniqueIndexes(array) {
}

