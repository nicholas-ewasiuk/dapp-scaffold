import { WalletMultiButton } from "@solana/wallet-adapter-ant-design";
import { Button, Col, Row } from "antd";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { TokenIcon } from "../../components/TokenIcon";
import { useConnectionConfig } from "../../contexts/connection";
import { useMarkets } from "../../contexts/market";
import { useUserBalance, useUserTotalBalance } from "../../hooks";
import { WRAPPED_SOL_MINT } from "../../utils/ids";
import { formatUSD } from "../../utils/utils";
import { SceneWithSpinningBoxes } from "/home/nick/dapp-scaffold/src/components/SpinningBoxes";

export const HomeView = () => {
  const { marketEmitter, midPriceInUSD } = useMarkets();
  const { tokenMap } = useConnectionConfig();
  const SRM_ADDRESS = "SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt";
  const RAY_ADDRESS = "4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R";
  const POLIS_ADDRESS = "poLisWXnNRwC6oBu1vHiuKQzFjGL4XDSu4g9qjz9qVk";
  const SRM = useUserBalance(SRM_ADDRESS);
  const SOL = useUserBalance(WRAPPED_SOL_MINT);
  const RAY = useUserBalance(RAY_ADDRESS);
  const POLIS = useUserBalance(POLIS_ADDRESS);
  const { balanceInUSD: totalBalanceInUSD } = useUserTotalBalance();

  useEffect(() => {
    const refreshTotal = () => {};

    const dispose = marketEmitter.onMarket(() => {
      refreshTotal();
    });

    refreshTotal();

    return () => {
      dispose();
    };
  }, [marketEmitter, midPriceInUSD, tokenMap]);

  return (
    <Row>
      <Col span={24}>
        <h2>Your balances ({formatUSD.format(totalBalanceInUSD)}):</h2>
        <h2>
          SOL: {SOL.balance} ({formatUSD.format(SOL.balanceInUSD)})
        </h2>
        <h2 style={{ display: "inline-flex", alignItems: "center" }}>
          <TokenIcon mintAddress={POLIS_ADDRESS} /> POLIS: {POLIS?.balance} (
          {formatUSD.format(POLIS?.balanceInUSD)})
        </h2>
        <h2 style={{ display: "inline-flex", alignItems: "center" }}>
          <TokenIcon mintAddress={RAY_ADDRESS} /> RAY: {RAY?.balance} (
          {formatUSD.format(RAY?.balanceInUSD)})
          </h2>
      </Col>
      <Col span={24}>
        <SceneWithSpinningBoxes />
      </Col>
    </Row>
  );
};
