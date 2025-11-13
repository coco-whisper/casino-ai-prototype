import { casinos } from "@/lib/casino-data"

export const maxDuration = 30

export async function POST(req: Request) {
  const { messages } = await req.json()
  const lastMessage = messages[messages.length - 1]
  const userQuery = lastMessage?.parts?.[0]?.text?.toLowerCase() || ""

  // Simulate AI response based on user query
  const response = generateCasinoResponse(userQuery)

  // Create a streaming response
  const encoder = new TextEncoder()
  const stream = new ReadableStream({
    async start(controller) {
      // Simulate streaming by sending chunks
      const words = response.split(" ")
      for (let i = 0; i < words.length; i++) {
        const chunk = words[i] + (i < words.length - 1 ? " " : "")
        controller.enqueue(encoder.encode(`0:${JSON.stringify([{ type: "text-delta", textDelta: chunk }])}\n`))
        await new Promise((resolve) => setTimeout(resolve, 30)) // Simulate typing delay
      }
      controller.enqueue(encoder.encode(`d:{"finishReason":"stop","usage":{"promptTokens":0,"completionTokens":0}}\n`))
      controller.close()
    },
  })

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "X-Vercel-AI-Data-Stream": "v1",
    },
  })
}

function generateCasinoResponse(query: string): string {
  // Crypto/Bitcoin related
  if (query.includes("crypto") || query.includes("bitcoin") || query.includes("btc") || query.includes("usdt")) {
    const cryptoCasinos = casinos.filter(
      (c) =>
        c.payments.some((p) => p.includes("USDT") || p.includes("Bitcoin") || p.includes("Ethereum")) ||
        c.bonusTypes.includes("Crypto Deposit Bonus"),
    )
    return `Great question! For crypto payments, I recommend:\n\n${cryptoCasinos
      .slice(0, 3)
      .map(
        (c, i) =>
          `${i + 1}. **${c.name}** (${c.rating}⭐) - ${c.payments.filter((p) => p.includes("USDT") || p.includes("Bitcoin") || p.includes("Ethereum")).join(", ")}. ${c.bonuses[0] || "Amazing bonuses available!"}\n`,
      )
      .join("")}\nAll these casinos support cryptocurrency and offer fast withdrawals!`
  }

  // No deposit bonus
  if (query.includes("no deposit") || query.includes("free") || query.includes("without deposit")) {
    const noDepositCasinos = casinos.filter((c) => c.bonusTypes.includes("No Deposit Bonus"))
    return `Perfect! Here are casinos with no deposit bonuses:\n\n${noDepositCasinos
      .slice(0, 3)
      .map((c, i) => `${i + 1}. **${c.name}** (${c.rating}⭐) - ${c.bonuses[1] || c.bonuses[0]}\n`)
      .join("")}\nYou can try these casinos without risking your own money!`
  }

  // Live casino/dealer
  if (query.includes("live") || query.includes("dealer")) {
    const liveCasinos = casinos.filter((c) => c.gameTypes.includes("Live Casino"))
    return `For live dealer games, check out:\n\n${liveCasinos
      .slice(0, 3)
      .map(
        (c, i) =>
          `${i + 1}. **${c.name}** (${c.rating}⭐)${c.verified ? " ✓ Verified" : ""} - Features ${c.providers.join(", ")} providers with professional dealers.\n`,
      )
      .join("")}\nAll offer real-time gaming experience with HD streaming!`
  }

  // USA/Country specific
  if (query.includes("usa") || query.includes("america") || query.includes("us ")) {
    const usaCasinos = casinos.filter((c) => c.countries.includes("USA"))
    return `For USA players, these casinos accept you:\n\n${usaCasinos
      .slice(0, 3)
      .map((c, i) => `${i + 1}. **${c.name}** (${c.rating}⭐) - ${c.description}\n`)
      .join("")}\nAll are licensed and safe for US players!`
  }

  // Slots specific
  if (query.includes("slot")) {
    const slotCasinos = casinos.filter((c) => c.gameTypes.includes("Slots"))
    return `Best casinos for slots:\n\n${slotCasinos
      .slice(0, 3)
      .map(
        (c, i) =>
          `${i + 1}. **${c.name}** (${c.rating}⭐) - ${c.providers.join(", ")} providers with thousands of slot games!\n`,
      )
      .join("")}\nEnjoy massive jackpots and exciting themes!`
  }

  // Welcome bonus
  if (query.includes("welcome") || query.includes("first deposit") || query.includes("sign up")) {
    return `Top welcome bonuses right now:\n\n${casinos
      .slice(0, 3)
      .map((c, i) => `${i + 1}. **${c.name}** (${c.rating}⭐) - ${c.bonuses[0]}\n`)
      .join("")}\nDon't miss these incredible first deposit offers!`
  }

  // VIP or high roller
  if (query.includes("vip") || query.includes("high roller") || query.includes("cashback")) {
    const vipCasinos = casinos.filter((c) => c.bonusTypes.includes("VIP") || c.bonusTypes.includes("Cashback Bonus"))
    return `For VIP treatment and cashback:\n\n${vipCasinos
      .slice(0, 3)
      .map((c, i) => `${i + 1}. **${c.name}** (${c.rating}⭐) - Exclusive VIP program with ${c.bonuses.join(", ")}\n`)
      .join("")}\nGet rewarded for your loyalty!`
  }

  // Sports betting
  if (query.includes("sport") || query.includes("betting")) {
    const sportsCasinos = casinos.filter((c) => c.gameTypes.includes("Sports"))
    return `Best for sports betting:\n\n${sportsCasinos
      .slice(0, 3)
      .map((c, i) => `${i + 1}. **${c.name}** (${c.rating}⭐) - ${c.description}\n`)
      .join("")}\nBet on all major sports with competitive odds!`
  }

  // Best/top/highest rated
  if (
    query.includes("best") ||
    query.includes("top") ||
    query.includes("recommend") ||
    query.includes("highest rated")
  ) {
    const topCasinos = [...casinos].sort((a, b) => b.rating - a.rating).slice(0, 3)
    return `Here are the top-rated casinos:\n\n${topCasinos
      .map(
        (c, i) =>
          `${i + 1}. **${c.name}** (${c.rating}⭐)${c.verified ? " ✓ Verified" : ""}\n   ${c.description}\n   Bonus: ${c.bonuses[0]}\n`,
      )
      .join("\n")}\nAll are trusted and highly rated by players!`
  }

  // Default response
  return `I'm Casino AI, your expert casino advisor! I can help you find the perfect casino based on:\n\n• Payment methods (Crypto, USDT, Bitcoin, PayPal, etc.)\n• Game types (Slots, Live Casino, Sports, Poker)\n• Bonus types (Welcome, No Deposit, Free Credit, VIP)\n• Countries and providers\n\nCurrently, I have information on ${casinos.length} verified casinos. What would you like to know? Try asking about:\n- "Best casinos for crypto payments"\n- "Which offer no deposit bonuses?"\n- "Top rated casinos for USA players"\n- "Casinos with live dealer games"`
}
