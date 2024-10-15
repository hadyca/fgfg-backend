const extractId = (url) => {
  const regex = /\/([a-f0-9-]+)$/; // URL의 끝 부분에서 UUID 추출
  const match = url.match(regex);
  return match ? match[1] : null;
};

export default extractId;
