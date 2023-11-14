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
