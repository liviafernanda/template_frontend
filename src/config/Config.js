async function carregarArquivoEnvironment() {
  if (window.SagjudEnvironment === undefined) {
    const environmentData = await fetch('./environment.json').then((response) => response.json());
    window.SagjudEnvironment = environmentData;
  }
  return window.SagjudEnvironment;
}

const environmentData = await carregarArquivoEnvironment();

export default {
  environment: environmentData.environment,
  backend: {
    baseUrl: environmentData.backend.baseUrl,
    path: environmentData.backend.path,
    url: `${environmentData.backend.baseUrl}${environmentData.backend.path}`
  },
  frontend: {
    baseUrl: environmentData.frontend.baseUrl,
    path: environmentData.frontend.path,
    url: `${environmentData.frontend.baseUrl}${environmentData.frontend.path}`
  }
};
