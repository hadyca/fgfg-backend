import axios from "axios";

const getExchangeRate = async () => {
  try {
    const response = await axios.get(
      `https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_RATE_API_KEY}/latest/KRW`
    );
    const vndRate = response.data.conversion_rates.VND; // 베트남 동 환율 가져오기
    return vndRate;
  } catch (error) {
    console.error("Error occurred while fetching exchange rate:", error);
    throw new Error("Could not fetch exchange rate information.");
  }
};

export default getExchangeRate;
