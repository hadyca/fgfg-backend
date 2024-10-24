export default async function deleteCloudflareImage(imageId) {
  const CLOUDFLARE_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
  const CLOUDFLARE_API_KEY = process.env.CLOUDFLARE_API_KEY;

  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/images/v1/${imageId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${CLOUDFLARE_API_KEY}`,
      },
    }
  );

  const result = await response.json();
  if (!result.success) {
    throw new Error(`Cloudflare 이미지 삭제 실패: ${result.errors[0].message}`);
  }
}
