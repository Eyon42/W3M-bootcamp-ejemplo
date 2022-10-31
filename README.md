# Ejemplo para [Web3Makers](https://web3makers.org)

Bienvenido al proyecto de ejemplo del [Bootcamp de Web3Makers](https://github.com/Eyon42/W3M-Bootcamp).

El objetivo de este repo es dar un poco más de contexto al Bootcamp de desarrollo de Smart Contracts en Solidity. Ya que, mientras remix es una excelente herramienta, no cubre todos los casos de uso que nos pueden facilitar el manejo de proyectos más avanzados, por lo que introducimos Hardhat junto con VS Code y la extensión de hardhat-solidity como un mejor ambiente de desarrollo.
Otro punto que busca demostrar este repo, es como construimos interfaces de usuario usando React y wagmi para interactuar con nuestros smart contracts fuera de Remix, Etherscan o Metamask.

Este proyecto tiene dos partes:

## Smart Contracts
Un proyecto de [Hardhat](https://hardhat.org), una framework para facilitar el desarrollo, pruebas e integración con smart contracts. Está escrito usando [Typescript](https://www.typescriptlang.org/) ya que nos permite reducir errores y tener mejor autocompletado y sugerencias para nuestro código y es especialmente útil al interactuar con smart contracts desde Typescript.


### Recursos usados:

Utiliza los siguientes plugins:
- [Typechain](https://github.com/dethcrypto/TypeChain): generador de archivos de tipos para smart contracts.
- [Hardhat-deploy](https://github.com/wighawag/hardhat-deploy): Facilita el proceso de hacer deployments y almacenar la información de dichos deployments para acceder posteriormente.

También hace uso de la [librería de smart contracts](https://docs.openzeppelin.com/contracts/4.x/) de [Open Zeppelin](https://www.openzeppelin.com/)

### Contratos
- **Token.sol:** contrato [ERC-20](https://docs.openzeppelin.com/contracts/4.x/erc20) sin nada agregado.
- **CatAdoption.sol:** contrato [ERC-721 con almacenamiento de URIs](https://docs.openzeppelin.com/contracts/4.x/api/token/erc721#ERC721URIStorage) con funcionalidad agregada para funcionar como un sistema primitivo de adopción de gatitos.

## Frontend
Applicación de [React](https://reactjs.org/) usando la librería [wagmi](https://wagmi.sh/) que provee un conjunto de Hooks de React hechos específicamente para interactuar con una wallet y smart contracts.

Otras librerías usadas:
- [Material UI](https://mui.com/): esto es un bootcamp de solidity, no de CSS.
- [ReactQuery](https://react-query-v3.tanstack.com/): facilita la integración de react con todo tipo de interacciones asíncronas, como por ejemplo requests a API (La librería wagmi usa esta librería internamente).

# Próximos pasos
Ahora que ya pasaste por el Bootcamp y viste este ejemplo te proponemos el desafío de tomar este repo y construir algo encima. Puede ser arreglar algún bug que hayas encontrado, alguna feature que creas que pueda ser útil o interesante de implementar, resolver posibles vulnerabilidades de seguridad o hasta usarlo como base para un proyecto completamente distinto.
La idea es hagas un fork de este repo y hagas una PR mostrando tu trabajo.

En caso de necesitar ayuda, te recomendamos que vuelvas a los materiales del bootcamp ya que ahí, además de los videos, encontrarás muchos link a cursos más completos y a la documentación de las herramientas usadas.
