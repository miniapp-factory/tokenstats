"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";

interface TokenStatsData {
  price: number;
  marketCap: number;
  change24h: number;
}

export default function TokenStats() {
  const [data, setData] = useState<TokenStatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        // Example: fetch Bitcoin stats from CoinGecko
        const res = await fetch(
          "https://api.coingecko.com/api/v3/coins/bitcoin?localization=false&market_data=true"
        );
        if (!res.ok) throw new Error("Network response was not ok");
        const json = await res.json();
        setData({
          price: json.market_data.current_price.usd,
          marketCap: json.market_data.market_cap.usd,
          change24h: json.market_data.price_change_percentage_24h,
        });
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (loading) return <Spinner className="mx-auto" />;
  if (error) return <p className="text-destructive">{error}</p>;

  return (
    <Card className="w-full max-w-md mx-auto mt-4">
      <CardHeader>
        <CardTitle>Token Stats</CardTitle>
      </CardHeader>
      <CardContent>
        <p>
          <strong>Price:</strong> ${data?.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
        </p>
        <p>
          <strong>Market Cap:</strong> ${data?.marketCap.toLocaleString()}
        </p>
        <p>
          <strong>24h Change:</strong> {data?.change24h.toFixed(2)}%
        </p>
      </CardContent>
    </Card>
  );
}
