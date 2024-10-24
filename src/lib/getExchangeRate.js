import axios from "axios";

const getExchangeRate = async () => {
  try {
    const response = await axios.get(
      `https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_RATE_API_KEY}/latest/KRW`
    );
    const vndRate = response.data.conversion_rates.VND; // 베트남 동 환율 가져오기
    return vndRate;
  } catch (error) {
    console.error("환율 정보를 가져오는 중 오류 발생:", error);
    throw new Error("환율 정보를 가져올 수 없습니다.");
  }
};

export default getExchangeRate;
