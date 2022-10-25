import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  WagmiConfig,
  createClient,
  configureChains,
  chain,
} from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import "./index.css";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import NFT from './pages/Nft';
import Token from './pages/Token';

// Custom chain id for localhost
chain.localhost.id = 31337

const { provider, webSocketProvider } = configureChains(
  [chain.mainnet, chain.polygon, chain.localhost],
  [publicProvider()],
)

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <WagmiConfig client={client}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="NFT" element={<NFT />} />
          <Route path="Token" element={<Token />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </WagmiConfig>
  </React.StrictMode>
);
